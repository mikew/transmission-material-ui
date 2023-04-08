import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useRootSelectorShallowEqual } from '@src/redux/helpers'
import CheckAllTorrents from '@src/torrents/CheckAllTorrents'
import DeleteAllTorrents from '@src/torrents/DeleteAllTorrents'
import StartAllTorrents from '@src/torrents/StartAllTorrents'
import * as selectors from '@src/torrents/selectors'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Box, Divider, Stack } from '@mui/material'

const TopAppBar: React.FC = () => {
  const mappedState = useRootSelectorShallowEqual(mapState)

  return (
    <AppBar>
      <Toolbar variant="dense">
        <Box>
          <CheckAllTorrents edge="start" />
          <StartAllTorrents />
          <DeleteAllTorrents />
        </Box>

        <Box flexGrow={1} />

        <Typography color="inherit" variant="body2" component="div">
          <Stack direction="row" spacing={1} alignItems="center">
            <span>{formatBytes(mappedState.rateDownload)}/s</span>
            <ArrowDownward fontSize="small" />
            <Divider orientation="vertical" flexItem />
            <ArrowUpward fontSize="small" />
            <span>{formatBytes(mappedState.rateUpload)}/s</span>
          </Stack>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mapState = (state: RootState) => ({
  rateUpload: selectors.getRateUpload(state),
  rateDownload: selectors.getRateDownload(state),
})

function formatBytes(bytes: number | string, decimals = 2) {
  if (!bytes) {
    return '0 B'
  }

  bytes = Number(bytes)
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(decimals)} ${sizes[i]}`
}

export default TopAppBar
