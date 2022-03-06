import { useTheme } from '@mui/material/styles'
import { createMakeAndWithStyles } from 'tss-react'

const { makeStyles: tssMakeStyles, withStyles: tssWithStyles } =
  createMakeAndWithStyles({
    useTheme,
  })

export const appWithStyles = tssWithStyles
export const appMakeStyles = tssMakeStyles
