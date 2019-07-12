import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'> &
  ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>

function CheckAllTorrents(props: Props) {
  const { checkAll, unCheckAll, checkIds, ...rest } = props
  let icon = 'check_box_outline_blank'
  let action = checkAll

  if (checkIds.length) {
    icon = 'check_box'
    action = unCheckAll
  }

  return (
    <IconButton {...rest} onClick={action}>
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
