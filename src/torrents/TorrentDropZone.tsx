import { AppDispatch } from '@src/redux/types'
import getFilesFromEvent from '@src/util/getFilesFromEvent'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

type Props = ReturnType<typeof mapDispatch> & {
  children?: React.ReactNode
}

function TorrentDropZone(props: Props) {
  useEffect(() => {
    document.addEventListener('paste', (event) => {
      if (event.target && (event.target as HTMLElement).tagName === 'INPUT') {
        return
      }

      handleDataTransfer(props.dispatch, event.clipboardData)
    })
  }, [])

  return <div onDrop={props.onDrop} children={props.children} />
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
      dispatch(actions.addTorrent({ data, mode: 'magnet' }))
    } else {
      for (const filePrefix of filePrefixes) {
        if (data.startsWith(filePrefix)) {
          dispatch(
            actions.addTorrent({
              mode: 'base64',
              data: data.slice(filePrefix.length),
            }),
          )
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
