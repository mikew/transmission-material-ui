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
