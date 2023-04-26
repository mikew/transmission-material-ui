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
    request: undefined | { fields?: (keyof TransmissionSession)[] }
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
    response: { 'blocklist-size': number }
  }

  // 4.4.  Port Checking
  'port-test': {
    request: null
    response: {
      'port-is-open': boolean
    }
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
      /**
       * same as the Request argument
       */
      'path': string

      /**
       * the size, in bytes, of the free space in that directory
       */
      'size-bytes': number

      /**
       * the total capacity, in bytes, of that directory
       */
      'total_size': number
    }
  }

  // 4.8 Bandwidth groups
  'group-set': {
    request: {
      /**
       * true if session upload limits are honored
       */
      'honorsSessionLimits': boolean

      /**
       * Bandwidth group name
       */
      'name': string

      /**
       * true means enabled
       */
      'speed-limit-down-enabled': boolean

      /**
       * max global download speed (KBps)
       */
      'speed-limit-down': number

      /**
       * true means enabled
       */
      'speed-limit-up-enabled': boolean

      /**
       * max global upload speed (KBps)
       */
      'speed-limit-up': number
    }

    response: null
  }
  'group-get': {
    request:
      | undefined
      | {
          group?: string | string[]
        }
    response: {
      /**
       * true if session upload limits are honored
       */
      'honorsSessionLimits': boolean

      /**
       * Bandwidth group name
       */
      'name': string

      /**
       * true means enabled
       */
      'speed-limit-down-enabled': boolean

      /**
       * max global download speed (KBps)
       */
      'speed-limit-down': number

      /**
       * true means enabled
       */
      'speed-limit-up-enabled': boolean

      /**
       * max global upload speed (KBps)
       */
      'speed-limit-up': number
    }[]
  }
}

interface TorrentAddRequest {
  /**
   * pointer to a string of one or more cookies.
   */
  'cookies'?: string

  /**
   * path to download the torrent to
   */
  'download-dir'?: string

  /**
   * filename or URL of the .torrent file
   */
  'filename'?: string

  /**
   * array of string labels
   */
  'labels'?: string[]

  /**
   * base64-encoded .torrent content
   */
  'metainfo'?: string

  /**
   * if true, don't start the torrent
   */
  'paused'?: boolean

  /**
   * maximum number of peers
   */
  'peer-limit'?: number

  /**
   * torrent's bandwidth tr_priority_t
   */
  'bandwidthPriority'?: number

  /**
   * indices of file(s) to download
   */
  'files-wanted'?: number[]

  /**
   * indices of file(s) to not download
   */
  'files-unwanted'?: number[]

  /**
   * indices of high-priority file(s)
   */
  'priority-high'?: number[]

  /**
   * indices of low-priority file(s)
   */
  'priority-low'?: number[]

  /**
   * indices of normal-priority file(s)
   */
  'priority-normal'?: number[]
}

interface TorrentSetRequest {
  /**
   * this torrent's bandwidth tr_priority_t
   */
  'bandwidthPriority'?: number

  /**
   * maximum download speed (KBps)
   */
  'downloadLimit'?: number

  /**
   * true if downloadLimit is honored
   */
  'downloadLimited'?: boolean

  /**
   * indices of file(s) to not download
   */
  'files-unwanted'?: number[]

  /**
   * indices of file(s) to download
   */
  'files-wanted'?: number[]

  /**
   * The name of this torrent's bandwidth group
   */
  'group'?: string

  /**
   * true if session upload limits are honored
   */
  'honorsSessionLimits'?: boolean

  /**
   * torrent list, as described in 3.1
   */
  'ids'?: TransmissionIdLookup

  /**
   * array of string labels
   */
  'labels'?: string[]

  /**
   * new location of the torrent's content
   */
  'location'?: string

  /**
   * maximum number of peers
   */
  'peer-limit'?: number

  /**
   * indices of high-priority file(s)
   */
  'priority-high'?: number[]

  /**
   * indices of low-priority file(s)
   */
  'priority-low'?: number[]

  /**
   * indices of normal-priority file(s)
   */
  'priority-normal'?: number[]

  /**
   * position of this torrent in its queue [0...n)
   */
  'queuePosition'?: number

  /**
   * torrent-level number of minutes of seeding inactivity
   */
  'seedIdleLimit'?: number

  /**
   * which seeding inactivity to use. See tr_idlelimit
   */
  'seedIdleMode'?: number

  /**
   * torrent-level seeding ratio
   */
  'seedRatioLimit'?: number

  /**
   * which ratio to use. See tr_ratiolimit
   */
  'seedRatioMode'?: number

  /**
   * download torrent pieces sequentially
   */
  'sequentialDownload'?: boolean

  /**
   * @deprecated use trackerList instead
   */
  'trackerAdd'?: string[]

  /**
   * string of announce URLs, one per line, and a blank line between tiers.
   */
  'trackerList'?: string

  /**
   * @deprecated use trackerList instead
   */
  'trackerRemove'?: string[]

  /**
   * @deprecated use trackerList instead
   */
  'trackerReplace'?: [string, string][]

  /**
   * maximum upload speed (KBps)
   */
  'uploadLimit'?: number

  /**
   * true if uploadLimit is honored
   */
  'uploadLimited'?: boolean
}

interface TransmissionOptions {
  url: string
  username?: string
  password?: string
}

interface TransmissionFileStat {
  /**
   * tr_file_view
   */
  bytesCompleted: number

  /**
   * tr_file_view (Note: For backwards compatibility, this is serialized as an
   * array of 0 or 1 that should be treated as booleans)
   */
  wanted: number

  /**
   * tr_file_view
   */
  priority: number
}

interface TransmissionFile {
  /**
   * tr_file_view
   */
  bytesCompleted: number

  /**
   * tr_file_view
   */
  length: number

  /**
   * tr_file_view
   */
  name: string
}

interface TransmissionPeer {
  /**
   * tr_peer_stat
   */
  address: string

  /**
   * tr_peer_stat
   */
  clientName: string

  /**
   * tr_peer_stat
   */
  clientIsChoked: boolean

  /**
   * tr_peer_stat
   */
  clientIsInterested: boolean

  /**
   * tr_peer_stat
   */
  flagStr: string

  /**
   * tr_peer_stat
   */
  isDownloadingFrom: boolean

  /**
   * tr_peer_stat
   */
  isEncrypted: boolean

  /**
   * tr_peer_stat
   */
  isIncoming: boolean

  /**
   * tr_peer_stat
   */
  isUploadingTo: boolean

  /**
   * tr_peer_stat
   */
  isUTP: boolean

  /**
   * tr_peer_stat
   */
  peerIsChoked: boolean

  /**
   * tr_peer_stat
   */
  peerIsInterested: boolean

  /**
   * tr_peer_stat
   */
  port: number

  /**
   * tr_peer_stat
   */
  progress: number

  /**
   * tr_peer_stat
   */
  rateToClient: number

  /**
   * tr_peer_stat
   */
  rateToPeer: number
}

interface TransmissionPeersFrom {
  /**
   * tr_stat
   */
  fromCache: number

  /**
   * tr_stat
   */
  fromDht: number

  /**
   * tr_stat
   */
  fromIncoming: number

  /**
   * tr_stat
   */
  fromLpd: number

  /**
   * tr_stat
   */
  fromLtep: number

  /**
   * tr_stat
   */
  fromPex: number

  /**
   * tr_stat
   */
  fromTracker: number
}

interface TransmissionTrackerStat {
  /**
   * tr_tracker_view
   */
  announceState: number

  /**
   * tr_tracker_view
   */
  announce: string

  /**
   * tr_tracker_view
   */
  downloadCount: number

  /**
   * tr_tracker_view
   */
  hasAnnounced: boolean

  /**
   * tr_tracker_view
   */
  hasScraped: boolean

  /**
   * tr_tracker_view
   */
  host: string

  /**
   * tr_tracker_view
   */
  id: number

  /**
   * tr_tracker_view
   */
  isBackup: boolean

  /**
   * tr_tracker_view
   */
  lastAnnouncePeerCount: number

  /**
   * tr_tracker_view
   */
  lastAnnounceResult: string

  /**
   * tr_tracker_view
   */
  lastAnnounceStartTime: number

  /**
   * tr_tracker_view
   */
  lastAnnounceSucceeded: boolean

  /**
   * tr_tracker_view
   */
  lastAnnounceTime: number

  /**
   * tr_tracker_view
   */
  lastAnnounceTimedOut: boolean

  /**
   * tr_tracker_view
   */
  lastScrapeResult: string

  /**
   * tr_tracker_view
   */
  lastScrapeStartTime: number

  /**
   * tr_tracker_view
   */
  lastScrapeSucceeded: boolean

  /**
   * tr_tracker_view
   */
  lastScrapeTime: number

  /**
   * tr_tracker_view
   */
  lastScrapeTimedOut: boolean

  /**
   * tr_tracker_view
   */
  leecherCount: number

  /**
   * tr_tracker_view
   */
  nextAnnounceTime: number

  /**
   * tr_tracker_view
   */
  nextScrapeTime: number

  /**
   * tr_tracker_view
   */
  scrapeState: number

  /**
   * tr_tracker_view
   */
  scrape: string

  /**
   * tr_tracker_view
   */
  seederCount: number

  /**
   * tr_tracker_view
   */
  sitename: string

  /**
   * tr_tracker_view
   */
  tier: number
}

interface TransmissionTracker {
  /**
   * tr_tracker_view
   */
  announce: string

  /**
   * tr_tracker_view
   */
  id: number

  /**
   * tr_tracker_view
   */
  scrape: string

  /**
   * tr_tracker_view
   */
  sitename: string

  /**
   * tr_tracker_view
   */
  tier: number
}

interface TransmissionTorrent {
  /**
   * tr_stat
   */
  'activityDate': number

  /**
   * tr_stat
   */
  'addedDate': number

  /**
   * An array of pieceCount numbers representing the number of connected peers
   * that have each piece, or -1 if we already have the piece ourselves.
   */
  'availability': number[]

  /**
   * tr_priority_t
   */
  'bandwidthPriority': number

  /**
   * tr_torrent_view
   */
  'comment': string

  /**
   * tr_stat
   */
  'corruptEver': number

  /**
   * tr_torrent_view
   */
  'creator': string

  /**
   * tr_torrent_view
   */
  'dateCreated': number

  /**
   * tr_stat
   */
  'desiredAvailable': number

  /**
   * tr_stat
   */
  'doneDate': number

  /**
   * tr_torrent
   */
  'downloadDir': string

  /**
   * tr_stat
   */
  'downloadedEver': number

  /**
   * tr_torrent
   */
  'downloadLimit': number

  /**
   * tr_torrent
   */
  'downloadLimited': boolean

  /**
   * tr_stat
   */
  'editDate': number

  /**
   * tr_stat
   */
  'error': number

  /**
   * tr_stat
   */
  'errorString': string

  /**
   * tr_stat
   */
  'eta': number

  /**
   * tr_stat
   */
  'etaIdle': number

  /**
   * tr_info
   */
  'file-count': number

  /**
   * n/a
   */
  'files': TransmissionFile[]

  /**
   * a file's non-constant properties.
   */
  'fileStats': TransmissionFileStat[]

  /**
   * n/a
   */
  'group': string

  /**
   * tr_torrent_view
   */
  'hashString': string

  /**
   * tr_stat
   */
  'haveUnchecked': number

  /**
   * tr_stat
   */
  'haveValid': number

  /**
   * tr_torrent
   */
  'honorsSessionLimits': boolean

  /**
   * tr_torrent
   */
  'id': number

  /**
   * tr_stat
   */
  'isFinished': boolean

  /**
   * tr_torrent
   */
  'isPrivate': boolean

  /**
   * tr_stat
   */
  'isStalled': boolean

  /**
   * tr_torrent
   */
  'labels': string[]

  /**
   * tr_stat
   */
  'leftUntilDone': number

  /**
   * n/a
   */
  'magnetLink': string

  /**
   * tr_stat
   */
  'manualAnnounceTime': number

  /**
   * tr_torrent
   */
  'maxConnectedPeers': number

  /**
   * tr_stat
   */
  'metadataPercentComplete': number

  /**
   * tr_torrent_view
   */
  'name': string

  /**
   * tr_torrent
   */
  'peer-limit': number

  /**
   * n/a
   */
  'peers': TransmissionPeer[]

  /**
   * tr_stat
   */
  'peersConnected': number

  /**
   * n/a
   */
  'peersFrom': TransmissionPeersFrom[]

  /**
   * tr_stat
   */
  'peersGettingFromUs': number

  /**
   * tr_stat
   */
  'peersSendingToUs': number

  /**
   * tr_stat
   */
  'percentComplete': number

  /**
   * tr_stat
   */
  'percentDone': number

  /**
   * A bitfield holding pieceCount flags which are set to 'true' if we have the
   * piece matching that position. JSON doesn't allow raw binary data, so this
   * is a base64-encoded string.
   */
  'pieces': string

  /**
   * tr_torrent_view
   */
  'pieceCount': number

  /**
   * tr_torrent_view
   */
  'pieceSize': number

  /**
   * An array of tr_torrentFileCount() numbers. Each is the tr_priority_t mode
   * for the corresponding file.
   */
  'priorities': number[]

  /**
   * tr_torrent
   */
  'primary-mime-type': string

  /**
   * tr_stat
   */
  'queuePosition': number

  /**
   * tr_stat
   */
  'rateDownload': number

  /**
   * tr_stat
   */
  'rateUpload': number

  /**
   * tr_stat
   */
  'recheckProgress': number

  /**
   * tr_stat
   */
  'secondsDownloading': number

  /**
   * tr_stat
   */
  'secondsSeeding': number

  /**
   * tr_torrent
   */
  'seedIdleLimit': number

  /**
   * tr_inactivelimit
   */
  'seedIdleMode': number

  /**
   * tr_torrent
   */
  'seedRatioLimit': number

  /**
   * tr_ratiolimit
   */
  'seedRatioMode': number

  /**
   * tr_torrent
   */
  'sequentialDownload': boolean

  /**
   * tr_stat
   */
  'sizeWhenDone': number

  /**
   * tr_stat
   */
  'startDate': number

  /**
   * A number between 0 and 6, where:
   * 0 - Torrent is stopped
   * 1 - Torrent is queued to verify local data
   * 2 - Torrent is verifying local data
   * 3 - Torrent is queued to download
   * 4 - Torrent is downloading
   * 5 - Torrent is queued to seed
   * 6 - Torrent is seeding
   */
  'status': number

  /**
   * n/a
   */
  'trackers': TransmissionTracker[]

  /**
   * string of announce URLs, one per line, with a blank line between tiers
   */
  'trackerList': string

  /**
   * n/a
   */
  'trackerStats': TransmissionTrackerStat[]

  /**
   * tr_torrent_view
   */
  'totalSize': number

  /**
   * tr_info
   */
  'torrentFile': string

  /**
   * tr_stat
   */
  'uploadedEver': number

  /**
   * tr_torrent
   */
  'uploadLimit': number

  /**
   * tr_torrent
   */
  'uploadLimited': boolean

  /**
   * tr_stat
   */
  'uploadRatio': number

  /**
   * An array of tr_torrentFileCount() Booleans true if the corresponding file
   * is to be downloaded.
   */
  'wanted': number[]

  /**
   * tr_tracker_view
   */
  'webseeds': string[]

  /**
   * tr_stat
   */
  'webseedsSendingToUs': number
}

interface TransmissionSession {
  /**
   * max global download speed (KBps)
   */
  'alt-speed-down': number

  /**
   * true means use the alt speeds
   */
  'alt-speed-enabled': boolean

  /**
   * when to turn on alt speeds (units: minutes after midnight)
   */
  'alt-speed-time-begin': number

  /**
   * what day(s) to turn on alt speeds (look at tr_sched_day)
   */
  'alt-speed-time-day': number

  /**
   * true means the scheduled on/off times are used
   */
  'alt-speed-time-enabled': boolean

  /**
   * when to turn off alt speeds (units: same)
   */
  'alt-speed-time-end': number

  /**
   * max global upload speed (KBps)
   */
  'alt-speed-up': number

  /**
   * true means enabled
   */
  'blocklist-enabled': boolean

  /**
   * number of rules in the blocklist
   */
  'blocklist-size': number

  /**
   * location of the blocklist to use for blocklist-update
   */
  'blocklist-url': string

  /**
   * maximum size of the disk cache (MB)
   */
  'cache-size-mb': number

  /**
   * location of transmission's configuration directory
   */
  'config-dir': string

  /**
   * announce URLs, one per line, and a blank line between tiers.
   */
  'default-trackers': string

  /**
   * true means allow DHT in public torrents
   */
  'dht-enabled': boolean

  /**
   * default path to download torrents
   */
  'download-dir': string

  /**
   * @deprecated Use the free-space method instead.
   */
  'download-dir-free-space': number

  /**
   * if true, limit how many torrents can be downloaded at once
   */
  'download-queue-enabled': boolean

  /**
   * max number of torrents to download at once (see download-queue-enabled)
   */
  'download-queue-size': number

  /**
   * required, preferred, tolerated
   */
  'encryption': 'required' | 'preferred' | 'tolerated'

  /**
   * true if the seeding inactivity limit is honored by default
   */
  'idle-seeding-limit-enabled': boolean

  /**
   * torrents we're seeding will be stopped if they're idle for this long
   */
  'idle-seeding-limit': number

  /**
   * true means keep torrents in incomplete-dir until done
   */
  'incomplete-dir-enabled': boolean

  /**
   * path for incomplete torrents, when enabled
   */
  'incomplete-dir': string

  /**
   * true means allow Local Peer Discovery in public torrents
   */
  'lpd-enabled': boolean

  /**
   * maximum global number of peers
   */
  'peer-limit-global': number

  /**
   * maximum global number of peers
   */
  'peer-limit-per-torrent': number

  /**
   * true means pick a random peer port on launch
   */
  'peer-port-random-on-start': boolean

  /**
   * port number
   */
  'peer-port': number

  /**
   * true means allow PEX in public torrents
   */
  'pex-enabled': boolean

  /**
   * true means ask upstream router to forward the configured peer port to
   * transmission using UPnP or NAT-PMP
   */
  'port-forwarding-enabled': boolean

  /**
   * whether or not to consider idle torrents as stalled
   */
  'queue-stalled-enabled': boolean

  /**
   * torrents that are idle for N minuets aren't counted toward seed-queue-size
   * or download-queue-size
   */
  'queue-stalled-minutes': number

  /**
   * true means append .part to incomplete files
   */
  'rename-partial-files': boolean

  /**
   * the minimum RPC API version supported
   */
  'rpc-version-minimum': number

  /**
   * the current RPC API version in a semver-compatible string
   */
  'rpc-version-semver': string

  /**
   * the current RPC API version
   */
  'rpc-version': number

  /**
   * whether or not to call the added script
   */
  'script-torrent-added-enabled': boolean

  /**
   * filename of the script to run
   */
  'script-torrent-added-filename': string

  /**
   * whether or not to call the done script
   */
  'script-torrent-done-enabled': boolean

  /**
   * filename of the script to run
   */
  'script-torrent-done-filename': string

  /**
   * whether or not to call the seeding-done script
   */
  'script-torrent-done-seeding-enabled': boolean

  /**
   * filename of the script to run
   */
  'script-torrent-done-seeding-filename': string

  /**
   * if true, limit how many torrents can be uploaded at once
   */
  'seed-queue-enabled': boolean

  /**
   * max number of torrents to uploaded at once (see seed-queue-enabled)
   */
  'seed-queue-size': number

  /**
   * the default seed ratio for torrents to use
   */
  'seedRatioLimit': number

  /**
   * true if seedRatioLimit is honored by default
   */
  'seedRatioLimited': boolean

  /**
   * true means enabled
   */
  'speed-limit-down-enabled': boolean

  /**
   * max global download speed (KBps)
   */
  'speed-limit-down': number

  /**
   * true means enabled
   */
  'speed-limit-up-enabled': boolean

  /**
   * max global upload speed (KBps)
   */
  'speed-limit-up': number

  /**
   * true means added torrents will be started right away
   */
  'start-added-torrents': boolean

  /**
   * true means the .torrent file of added torrents will be deleted
   */
  'trash-original-torrent-files': boolean

  /**
   * see below
   */
  'units': TransmissionUnit

  /**
   * true means allow UTP
   */
  'utp-enabled': boolean

  /**
   * long version string $version ($revision)
   */
  'version': string
}

interface TransmissionUnit {
  /**
   * 4 strings: KB/s, MB/s, GB/s, TB/s
   */
  'speed-units': string[]

  /**
   * number of bytes in a KB (1000 for kB; 1024 for KiB)
   */
  'speed-bytes': number

  /**
   * 4 strings: KB/s, MB/s, GB/s, TB/s
   */
  'size-units': string[]

  /**
   * number of bytes in a KB (1000 for kB; 1024 for KiB)
   */
  'size-bytes': number

  /**
   * 4 strings: KB/s, MB/s, GB/s, TB/s
   */
  'memory-units': string[]

  /**
   * number of bytes in a KB (1000 for kB; 1024 for KiB)
   */
  'memory-bytes': number
}

// NGL These are awkwardly named, but we've been dealt a shit hand.
// Transmission calls it's settings/preferences "session".
// That API has a thing called "stats".
// That API has two properties: cumulative-stats and current-stats
// You might call "cumulative" and "current" ... sessions, and those things are
// "stats".
// So, we end up with TransmissionSessionStats and ...
// TransmissionSessionSessionStat.
interface TransmissionSessionStats {
  'activeTorrentCount': number
  'downloadSpeed': number
  'pausedTorrentCount': number
  'torrentCount': number
  'uploadSpeed': number
  'cumulative-stats': TransmissionSessionSessionStat
  'current-stats': TransmissionSessionSessionStat
}

interface TransmissionSessionSessionStat {
  /**
   * tr_session_stats
   */
  uploadedBytes: number

  /**
   * tr_session_stats
   */
  downloadedBytes: number

  /**
   * tr_session_stats
   */
  filesAdded: number

  /**
   * tr_session_stats
   */
  sessionCount: number

  /**
   * tr_session_stats
   */
  secondsActive: number
}
