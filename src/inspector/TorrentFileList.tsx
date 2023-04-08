import { Folder, FolderOpen } from '@mui/icons-material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'

import convertFilesToGroup, {
  DirSpec,
  FileSpec,
} from '@src/torrents/convertFilesToGroup'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'

interface Props {
  torrent: TransmissionTorrent
}

function TorrentFileList(props: Props) {
  return (
    <List dense={true}>
      <ListHeaderTopBar>{props.torrent.name}</ListHeaderTopBar>
      {renderItem(convertFilesToGroup(props.torrent.files))}
    </List>
  )
}

function D(props: { d: DirSpec }) {
  const [open, setIsOpen] = useState(false)
  const icon = open ? 'folder_open' : 'folder'

  return (
    <>
      <ListItem divider={true} button={true} onClick={() => setIsOpen(!open)}>
        <ListItemIcon>
          <Icon color="action">{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.d.name} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit={true}>
        <List dense={true}>{props.d.children.map(renderItem)}</List>
      </Collapse>
    </>
  )
}

function renderItem(item: DirSpec | FileSpec) {
  if (item.type === 'file') {
    return (
      <ListItem divider={true}>
        <ListItemText
          inset={true}
          primary={item.name}
          secondary={`${((item.bytesCompleted / item.length) * 100).toFixed(
            0,
          )}%`}
        />
      </ListItem>
    )
  }

  if (item.type === 'directory') {
    return <D d={item} />
  }
}

export default TorrentFileList
