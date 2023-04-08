import Toolbar from '@mui/material/Toolbar'
import Head from 'next/head'
import TorrentList from '@src/torrents/TorrentList'
import Inspector from '@src/inspector/Inspector'
import TopAppBar from '@src/shell/TopAppBar'
import AddTorrentDialog from '@src/torrents/AddTorrentDialog'
import DeleteDialog from '@src/torrents/DeleteDialog'
import BottomAppBar from '@src/shell/BottomAppBar'
import { useEffect } from 'react'
import { useRootDispatch } from '@src/redux/helpers'
import actions from '@src/settings/actions'
import TorrentDropZone from '@src/torrents/TorrentDropZone'


  const dispatch = useRootDispatch()

  useEffect(() => {
    dispatch(actions.getCustomSettings())
  }, [])

  return (
    <>
      <Head>
        <title>Transmission</title>
      </Head>

      <TorrentDropZone>
        <TopAppBar />
        <Toolbar variant="dense" />

        <TorrentList />

        <AddTorrentDialog />
        <DeleteDialog />
        <Inspector />

        <Toolbar variant="dense" />
        <BottomAppBar />
      </TorrentDropZone>
    </>
  )
}
