import { reduxActionSideEffect } from 'redux-easy-mode'

import apiInstance from '@src/api/apiInstance'
import wait from '@src/util/wait'

import actions from './actions'

let timer: number | undefined

reduxActionSideEffect(actions.startWatching, ({ dispatch }) => {
  if (timer) {
    return
  }

  timer = window.setInterval(() => {
    dispatch(actions.get(undefined, true))
  }, 5000)
})

reduxActionSideEffect(actions.stopWatching, () => {
  if (!timer) {
    return
  }

  window.clearInterval(timer)
  timer = undefined
})

reduxActionSideEffect(actions.addFields, ({ dispatch }) => {
  dispatch(actions.get())
})

reduxActionSideEffect(actions.removeFields, ({ dispatch }) => {
  dispatch(actions.get())
})

reduxActionSideEffect(actions.startTorrent, async ({ action, dispatch }) => {
  await apiInstance.callServer('torrent-start-now', {
    ids: action.payload,
  })
  dispatch(actions.get(action.payload))
})

reduxActionSideEffect(actions.stopTorrent, async ({ action, dispatch }) => {
  await apiInstance.callServer('torrent-stop', { ids: action.payload })
  await wait(500)
  dispatch(actions.get(action.payload))
})

reduxActionSideEffect(actions.addTorrent, async ({ action, dispatch }) => {
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
})

reduxActionSideEffect(actions.removeTorrent, ({ action }) => {
  apiInstance.callServer('torrent-remove', {
    ids: action.payload.ids,
    'delete-local-data': action.payload.deleteData,
  })
})
