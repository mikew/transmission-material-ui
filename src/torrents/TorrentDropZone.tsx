import { useEffect, useCallback, memo } from 'react'

import { AppDispatch } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import getFilesFromEvent from '@src/util/getFilesFromEvent'

import actions from './actions'

interface Props {
  children?: React.ReactNode
}

function TorrentDropZone(props: Props) {
  const dispatch = useDispatch()
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
  const { classes } = useStyles()

  return (
    <div onDrop={onDrop} className={classes.root}>
      {props.children}
    </div>
  )
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

export default memo(TorrentDropZone)
