const defaultOptions: TransmissionOptions = {
  url: '/transmission/rpc',
}

export enum TorrentStatus {
  STOPPED,
  CHECK_WAIT,
  CHECK,
  DOWNLOAD_WAIT,
  DOWNLOAD,
  SEED_WAIT,
  SEED,
  ISOLATED,
}

export default class Transmission {
  url: string
  sessionId: string | null = null
  authHeader: string | null = null

  constructor(options: Partial<TransmissionOptions> = {}) {
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    }

    this.url = mergedOptions.url

    if (mergedOptions.username) {
      let token = mergedOptions.username
      if (mergedOptions.password) {
        token += `:${mergedOptions.password}`
      }

      this.authHeader = `Basic ${btoa(token)}`
    }
  }

  callServer<K extends keyof TransmissionRPC>(
    method: K,
    args: TransmissionRPC[K]['request'],
  ): Promise<TransmissionRPC[K]['response']> {
    const headers: Record<string, string> = {}

    const makeRequest = (): Promise<TransmissionResponse<
      TransmissionRPC[K]['response']
    >> => {
      if (this.sessionId) {
        headers['X-Transmission-Session-Id'] = this.sessionId
      }

      if (this.authHeader) {
        headers.Authorization = this.authHeader
      }

      return fetch(this.url, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          method,
          arguments: args,
          tag: undefined,
        }),
      }).then((resp) => {
        if (resp.status === 409) {
          this.sessionId = resp.headers.get('x-transmission-session-id')

          return makeRequest()
        }

        if (resp.status >= 400) {
          throw new Error(resp.statusText)
        }

        return resp.json()
      })
    }

    return makeRequest().then((json) => {
      if (json.result !== 'success') {
        throw new Error(json.result)
      }

      return json.arguments
    })
  }

  /**
   * Adds a new torrent from a variety of sources
   */
  addTorrentDataSrc(options: TorrentAddRequest) {
    return this.callServer('torrent-add', options).then((x) => {
      const response = x['torrent-duplicate']
        ? x['torrent-duplicate']
        : x['torrent-added']

      if (!response) {
        throw new Error()
      }

      return response
    })
  }
}
