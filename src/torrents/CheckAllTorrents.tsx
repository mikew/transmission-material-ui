import Icon from '@mui/material/Icon/Icon'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { DistributiveOmit } from '@mui/types'
import { memo } from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'

import actions from './actions'
import * as selectors from './selectors'

type Props = DistributiveOmit<IconButtonProps, 'onClick'>

function CheckAllTorrents(props: Props) {
  const dispatch = useDispatch()
  const checkIds = useSelector(selectors.getCheckedIds)
  const checkAll = () =>
    dispatch(actions.toggleTorrentChecked({ action: 'checkAll', ids: [] }))
  const unCheckAll = () =>
    dispatch(actions.toggleTorrentChecked({ action: 'unCheckAll', ids: [] }))

  let icon = 'check_box_outline_blank'
  let action = checkAll

  if (checkIds.length) {
    icon = 'check_box'
    action = unCheckAll
  }

  return (
    <IconButton {...props} onClick={action} size="large">
      <Icon>{icon}</Icon>
    </IconButton>
  );
}

export default memo(CheckAllTorrents)
