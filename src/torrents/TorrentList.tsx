import PlayArrow from '@mui/icons-material/PlayArrow'
import Stop from '@mui/icons-material/Stop'
import { IconButton, ListItem, ListItemText, Skeleton } from '@mui/material'
import List from '@mui/material/List'
import { memo, useEffect, useState } from 'react'

import { TorrentStatus } from '@src/api'
import inspectorActions from '@src/inspector/actions'
import ListHeaderTopBar from '@src/lib/ListHeaderTopBar'
import {
  useRootDispatch,
  useRootSelectorShallowEqual,
} from '@src/redux/helpers'
import * as settingsSelectors from '@src/settings/selectors'

import actions from './actions'
import * as selectors from './selectors'
import TorrentListItem from './TorrentListItem'

export const fields = new Set<keyof TransmissionTorrent>([
  'id',
  'error',
  'errorString',

  'name',

  'peersConnected',
  'peersGettingFromUs',
  'peersSendingToUs',
  'status',

  'percentDone',
  'uploadRatio',
  'seedRatioLimit',
  'recheckProgress',

  'startDate',
  'addedDate',

  'rateDownload',
  'rateUpload',

  'eta',

  'downloadDir',
])

const NO_GROUP = '__NO_GROUP'

function TorrentList() {
  const dispatch = useRootDispatch()
  const handleClick = (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => {
    const target = event.target as HTMLInputElement

    if (target.tagName === 'INPUT') {
      return
    }

    dispatch(
      actions.toggleTorrentChecked({
        action: 'exclusive',
        ids: [torrent.id],
      }),
    )
  }

  const handleDoubleClick = () => {
    dispatch(inspectorActions.toggleInspector())
  }

  const handleCheckboxClick = (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    dispatch(
      actions.toggleTorrentChecked({
        action: 'toggle',
        ids: [torrent.id],
      }),
    )
  }

  const handleRightIconClick = (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    if (torrent.status === TorrentStatus.STOPPED) {
      dispatch(actions.startTorrent([torrent.id]))
    } else {
      dispatch(actions.stopTorrent([torrent.id]))
    }
  }

  const mappedState = useRootSelectorShallowEqual(mapState)

  useEffect(() => {
    dispatch(actions.startWatching())

    return () => {
      dispatch(actions.stopWatching())
    }
  }, [dispatch])

  const isChecked = (id: number | string) =>
    mappedState.checkedTorrents.indexOf(Number(id)) > -1

  const groups: Record<string, TransmissionTorrent[]> = {
    [NO_GROUP]: [],
  }
  const groupLookup: TorrentGroupDefinition[] = []
  Object.keys(mappedState.groups).forEach((groupName) => {
    groups[groupName] = []
    mappedState.groups[groupName].forEach((location) => {
      groupLookup.push({ groupName, location })
    })
  })

  mappedState.torrents.forEach((torrent) => {
    const group = groupLookup.find((x) =>
      torrent.downloadDir.startsWith(x.location),
    ) || { groupName: NO_GROUP }
    groups[group.groupName].push(torrent)
  })

  const [isInitialLoad, setIsInitialLoad] = useState(true)
  useEffect(() => {
    if (isInitialLoad && !mappedState.isLoading) {
      setIsInitialLoad(false)
    }
  }, [isInitialLoad, mappedState.isLoading])

  return isInitialLoad ? (
    <List dense disablePadding>
      <ListHeaderTopBar>...</ListHeaderTopBar>
      <ListItem divider dense>
        <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
      </ListItem>
      <ListItem divider dense>
        <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
      </ListItem>
      <ListItem divider dense>
        <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
      </ListItem>
    </List>
  ) : (
    <>
      {Object.keys(groups).map((groupName) => {
        if (groups[groupName].length === 0) {
          return null
        }

        return (
          <List dense disablePadding key={groupName}>
            <ListHeaderTopBar>{groupName}</ListHeaderTopBar>
            {groups[groupName].map((torrent) => {
              const secondaryAction =
                torrent.status === TorrentStatus.STOPPED ? (
                  <IconButton
                    edge="end"
                    onClick={(event) => handleRightIconClick(event, torrent)}
                  >
                    <PlayArrow />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    onClick={(event) => handleRightIconClick(event, torrent)}
                  >
                    <Stop />
                  </IconButton>
                )

              return (
                <TorrentListItem
                  key={torrent.id}
                  torrent={torrent}
                  onClick={handleClick}
                  onDoubleClick={handleDoubleClick}
                  onCheckboxChange={handleCheckboxClick}
                  secondaryAction={secondaryAction}
                  checked={isChecked(torrent.id)}
                />
              )
            })}
          </List>
        )
      })}
    </>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAllFiltered(state),
  checkedTorrents: selectors.getCheckedIds(state),
  groups: settingsSelectors.getGroups(state),
  isLoading: state.torrents.isLoading,
})

export default memo(TorrentList)
