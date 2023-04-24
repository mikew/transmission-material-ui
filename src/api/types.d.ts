type TransmissionIdLookup = (string | number)[]

interface TransmissionRequest<TMethod, TArgs> {
  method: TMethod
  arguments: TArgs
  tag?: string
}

interface TransmissionResponse<TArgs> {
  result: 'success' | string
  arguments: TArgs
  tag?: string
}

interface TransmissionRPC {
  // 3.1.  Torrent Action Requests
  'torrent-start': {
    request: { ids?: TransmissionIdLookup }
    response: null
  }
  'torrent-start-now': {
    request?: { ids?: TransmissionIdLookup }
    response: null
  }
  'torrent-stop': {
    request?: { ids?: TransmissionIdLookup }
    response: null
  }
  'torrent-verify': {
    request?: { ids?: TransmissionIdLookup }
    response: null
  }
  'torrent-reannounce': {
    request?: { ids?: TransmissionIdLookup }
    response: null
  }

  // 3.2.  Torrent Mutators
  'torrent-set': {
    request: TorrentSetRequest
    response: null
  }

  // 3.3.  Torrent Accessors
  'torrent-get': {
    request: {
      ids?: TransmissionIdLookup
      fields: (keyof TransmissionTorrent)[]
    }
    response: {
      torrents: TransmissionTorrent[]
      removed?: number[]
    }
  }

  // 3.4.  Adding a Torrent
  'torrent-add': {
    request: TorrentAddRequest
    response: {
      'torrent-added'?: {
        id: TransmissionTorrent['id']
        name: TransmissionTorrent['name']
        hashString: TransmissionTorrent['hashString']
      }
      'torrent-duplicate'?: {
        id: TransmissionTorrent['id']
        name: TransmissionTorrent['name']
        hashString: TransmissionTorrent['hashString']
      }
    }
  }

  // 3.5.  Removing a Torrent
  'torrent-remove': {
    request: {
      'ids': TransmissionIdLookup
      'delete-local-data'?: boolean
    }
    response: null
  }

  // 3.6.  Moving a Torrent
  'torrent-set-location': {
    request: {
      ids: TransmissionIdLookup
      location: string
      move?: boolean
    }
    response: null
  }

  // 3.7.  Renaming a Torrent's Path
  'torrent-rename-path': {
    request: {
      ids: TransmissionIdLookup
      path: string
      name: string
    }
    response: {
      id: number
      path: string
      name: string
    }
  }

  // 4.1.1.  Mutators
  'session-set': {
    request: Partial<TransmissionSession>
    response: null
  }

  // 4.1.2.  Accessors
  'session-get': {
    request: { fields?: (keyof TransmissionSession)[] }
    response: TransmissionSession
  }

  // 4.2.  Session Statistics
  'session-stats': {
    request: null
    response: TransmissionSessionStats
  }

  // 4.3.  Blocklist
  'blocklist-update': {
    request: null
    response: number
  }

  // 4.4.  Port Checking
  'port-test': {
    request: null
    response: boolean
  }

  // 4.5.  Session shutdown
  'session-close': {
    request: null
    response: null
  }

  // 4.6.  Queue Movement Requests
  'queue-move-top': {
    request: TransmissionIdLookup
    response: null
  }
  'queue-move-up': {
    request: TransmissionIdLookup
    response: null
  }
  'queue-move-down': {
    request: TransmissionIdLookup
    response: null
  }
  'queue-move-bottom': {
    request: TransmissionIdLookup
    response: null
  }

  // 4.7.  Free Space
  'free-space': {
    request: {
      path: string
    }
    response: {
      'path': string
      'size-bytes': number
    }
  }
}

interface TorrentAddRequest {
  /**       pointer to a string of one or more cookies. */
  'cookies'?: string
  /**       path to download the torrent to */
  'download-dir'?: string
  /**       filename or URL of the .torrent file */
  'filename'?: string
  /**       base64-encoded .torrent content */
  'metainfo'?: string
  /**      if true, don't start the torrent */
  'paused'?: boolean
  /**       maximum number of peers */
  'peer-limit'?: number
  /**       torrent's bandwidth tr_priority_t */
  'bandwidthPriority'?: number
  /**        indices of file(s) to download */
  'files-wanted'?: number[]
  /**        indices of file(s) to not download */
  'files-unwanted'?: number[]
  /**        indices of high-priority file(s) */
  'priority-high'?: number[]
  /**        indices of low-priority file(s) */
  'priority-low'?: number[]
  /**        indices of normal-priority file(s) */
  'priority-normal'?: number[]
}

interface TorrentSetRequest {
  /**      this torrent's bandwidth tr_priority_t */
  'bandwidthPriority': number
  /**      maximum download speed (KBps) */
  'downloadLimit': number
  /**     true if "downloadLimit" is honored */
  'downloadLimited': boolean
  /**       indices of file(s) to download */
  'files-wanted': number[]
  /**       indices of file(s) to not download */
  'files-unwanted': number[]
  /**     true if session upload limits are honored */
  'honorsSessionLimits': boolean
  /**       torrent list, as described in 3.1 */
  'ids': TransmissionIdLookup
  /**      new location of the torrent's content */
  'location': string
  /**      maximum number of peers */
  'peer-limit': number
  /**       indices of high-priority file(s) */
  'priority-high': number[]
  /**       indices of low-priority file(s) */
  'priority-low': number[]
  /**       indices of normal-priority file(s) */
  'priority-normal': number[]
  /**      position of this torrent in its queue [0...n) */
  'queuePosition': number
  /**      torrent-level number of minutes of seeding inactivity */
  'seedIdleLimit': number
  /**      which seeding inactivity to use.  See tr_idlelimit */
  'seedIdleMode': number
  /**      torrent-level seeding ratio */
  'seedRatioLimit': number
  /**      which ratio to use.  See tr_ratiolimit */
  'seedRatioMode': number
  /**       strings of announce URLs to add */
  'trackerAdd': string[]
  /**       ids of trackers to remove */
  'trackerRemove': string[]
  /**       pairs of <trackerId/new announce URLs> */
  'trackerReplace': [string, string][]
  /**      maximum upload speed (KBps) */
  'uploadLimit': number
  /**     true if "uploadLimit" is honored */
  'uploadLimited': boolean
}

interface TransmissionOptions {
  url: string
  username?: string
  password?: string
}

interface TransmissionFileStat {
  bytesCompleted: number
  priority: number
  wanted: boolean
}

interface TransmissionFile {
  bytesCompleted: number
  length: number
  name: string
}

interface TransmissionPeer {
  address: string
  clientIsChoked: boolean
  clientIsInterested: boolean
  clientName: string
  flagStr: string
  isDownloadingFrom: boolean
  isEncrypted: boolean
  isIncoming: boolean
  isUTP: boolean
  isUploadingTo: boolean
  peerIsChoked: boolean
  peerIsInterested: boolean
  port: number
  progress: number
  rateToClient: number
  rateToPeer: number
}

interface TransmissionTrackerStat {
  announce: string
  announceState: number
  downloadCount: number
  hasAnnounced: boolean
  hasScraped: boolean
  host: string
  id: number
  isBackup: boolean
  lastAnnouncePeerCount: number
  lastAnnounceResult: string
  lastAnnounceStartTime: number
  lastAnnounceSucceeded: boolean
  lastAnnounceTime: number
  lastAnnounceTimedOut: boolean
  lastScrapeResult: string
  lastScrapeStartTime: number
  lastScrapeSucceeded: boolean
  lastScrapeTime: number
  lastScrapeTimedOut: number
  leecherCount: number
  nextAnnounceTime: number
  nextScrapeTime: number
  scrape: string
  scrapeState: number
  seederCount: number
  tier: number
}

interface TransmissionTracker {
  announce: string
  id: number
  scrape: string
  tier: number
}

interface TransmissionTorrent {
  'activityDate': number
  'addedDate': number
  'bandwidthPriority': number
  'comment': string
  'corruptEver': number
  'creator': string
  'dateCreated': number
  'desiredAvailable': number
  'doneDate': number
  'downloadDir': string
  'downloadLimit': number
  'downloadLimited': boolean
  'downloadedEver': number
  'error': number
  'errorString': string
  'eta': number
  'fileStats': TransmissionFileStat[]
  'files': TransmissionFile[]
  'hashString': string
  'haveUnchecked': number
  'haveValid': number
  'honorsSessionLimits': boolean
  'id': number
  'isFinished': boolean
  'isPrivate': boolean
  'leftUntilDone': number
  'magnetLink': string
  'manualAnnounceTime': number
  'maxConnectedPeers': number
  'metadataPercentComplete': number
  'name': string
  'peer-limit': number
  'peers': TransmissionPeer[]
  'peersConnected': number
  'peersFrom': {
    fromCache: number
    fromDht: number
    fromIncoming: number
    fromLpd: number
    fromLtep: number
    fromPex: number
    fromTracker: number
  }
  'peersGettingFromUs': number
  'peersSendingToUs': number
  'percentDone': number
  'pieceCount': number
  'pieceSize': number
  'pieces': string
  'priorities': number[]
  'rateDownload': number
  'rateUpload': number
  'recheckProgress': number
  'seedIdleLimit': number
  'seedIdleMode': number
  'seedRatioLimit': number
  'seedRatioMode': number
  'sizeWhenDone': number
  'startDate': number
  'status': number
  'torrentFile': string
  'totalSize': number
  'trackerStats': TransmissionTrackerStat[]
  'trackers': TransmissionTracker[]
  'uploadLimit': number
  'uploadLimited': boolean
  'uploadRatio': number
  'uploadedEver': number
  'wanted': number[]
  'webseeds': string[]
  'webseedsSendingToUs': number
}

interface TransmissionSession {
  'alt-speed-down'?: number
  'alt-speed-enabled'?: boolean
  'alt-speed-time-begin'?: number
  'alt-speed-time-day'?: number
  'alt-speed-time-enabled'?: boolean
  'alt-speed-time-end'?: number
  'alt-speed-up'?: number
  'blocklist-enabled'?: boolean
  'blocklist-size'?: number
  'blocklist-url'?: string
  'cache-size-mb'?: number
  'config-dir'?: string
  'dht-enabled'?: boolean
  'download-dir'?: string
  'download-dir-free-space'?: number
  'download-queue-enabled'?: boolean
  'download-queue-size'?: number
  'encryption'?: 'required' | 'preferred' | 'tolerated'
  'idle-seeding-limit'?: number
  'idle-seeding-limit-enabled'?: boolean
  'incomplete-dir'?: string
  'incomplete-dir-enabled'?: boolean
  'lpd-enabled'?: boolean
  'peer-limit-global'?: number
  'peer-limit-per-torrent'?: number
  'peer-port'?: number
  'peer-port-random-on-start'?: boolean
  'pex-enabled'?: boolean
  'port-forwarding-enabled'?: boolean
  'queue-stalled-enabled'?: boolean
  'queue-stalled-minutes'?: number
  'rename-partial-files'?: boolean
  'rpc-version'?: number
  'rpc-version-minimum'?: number
  'script-torrent-done-enabled'?: boolean
  'script-torrent-done-filename'?: string
  'seed-queue-enabled'?: boolean
  'seed-queue-size'?: number
  'seedRatioLimit'?: number
  'seedRatioLimited'?: boolean
  'speed-limit-down'?: number
  'speed-limit-down-enabled'?: boolean
  'speed-limit-up'?: number
  'speed-limit-up-enabled'?: boolean
  'start-added-torrents'?: boolean
  'trash-original-torrent-files'?: boolean
  'units'?: {
    'memory-bytes'?: number
    'memory-units'?: string[]
    'size-bytes'?: number
    'size-units'?: string[]
    'speed-bytes'?: number
    'speed-units'?: string[]
  }
  'utp-enabled'?: boolean
  'version'?: string
}

interface TransmissionSessionStats {
  'activeTorrentCount': number
  'cumulative-stats': {
    downloadedBytes: number
    filesAdded: number
    secondsActive: number
    sessionCount: number
    uploadedBytes: number
  }
  'current-stats': {
    downloadedBytes: number
    filesAdded: number
    secondsActive: number
    sessionCount: number
    uploadedBytes: number
  }
  'downloadSpeed': number
  'pausedTorrentCount': number
  'torrentCount': number
  'uploadSpeed': number
}
