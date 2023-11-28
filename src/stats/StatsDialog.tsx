import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material'

import formatBytes from '@src/lib/formatBytes'
import formatTime from '@src/lib/formatTime'
import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'

const StatsDialog: React.FC = (props) => {
  const isOpen = useRootSelector((state) => state.stats.isDialogOpen)
  console.log(isOpen)
  const dispatch = useRootDispatch()
  const stats = useRootSelector((state) => state.stats.stats)

  const handleClose = () => {
    dispatch(actions.hideDialog())
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        handleClose()
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Stats</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Session</Typography>
        <DialogContentText>
          Downloaded: {formatBytes(stats?.['current-stats'].downloadedBytes)}
          <br />
          Uploaded: {formatBytes(stats?.['current-stats'].uploadedBytes)}
          <br />
          Time Active: {formatTime(stats?.['current-stats'].secondsActive || 0)}
        </DialogContentText>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6">All Time</Typography>
        <DialogContentText>
          Downloaded: {formatBytes(stats?.['cumulative-stats'].downloadedBytes)}
          <br />
          Uploaded: {formatBytes(stats?.['cumulative-stats'].uploadedBytes)}
          <br />
          Time Active:{' '}
          {formatTime(stats?.['cumulative-stats'].secondsActive || 0)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatsDialog
