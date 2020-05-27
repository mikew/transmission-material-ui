import apiInstance from '@src/api/apiInstance'
import { sideEffect } from '@src/redux/sideEffects/middleware'
import wait from '@src/util/wait'

import * as actions from './actions'
import constants from './constants'

let timer: number | undefined

sideEffect(constants.startWatching, (_action, dispatch) => {
  if (timer) {
    return
  }

  timer = window.setInterval(() => {
    dispatch(actions.get(undefined, true))
  }, 5000)
})

sideEffect(constants.stopWatching, () => {
  if (!timer) {
    return
  }

  window.clearInterval(timer)
  timer = undefined
})

sideEffect(constants.addFields, (_action, dispatch) => {
  dispatch(actions.get())
})

sideEffect(constants.removeFields, (_action, dispatch) => {
  dispatch(actions.get())
})

sideEffect(
  constants.startTorrent,
  async (action: ReturnType<typeof actions.startTorrent>, dispatch) => {
    await apiInstance.callServer('torrent-start-now', {
      ids: action.payload,
    })
    dispatch(actions.get(action.payload))
  },
)

sideEffect(
  constants.stopTorrent,
  async (action: ReturnType<typeof actions.stopTorrent>, dispatch) => {
    await apiInstance.callServer('torrent-stop', { ids: action.payload })
    await wait(500)
    dispatch(actions.get(action.payload))
  },
)

sideEffect(
  constants.addTorrent,
  async (action: ReturnType<typeof actions.addTorrent>, dispatch) => {
    let response: { id: number } | undefined

    switch (action.payload.mode) {
      case 'base64':
        response = await apiInstance.addTorrentDataSrc({
          metainfo: action.payload.data,
          'download-dir': action.payload.location,
        })
        break
      case 'magnet':
        response = await apiInstance.addTorrentDataSrc({
          filename: action.payload.data,
          'download-dir': action.payload.location,
        })
        break
    }

    if (!response) {
      return
    }

    dispatch(actions.get([response.id]))
  },
)

sideEffect(
  constants.removeTorrent,
  (action: ReturnType<typeof actions.removeTorrent>) => {
    apiInstance.callServer('torrent-remove', {
      ids: action.payload.ids,
      'delete-local-data': action.payload.deleteData,
    })
  },
)
