import Icon from '@mui/material/Icon/Icon'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { DistributiveOmit } from '@mui/types'
import { memo } from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'

import actions from './actions'
import * as selectors from './selectors'

type Props = DistributiveOmit<IconButtonProps, 'onClick'>

function DeleteAllTorrents(props: Props) {
  const dispatch = useDispatch()
  const checkedIds = useSelector(selectors.getCheckedIds)
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
