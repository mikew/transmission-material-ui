import React, { useEffect } from 'react'

import { AppDispatch } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import getFilesFromEvent from '@src/util/getFilesFromEvent'

import * as actions from './actions'

interface Props {
  children?: React.ReactNode
}

function TorrentDropZone(props: Props) {
  const dispatch = useDispatch()
  const onDrop = (event: React.DragEvent) =>
    handleDataTransfer(dispatch, event.dataTransfer)
  useEffect(() => {
    document.addEventListener('paste', (event) => {
      if (event.target && (event.target as HTMLElement).tagName === 'INPUT') {
        return
      }

      handleDataTransfer(dispatch, event.clipboardData)
    })
  }, [dispatch])

  return <div onDrop={onDrop} children={props.children} />
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

export default React.memo(TorrentDropZone)
