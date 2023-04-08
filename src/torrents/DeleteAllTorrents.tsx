import Icon from '@mui/material/Icon/Icon'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { DistributiveOmit } from '@mui/types'
import { memo } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'
import * as selectors from './selectors'

type Props = DistributiveOmit<IconButtonProps, 'onClick'>

function DeleteAllTorrents(props: Props) {
  const dispatch = useRootDispatch()
  const checkedIds = useRootSelector(selectors.getCheckedIds)
  const handleClick = () => dispatch(actions.toggleDeleteDialog())

  if (checkedIds.length === 0) {
    return null
  }

  return (
    <IconButton {...props} onClick={handleClick} size="large">
      <Icon>delete</Icon>
    </IconButton>
  )
}

export default memo(DeleteAllTorrents)
