import apiInstance from '@src/api/apiInstance'
import { AppDispatch } from '@src/redux/types'
import getFilesFromEvent from '@src/util/getFilesFromEvent'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

type Props = ReturnType<typeof mapDispatch> & {
  children?: React.ReactNode
}

// tslint:disable-next-line:function-name
function TorrentDropZone(props: Props) {
  hackDocumentPaste(props)

  return <div onDrop={props.onDrop} children={props.children} />
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

function handleDataTransfer(
  dispatch: AppDispatch,
  dataTransfer: DataTransfer | null,
) {
  if (dataTransfer == null) {
    return
  }

  const filePrefixes = [
    'data:application/x-bittorrent;base64,',
    'data:application/octet-stream;base64,',
  ]
  const magnetPrefix = 'magnet:'
  const files = getFilesFromEvent(dataTransfer)

  files.forEach(async (x) => {
    const data = await x.reader()

    if (data.startsWith(magnetPrefix)) {
      const response = await apiInstance.addUrl('torrent-add', {
        filename: data,
      })

      dispatch(actions.get([response.id]))
    } else {
      for (const filePrefix of filePrefixes) {
        if (data.startsWith(filePrefix)) {
          const response = await apiInstance.addBase64(
            data.slice(filePrefix.length),
          )

          dispatch(actions.get([response.id]))
        }
      }
    }
  })
}

const mapDispatch = (dispatch: AppDispatch) => ({
  dispatch,
  onDrop: (event: React.DragEvent) => {
    handleDataTransfer(dispatch, event.dataTransfer)
  },
})

export default connect(
  undefined,
  mapDispatch,
)(TorrentDropZone)
