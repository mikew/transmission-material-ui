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

  const wut = new Date((stats?.['current-stats'].secondsActive || 0) * 1000)
    .toISOString()
    .substr(11, 8)
  const wut2 = new Date((stats?.['cumulative-stats'].secondsActive || 0) * 1000)
    .toISOString()
    .substr(11, 8)

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

function formatTime(seconds: number | undefined = 0): string {
  const SECONDS_PER_MINUTE = 60
  const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
  const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24
  const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365.25 // Approximate value for an average year

  const years = Math.floor(seconds / SECONDS_PER_YEAR)
  seconds %= SECONDS_PER_YEAR

  const days = Math.floor(seconds / SECONDS_PER_DAY)
  seconds %= SECONDS_PER_DAY

  const hours = Math.floor(seconds / SECONDS_PER_HOUR)
  seconds %= SECONDS_PER_HOUR

  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE)
  seconds %= SECONDS_PER_MINUTE

  const parts = []
  if (years > 0) {
    parts.push(`${years}y`)
  }
  if (days > 0) {
    parts.push(`${days}d`)
  }
  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }
  if (seconds > 0) {
    parts.push(`${seconds}s`)
  }

  if (parts.length === 0) {
    return '0s'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  return parts.join(', ')
}

export default StatsDialog
