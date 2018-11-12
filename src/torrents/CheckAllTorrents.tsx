import { Icon, IconButton } from '@material-ui/core'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

// tslint:disable-next-line:function-name
function CheckAllTorrents(
  props: ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>,
) {
  let icon = 'check_box_outline_blank'
  let action = props.checkAll

  if (props.checkIds.length) {
    icon = 'check_box'
    action = props.unCheckAll
  }

  return (
    <IconButton onClick={action}>
      <Icon>{icon}</Icon>
    </IconButton>
  )
}

const mapState = (state: RootState) => ({
  checkIds: selectors.getCheckedIds(state),
})

const mapDispatch = (dispatch: AppDispatch) => ({
  checkAll: () =>
    dispatch(actions.toggleTorrentChecked({ action: 'checkAll', ids: [] })),
  unCheckAll: () =>
    dispatch(actions.toggleTorrentChecked({ action: 'unCheckAll', ids: [] })),
})

export default connect(
  mapState,
  mapDispatch,
)(CheckAllTorrents)
