import { Box } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Head from 'next/head'
import { useEffect } from 'react'

import Inspector from '@src/inspector/Inspector'
import MobileNavigationSpacer from '@src/lib/MobileNavigationSpacer'
import { useRootDispatch } from '@src/redux/helpers'
import actions from '@src/settings/actions'
import BottomAppBar from '@src/shell/BottomAppBar'
import TopAppBar from '@src/shell/TopAppBar'
import StatsDialog from '@src/stats/StatsDialog'
import AddTorrentDialog from '@src/torrents/AddTorrentDialog'
import DeleteDialog from '@src/torrents/DeleteDialog'
import StatusNotifier from '@src/torrents/StatusNotifier'
import TorrentDropZone from '@src/torrents/TorrentDropZone'
import TorrentList from '@src/torrents/TorrentList'
import SettingsDialog from '@src/transmissionSettings/SettingsDialog'

export default function Home() {
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

        <TorrentList />

        <AddTorrentDialog />
        <DeleteDialog />
        <Inspector />
        <SettingsDialog />
        <StatsDialog />

        <MobileNavigationSpacer>
          <Toolbar variant="dense" />
        </MobileNavigationSpacer>

        <Box
          display={{
            xxs: 'none',
            xs: 'block',
          }}
        >
          <BottomAppBar />
        </Box>

        <StatusNotifier />
      </TorrentDropZone>
    </>
  )
}
