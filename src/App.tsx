import * as React from 'react'

import AppBar from './AppBar'
import TopAppBar from './TopAppBar'
import AddTorrentDialog from './torrents/AddTorrentDialog'
import Inspector from './torrents/Inspector'
import TorrentDropZone from './torrents/TorrentDropZone'
import TorrentList from './torrents/TorrentList'
import FloatingBarSpacer from './util/FloatingBarSpacer'

// tslint:disable-next-line:function-name
function App() {
  return (
    <div className="App">
      <FloatingBarSpacer />
      <TorrentList />
      <FloatingBarSpacer />

      <Inspector />

      <AppBar />
      <TopAppBar />

      <AddTorrentDialog />
      <TorrentDropZone />
    </div>
  )
}

export default App
