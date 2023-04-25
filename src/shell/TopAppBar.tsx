import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Box, Divider, Stack } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import formatBytes from '@src/lib/formatBytes'
import { useRootSelectorShallowEqual } from '@src/redux/helpers'
import CheckAllTorrents from '@src/torrents/CheckAllTorrents'
import DeleteAllTorrents from '@src/torrents/DeleteAllTorrents'
import * as selectors from '@src/torrents/selectors'
import StartAllTorrents from '@src/torrents/StartAllTorrents'

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
          <Stack direction="row" spacing={0.5} alignItems="center">
            <span>{formatBytes(mappedState.rateDownload)}/s</span>
            <ArrowDownward fontSize="inherit" />

            <Box alignSelf="stretch" height="auto" display="flex">
              <Divider orientation="vertical" flexItem sx={{ marginX: 0.5 }} />
            </Box>

            <ArrowUpward fontSize="inherit" />
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

export default TopAppBar
