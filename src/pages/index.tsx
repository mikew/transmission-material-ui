import Toolbar from '@mui/material/Toolbar'
import Head from 'next/head'
import { useEffect } from 'react'

import Inspector from '@src/inspector/Inspector'
import { useRootDispatch } from '@src/redux/helpers'
import actions from '@src/settings/actions'
import BottomAppBar from '@src/shell/BottomAppBar'
import TopAppBar from '@src/shell/TopAppBar'
import AddTorrentDialog from '@src/torrents/AddTorrentDialog'
import DeleteDialog from '@src/torrents/DeleteDialog'
import TorrentDropZone from '@src/torrents/TorrentDropZone'
import TorrentList from '@src/torrents/TorrentList'


  const dispatch = useRootDispatch()

  useEffect(() => {
    dispatch(actions.getCustomSettings())
  }, [dispatch])

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
