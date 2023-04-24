import { createReducer } from 'redux-easy-mode'

import actions from './actions'

export interface State {
  settings: TransmissionSession
  fields: Set<keyof TransmissionSession>
  isSettingsDialogVisible: boolean
}

const initialState: State = {
  fields: new Set<keyof TransmissionSession>(['alt-speed-enabled']),
  isSettingsDialogVisible: false,
  settings: {
    // TODO define these, they came back from the API but aren't defined.
    // 'anti-brute-force-enabled': false,
    // 'anti-brute-force-threshold': 100,
    // 'default-trackers': '',
    // 'rpc-version-semver': '5.3.0',
    // 'script-torrent-added-enabled': false,
    // 'script-torrent-added-filename': '',
    // 'script-torrent-done-seeding-enabled': false,
    // 'script-torrent-done-seeding-filename': '',
    // 'session-id': 'MyRAMAC2YZXRrO9UDsxe1clk188OVfWy7e33EC6t8zBTPvHp',
    // 'tcp-enabled': true,

    'alt-speed-down': 0,
    'alt-speed-enabled': false,
    'alt-speed-time-begin': 0,
    'alt-speed-time-day': 0,
    'alt-speed-time-enabled': false,
    'alt-speed-time-end': 0,
    'alt-speed-up': 0,
    'blocklist-enabled': false,
    'blocklist-size': 0,
    'blocklist-url': '',
    'cache-size-mb': 0,
    'config-dir': '',
    'dht-enabled': false,
    'download-dir': '',
    'download-dir-free-space': 0,
    'download-queue-enabled': false,
    'download-queue-size': 0,
    'encryption': 'tolerated',
    'idle-seeding-limit': 0,
    'idle-seeding-limit-enabled': false,
    'incomplete-dir': '',
    'incomplete-dir-enabled': false,
    'lpd-enabled': false,
    'peer-limit-global': 0,
    'peer-limit-per-torrent': 0,
    'peer-port': 0,
    'peer-port-random-on-start': false,
    'pex-enabled': false,
    'port-forwarding-enabled': false,
    'queue-stalled-enabled': false,
    'queue-stalled-minutes': 0,
    'rename-partial-files': false,

    'rpc-version': 0,
    'rpc-version-minimum': 0,

    'script-torrent-done-enabled': false,
    'script-torrent-done-filename': '',

    'seed-queue-enabled': false,
    'seed-queue-size': 0,
    'seedRatioLimit': 0,
    'seedRatioLimited': false,
    'speed-limit-down': 0,
    'speed-limit-down-enabled': false,
    'speed-limit-up': 0,
    'speed-limit-up-enabled': false,
    'start-added-torrents': false,
    'trash-original-torrent-files': false,
    'units': {
      'memory-bytes': 1024,
      'memory-units': ['KiB', 'MiB', 'GiB', 'TiB'],
      'size-bytes': 1000,
      'size-units': ['kB', 'MB', 'GB', 'TB'],
      'speed-bytes': 1000,
      'speed-units': ['kB/s', 'MB/s', 'GB/s', 'TB/s'],
    },
    'utp-enabled': false,
    'version': '',
  },
}

export default createReducer(initialState, (builder) => {
  builder
    .addSuccessHandler(actions.get, (state, action) => ({
      ...state,
      settings: {
        ...state.settings,
        ...action.payload,
      },
    }))
    .addHandler(actions.update, (state, action) => ({
      ...state,
      settings: {
        ...state.settings,
        ...action.payload,
      },
    }))
    .addHandler(actions.toggleDialog, (state, action) => ({
      ...state,
      isSettingsDialogVisible: !state.isSettingsDialogVisible,
    }))
    .addHandler(actions.showDialog, (state, action) => ({
      ...state,
      isSettingsDialogVisible: true,
    }))
    .addHandler(actions.hideDialog, (state, action) => ({
      ...state,
      isSettingsDialogVisible: false,
    }))
})
