import ListSubheader from '@mui/material/ListSubheader'
import { styled } from '@mui/material/styles'
import { memo } from 'react'

const DENSE_TOOLBAR_HEIGHT = 48

const ListHeaderTopBar = styled(ListSubheader)(({ theme }) => ({
  // -1 because there's some instances where there's a gap.
  top: DENSE_TOOLBAR_HEIGHT - 1,
  wordBreak: 'break-all',
  // ListSubheader's lineHeight is 48px, since we force ListHeaderTopBar to
  // wrap, that ends up looking ridiculous.
  lineHeight: theme.typography.caption.lineHeight,
  // backgroundColor: theme.palette.background.paper,
}))

export default memo(ListHeaderTopBar)
