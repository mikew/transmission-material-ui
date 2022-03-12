import { shallowEqual } from 'react-redux'
import { reduxActionSideEffect, reduxSelectorSideEffect } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import { RootState } from '@src/redux/types'
import wait from '@src/util/wait'

import actions from './actions'

const HEARTBEAT_TIMEOUT = 5_000

// Keep a heartbeat going that fetches all torrents.
reduxSelectorSideEffect(
  (state: RootState) => state.torrents.isWatching,
  (value, _previousValue, dispatch) => {
    let timer: number | undefined

    if (value) {
      dispatch(actions.get(undefined, true))
      timer = window.setInterval(() => {
        dispatch(actions.get(undefined, true))
      }, HEARTBEAT_TIMEOUT)
    }

    return () => {
      window.clearInterval(timer)
    }
  },
)

// If the api up, set at timer for just longer than the heartbeat to mark it as
// down.
reduxSelectorSideEffect(
  (state: RootState) => state.torrents.lastCommunication,
  (_value, _previousValue, dispatch) => {
    const timeout = window.setTimeout(() => {
      dispatch(actions.setIsApiDown(true))
    }, HEARTBEAT_TIMEOUT * 1.5)

    return () => {
      window.clearTimeout(timeout)
    }
  },
)

// If the api is considered down, but the lastCommunication has changed,
// consider it up.
reduxSelectorSideEffect(
  (state: RootState) => ({
    lastCommunication: state.torrents.lastCommunication,
    isApiDown: state.torrents.isApiDown,
  }),
  (value, previousValue, dispatch) => {
    if (
      value.isApiDown &&
      value.lastCommunication !== previousValue?.lastCommunication
    ) {
      dispatch(actions.setIsApiDown(false))
    }
  },
  shallowEqual,
)

// If the api is considered down but for some reason we are watching, set a long
// timer to stop watching.
reduxSelectorSideEffect(
  (state: RootState) => ({
    isApiDown: state.torrents.isApiDown,
    isWatching: state.torrents.isWatching,
  }),
  (value, _previousValue, dispatch) => {
    let timeout: number | undefined

    if (value.isApiDown && value.isWatching) {
      timeout = window.setTimeout(
        () => dispatch(actions.stopWatching()),
        HEARTBEAT_TIMEOUT * 3,
      )
    }

    return () => {
      window.clearTimeout(timeout)
    }
  },
  shallowEqual,
)

// Refetch when the requested torrent fields changes.
reduxSelectorSideEffect(
  (state: RootState) => state.torrents.fields,
  (_value, previousValue, dispatch) => {
    if (previousValue !== undefined) {
      dispatch(actions.get())
    }
  },
)

reduxActionSideEffect(actions.startTorrent, (action, dispatch) => {
  async function run() {
    await apiInstance.callServer('torrent-start-now', {
      ids: action.payload,
    })
    dispatch(actions.get(action.payload))
  }

  run()
})

reduxActionSideEffect(actions.stopTorrent, (action, dispatch) => {
  async function run() {
    await apiInstance.callServer('torrent-stop', { ids: action.payload })
    await wait(500)
    dispatch(actions.get(action.payload))
  }

  run()
})

reduxActionSideEffect(actions.addTorrent, (action, dispatch) => {
  async function run() {
    let response: { id: number } | undefined

    switch (action.payload.mode) {
      case 'base64':
        response = await apiInstance.addTorrentDataSrc({
          'metainfo': action.payload.data,
          'download-dir': action.payload.location,
        })
        break
      case 'magnet':
        response = await apiInstance.addTorrentDataSrc({
          'filename': action.payload.data,
          'download-dir': action.payload.location,
        })
        break
    }

    if (!response) {
      return
    }

    dispatch(actions.get([response.id]))
  }

  run()
})

reduxActionSideEffect(actions.removeTorrent, (action) => {
  apiInstance.callServer('torrent-remove', {
    'ids': action.payload.ids,
    'delete-local-data': action.payload.deleteData,
  })
})
