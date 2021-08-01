import List from '@material-ui/core/List'
import { memo, useEffect } from 'react'

import { TorrentStatus } from '@src/api'
import { RootState } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'
import * as settingsSelectors from '@src/settings/selectors'
import ListHeaderTopBar from '@src/util/ListHeaderTopBar'
import inspectorActions from '@src/inspector/actions'

import actions from './actions'
import * as selectors from './selectors'
import TorrentListItem from './TorrentListItem'

const fields = new Set<keyof TransmissionTorrent>([
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

  'startDate',
  'addedDate',

  'rateDownload',
  'rateUpload',

  'eta',

  'downloadDir',
])

const NO_GROUP = '__NO_GROUP'

function TorrentList() {
  const dispatch = useDispatch()
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

  const mappedState = useShallowEqualSelector(mapState)

  useEffect(() => {
    dispatch(actions.addFields(fields))
    dispatch(actions.startWatching())

    return () => {
      dispatch(actions.removeFields(fields))
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

  return (
    <List dense={true}>
      {Object.keys(groups).map((groupName) => {
        if (groups[groupName].length === 0) {
          return null
        }

        return (
          <div key={groupName}>
            <ListHeaderTopBar>{groupName}</ListHeaderTopBar>
            {groups[groupName].map((torrent) => {
              const rightIcon =
                torrent.status === TorrentStatus.STOPPED ? 'play_arrow' : 'stop'

              return (
                <TorrentListItem
                  key={torrent.id}
                  torrent={torrent}
                  onClick={handleClick}
                  onDoubleClick={handleDoubleClick}
                  onCheckboxChange={handleCheckboxClick}
                  rightIcon={rightIcon}
                  onRightIconClick={handleRightIconClick}
                  checked={isChecked(torrent.id)}
                />
              )
            })}
          </div>
        )
      })}
    </List>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAllFiltered(state),
  checkedTorrents: selectors.getCheckedIds(state),
  fields: state.torrents.fields,
  groups: settingsSelectors.getGroups(state),
})

export default memo(TorrentList)
