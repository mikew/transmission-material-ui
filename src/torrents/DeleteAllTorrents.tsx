import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import React from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'

import actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'>

function DeleteAllTorrents(props: Props) {
  const dispatch = useDispatch()
  const checkedIds = useSelector(selectors.getCheckedIds)
  const handleClick = () => dispatch(actions.toggleDeleteDialog())

  if (checkedIds.length === 0) {
    return null
  }

  return (
    <IconButton {...props} onClick={handleClick}>
      <Icon>delete</Icon>
    </IconButton>
  )
}

export default React.memo(DeleteAllTorrents)
