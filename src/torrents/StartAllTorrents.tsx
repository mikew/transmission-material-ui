import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import { TorrentStatus } from '@src/api'
import apiInstance from '@src/api/apiInstance'
import { AppDispatchProps, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'> &
  ReturnType<typeof mapState> &
  AppDispatchProps

class StartAllTorrents extends React.PureComponent<Props> {
  render() {
    const { torrents, contextIds, dispatch, ...rest } = this.props

    return (
      <IconButton {...rest} onClick={this.handleClick}>
        <Icon>{this.areAllStopped ? 'play_arrow' : 'stop'}</Icon>
      </IconButton>
    )
  }

  handleClick = async () => {
    const args = {
      ids: this.props.contextIds,
    }

    const action: keyof TransmissionRPC = this.areAllStopped
      ? 'torrent-start-now'
      : 'torrent-stop'

    await apiInstance.callServer(action, args)
    await this.props.dispatch(actions.get())
  }

  get areAllStopped() {
    return this.props.contextIds.every(
      (x) => this.props.torrents[x].status === TorrentStatus.STOPPED,
    )
  }
}

const mapState = (state: RootState) => ({
  torrents: selectors.getAll(state),
  contextIds: selectors.getSelectedOrAllIds(state),
})

export default connect(mapState)(StartAllTorrents)
