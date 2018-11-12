import List from '@material-ui/core/List'
import { TorrentStatus } from '@src/api'
import apiInstance from '@src/api/apiInstance'
import { RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'
import TorrentListItem from './TorrentListItem'

class TorrentList extends React.PureComponent<
  ReturnType<typeof mapState> & typeof actions
> {
  timer?: number

  componentDidMount() {
    this.update()
    this.startWatching()
  }

  render() {
    return (
      <List>
        {Object.keys(this.props.torrents).map((x) => {
          const rightIcon =
            this.props.torrents[x].status === TorrentStatus.STOPPED
              ? 'play_arrow'
              : 'stop'

          return (
            <TorrentListItem
              key={x}
              torrent={this.props.torrents[x]}
              onClick={this.handleClick}
              onCheckboxChange={this.handleCheckboxClick}
              rightIcon={rightIcon}
              onRightIconClick={this.handleRightIconClick}
              checked={this.isChecked(x)}
            />
          )
        })}
      </List>
    )
  }

  isChecked = (id: number | string) =>
    this.props.checkedTorrents.indexOf(Number(id)) > -1

  update = () => {
    this.props.get()
  }

  startWatching = () => {
    if (this.timer) {
      return
    }

    this.timer = window.setInterval(this.update, 10000)
  }

  stopWatching = () => {
    if (!this.timer) {
      return
    }

    window.clearInterval(this.timer)
    this.timer = undefined
  }

  handleClick = (event: React.MouseEvent, torrent: TransmissionTorrent) => {
    const target = event.target as HTMLInputElement

    if (target.tagName === 'INPUT') {
      return
    }

    this.props.toggleTorrentChecked({
      action: 'exclusive',
      ids: [torrent.id],
    })
  }

  handleCheckboxClick = (
    event: React.ChangeEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    this.props.toggleTorrentChecked({
      action: 'toggle',
      ids: [torrent.id],
    })
  }

  handleRightIconClick = (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => {
    event.stopPropagation()
    if (torrent.status === TorrentStatus.STOPPED) {
      apiInstance.callServer('torrent-start-now', { ids: [torrent.id] })
    } else {
      apiInstance.callServer('torrent-stop', { ids: [torrent.id] })
    }
  }
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAll(state),
  checkedTorrents: selectors.getCheckedIds(state),
})

export default connect(
  mapState,
  actions,
)(TorrentList)
