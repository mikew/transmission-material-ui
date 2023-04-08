import { Box } from '@mui/material'
import { useEffect, useCallback, memo } from 'react'

import getFilesFromEvent from '@src/lib/getFilesFromEvent'
import { useRootDispatch } from '@src/redux/helpers'

import actions from './actions'

interface Props {
  children?: React.ReactNode
}

function TorrentDropZone(props: Props) {
  const dispatch = useRootDispatch()
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      handleDataTransfer(dispatch, event.dataTransfer)
    },
    [dispatch],
  )
  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      if (event.target && (event.target as HTMLElement).tagName === 'INPUT') {
        return
      }

      handleDataTransfer(dispatch, event.clipboardData)
    }
    document.addEventListener('paste', handler)

    return () => {
      document.removeEventListener('paste', handler)
    }
  }, [dispatch])

  return (
    <Box onDrop={onDrop} sx={{ height: '100%' }}>
      {props.children}
    </Box>
  )
}

function handleDataTransfer(
  dispatch: RootDispatch,
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

export default memo(TorrentDropZone)
