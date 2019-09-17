import Collapse from '@material-ui/core/Collapse/Collapse'
import Icon from '@material-ui/core/Icon/Icon'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import convertFilesToGroup, {
  DirSpec,
  FileSpec,
} from '@src/torrents/convertFilesToGroup'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import React, { useState } from 'react'

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
    <React.Fragment>
      <ListItem divider={true} button={true} onClick={() => setIsOpen(!open)}>
        <ListItemIcon>
          <Icon color="action">{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.d.name} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit={true}>
        <List dense={true}>{props.d.children.map(renderItem)}</List>
      </Collapse>
    </React.Fragment>
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
