import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import { Omit } from '@material-ui/types'
import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import React from 'react'

import * as actions from './actions'
import * as selectors from './selectors'

type Props = Omit<IconButtonProps, 'onClick'>

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
    <IconButton {...props} onClick={action}>
      <Icon>{icon}</Icon>
    </IconButton>
  )
}

export default React.memo(CheckAllTorrents)
