import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import { DistributiveOmit } from '@mui/types'
import { memo } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'
import * as selectors from './selectors'

type Props = DistributiveOmit<IconButtonProps, 'onClick'>

function CheckAllTorrents(props: Props) {
  const dispatch = useRootDispatch()
  const checkIds = useRootSelector(selectors.getCheckedIds)
  const checkAll = () =>
    dispatch(actions.toggleTorrentChecked({ action: 'checkAll', ids: [] }))
  const unCheckAll = () =>
    dispatch(actions.toggleTorrentChecked({ action: 'unCheckAll', ids: [] }))

  // We want to use the same color as the rest of the icons in TopAppBar, so use
  // the icon instead of the form component.
  let icon = <CheckBoxOutlineBlank />
  let action = checkAll

  if (checkIds.length) {
    icon = <CheckBox />
    action = unCheckAll
  }

  return (
    <IconButton {...props} onClick={action}>
      {icon}
    </IconButton>
  )
}

export default memo(CheckAllTorrents)
