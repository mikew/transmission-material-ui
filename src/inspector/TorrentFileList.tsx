import {
  Album,
  Article,
  Audiotrack,
  ClosedCaption,
  Folder,
  FolderOpen,
  InsertDriveFile,
  MenuOpen,
  Photo,
  Terminal,
  Videocam,
} from '@mui/icons-material'
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import { Box, List } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Fragment } from 'react'

import ForceWrap from '@src/lib/ForceWrap'
import ListHeaderTopBar from '@src/lib/ListHeaderTopBar'
import convertFilesToGroup, {
  DirSpec,
  FileSpec,
} from '@src/torrents/convertFilesToGroup'

interface Props {
  torrent: TransmissionTorrent
}

function TorrentFileList(props: Props) {
  const groups = convertFilesToGroup(props.torrent.files)

  return (
    <List>
      <ListHeaderTopBar>{props.torrent.name}</ListHeaderTopBar>
      <TreeView
        defaultCollapseIcon={<FolderOpen color="disabled" />}
        defaultExpandIcon={<Folder color="disabled" />}
      >
        {renderItem(groups)}
      </TreeView>
    </List>
  )
}

function renderItem(item: DirSpec | FileSpec) {
  if (item.type === 'file') {
    return (
      <TreeItem
        nodeId={item.name}
        label={
          <Box display="flex" alignItems="center">
            <ForceWrap>{item.name}</ForceWrap>
            <Box flexGrow="1" />
          </Box>
        }
        icon={getIconForFile(item.name)}
      />
    )
  }

  if (item.type === 'directory') {
    return (
      <TreeItem
        nodeId={item.name}
        label={<ForceWrap>{item.name}</ForceWrap>}
        sx={(theme) => ({
          [`& .${treeItemClasses.group}`]: {
            borderLeft: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
          },
          [`& .${treeItemClasses.group}:has(.Mui-focused)`]: {
            borderLeft: `1px solid ${alpha(theme.palette.text.secondary, 0.4)}`,
          },
        })}
      >
        {item.children.map((x) => (
          <Fragment key={x.name}>{renderItem(x)}</Fragment>
        ))}
      </TreeItem>
    )
  }
}

function getIconForFile(path: string) {
  path = path.toLowerCase()

  if (path.match(/\.(mkv|mp4|divx|xvid)$/)) {
    return <Videocam color="disabled" />
  }
  if (path.match(/\.(jpe?g|png|tiff?)$/)) {
    return <Photo color="disabled" />
  }
  if (path.match(/\.(wav|mp3|ogg)$/)) {
    return <Audiotrack color="disabled" />
  }
  if (path.match(/\.(txt|docx|md|nfo)$/)) {
    return <Article color="disabled" />
  }
  if (path.match(/\.(exe|sh|bash|command|shell|bat)$/)) {
    return <Terminal color="disabled" />
  }
  if (path.match(/\.(iso|bin|cue|img)$/)) {
    return <Album color="disabled" />
  }
  if (path.match(/\.(srt)$/)) {
    return <ClosedCaption color="disabled" />
  }

  return <InsertDriveFile color="disabled" />
}

export default TorrentFileList
