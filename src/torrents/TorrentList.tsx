import List from '@material-ui/core/List'
import { TorrentStatus } from '@src/api'
import { AppDispatch, RootState } from '@src/redux/types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
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
])

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

function TorrentList(props: Props) {
  useEffect(() => {
    props.addFields()

    return () => {
      props.removeFields()
    }
  }, [])

  const isChecked = (id: number | string) =>
    props.checkedTorrents.indexOf(Number(id)) > -1

  return (
    <List dense={true}>
      {props.torrents.map((x) => {
        const rightIcon =
          x.status === TorrentStatus.STOPPED ? 'play_arrow' : 'stop'

        return (
          <TorrentListItem
            key={x.id}
            torrent={x}
            onClick={props.handleClick}
            onCheckboxChange={props.handleCheckboxClick}
            rightIcon={rightIcon}
            onRightIconClick={props.handleRightIconClick}
            checked={isChecked(x.id)}
          />
        )
      })}
    </List>
  )
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAllFiltered(state),
  checkedTorrents: selectors.getCheckedIds(state),
  fields: state.torrents.fields,
})

const mapDispatch = (dispatch: AppDispatch) => ({
  handleClick: (event: React.MouseEvent, torrent: TransmissionTorrent) => {
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
  },

  handleCheckboxClick: (
    event: React.ChangeEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    dispatch(
      actions.toggleTorrentChecked({
        action: 'toggle',
        ids: [torrent.id],
      }),
    )
  },

  handleRightIconClick: (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    if (torrent.status === TorrentStatus.STOPPED) {
      dispatch(actions.startTorrent([torrent.id]))
    } else {
      dispatch(actions.stopTorrent([torrent.id]))
    }
  },

  startWatching: () => dispatch(actions.startWatching()),
  stopWatching: () => dispatch(actions.stopWatching()),

  addFields: () => dispatch(actions.addFields(fields)),
  removeFields: () => dispatch(actions.removeFields(fields)),
})

export default connect(
  mapState,
  mapDispatch,
)(TorrentList)
