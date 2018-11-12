import apiInstance from '@src/api/apiInstance'
import { AppDispatch } from '@src/redux/types'
import getFilesFromEvent from '@src/util/getFilesFromEvent'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

// tslint:disable-next-line:function-name
function TorrentDropZone(props: ReturnType<typeof mapDispatch>) {
  hackDocumentPaste(props)

  return (
    <div
      onDrop={props.onDrop}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        opacity: 0.00001,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999999,
      }}
    />
  )
}

let isListeningToPaste = false
function hackDocumentPaste(props: Parameters<typeof TorrentDropZone>['0']) {
  if (isListeningToPaste) {
    return
  }

  document.addEventListener('paste', (event) => {
    handleDataTransfer(props.dispatch, event.clipboardData)
  })

  isListeningToPaste = true
}

function handleDataTransfer(dispatch: AppDispatch, dataTransfer: DataTransfer) {
  const prefix = 'data:application/x-bittorrent;base64,'
  const files = getFilesFromEvent(dataTransfer)

  files.forEach(async (x) => {
    if (x.text) {
      const response = await apiInstance.addUrl('torrent-add', {
        filename: x.text,
      })

      dispatch(actions.get([response.id]))
    } else if (x.file) {
      const data = await readFile(x.file)

      if (!data.startsWith(prefix)) {
        return
      }

      const response = await apiInstance.addBase64(data.slice(prefix.length))

      dispatch(actions.get([response.id]))
    }
  })
}

const mapDispatch = (dispatch: AppDispatch) => ({
  dispatch,
  onDrop: (event: React.DragEvent) => {
    handleDataTransfer(dispatch, event.dataTransfer)
  },
})

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result! as string)
    reader.onabort = () => reject(new Error())
    reader.onerror = () => reject(new Error())
    // reader.readAsText(file)
    reader.readAsDataURL(file)
  })
}

export default connect(
  undefined,
  mapDispatch,
)(TorrentDropZone)
