import React from 'react'

import Inspector from '@src/inspector/Inspector'
import AddTorrentDialog from '@src/torrents/AddTorrentDialog'
import DeleteDialog from '@src/torrents/DeleteDialog'
import TorrentDropZone from '@src/torrents/TorrentDropZone'
import TorrentList from '@src/torrents/TorrentList'
import FloatingBarSpacer from '@src/util/FloatingBarSpacer'

import AppBar from './AppBar'
import TopAppBar from './TopAppBar'

function App() {
  return (
    <TorrentDropZone>
      <div className="App">
        <FloatingBarSpacer />
        <TorrentList />
        <FloatingBarSpacer />

        <Inspector />

        <AppBar />
        <TopAppBar />

        <AddTorrentDialog />
        <DeleteDialog />
      </div>
    </TorrentDropZone>
  )
}

export default React.memo(App)
