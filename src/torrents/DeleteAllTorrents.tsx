import { Icon, IconButton, Omit } from '@material-ui/core'
import { IconButtonProps } from '@material-ui/core/IconButton'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'> &
  ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>

// tslint:disable-next-line:function-name
function DeleteAllTorrents(props: Props) {
  const { checkedIds, onClick, ...rest } = props

  if (checkedIds.length === 0) {
    return null
  }

  return (
    <IconButton {...rest} onClick={onClick}>
      <Icon>delete</Icon>
    </IconButton>
  )
}

const mapState = (state: RootState) => ({
  checkedIds: selectors.getCheckedIds(state),
})

const mapDispatch = (dispatch: AppDispatch) => ({
  onClick: () => dispatch(actions.toggleDeleteDialog()),
})

export default connect(
  mapState,
  mapDispatch,
)(DeleteAllTorrents)
