import ListSubheader from '@mui/material/ListSubheader'
import { styled } from '@mui/material/styles'
import { memo } from 'react'

const ListHeaderTopBar = styled(ListSubheader)(({ theme }) => ({
  top: 48,
  wordBreak: 'break-all',
  // ListSubheader's lineHeight is 48px, since we force ListHeaderTopBar to
  // wrap, that ends up looking ridiculous.
  lineHeight: theme.typography.overline.lineHeight,
  // backgroundColor: theme.palette.background.paper,
}))

export default memo(ListHeaderTopBar)
