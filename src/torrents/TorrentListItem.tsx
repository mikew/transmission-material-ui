import Group from '@mui/icons-material/Group'
import Timer from '@mui/icons-material/Timer'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import ListItemText from '@mui/material/ListItemText'
import React, { memo } from 'react'

import { TorrentStatus } from '@src/api/helpers'

interface Props {
  torrent: TransmissionTorrent
  checked: boolean
  secondaryAction?: React.ReactNode
  onClick: (event: React.MouseEvent, torrent: TransmissionTorrent) => void
  onDoubleClick?: (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => void
  onCheckboxChange: (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => void
}

interface StatusResult {
  progress?: number
  message: React.ReactNode
  progressColor: NonNullable<LinearProgressProps['color']>
}

function TorrentListItem(props: Props) {
  const status = getStatus(props.torrent)
  const progress =
    status?.progress != null ? (
      <LinearProgress
        variant="determinate"
        color={status.progressColor}
        value={Math.min(status.progress, 100)}
        sx={(theme) => ({
          height: theme.spacing(1),
        })}
      />
    ) : null

  return (
    <ListItem
      button
      disableRipple
      divider
      onClick={(event) => props.onClick(event, props.torrent)}
      onDoubleClick={(event) => props.onDoubleClick?.(event, props.torrent)}
      // TODO this is supposed to be read from the list context.
      dense
    >
      <ListItemIcon>
        <Checkbox
          onClickCapture={(event) =>
            props.onCheckboxChange(event, props.torrent)
          }
          checked={props.checked}
          color="primary"
        />
      </ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Stack direction="column" spacing={0.3}>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {props.torrent.name}
            </Typography>
            {progress}
            <Typography variant="body2" color="text.secondary" component="div">
              {status?.message}
            </Typography>
          </Stack>
        }
      />

      {props.secondaryAction ? (
        <ListItemSecondaryAction>
          {props.secondaryAction}
        </ListItemSecondaryAction>
      ) : undefined}
    </ListItem>
  )
}

const getStatus = (torrent: TransmissionTorrent): StatusResult | null => {
  switch (torrent.status) {
    case TorrentStatus.DOWNLOAD: {
      const eta =
        torrent.eta <= 0
          ? 'Unknown'
          : new Date(torrent.eta * 1000).toISOString().substr(11, 8)

      return {
        progress: torrent.percentDone * 100,
        progressColor: 'info',
        message: (
          <Stack direction="row" spacing={1} alignItems="center">
            <Group fontSize="small" />
            <span>
              {torrent.peersSendingToUs} / {torrent.peersConnected}
            </span>
            <Divider flexItem orientation="vertical" />
            <Timer fontSize="small" />
            <span>{eta}</span>
          </Stack>
        ),
        // message: `Downloading from ${torrent.peersSendingToUs} of ${
        //   torrent.peersConnected
        // } peers`,
      }
    }

    case TorrentStatus.SEED:
      return {
        progress: (torrent.uploadRatio / torrent.seedRatioLimit) * 100,
        progressColor: 'success',

        message: (
          <Stack direction="row" spacing={1} alignItems="center">
            <Group fontSize="small" />

            <span>
              {torrent.peersGettingFromUs} / {torrent.peersConnected}
            </span>
          </Stack>
        ),
        // message: `Seeding to ${torrent.peersGettingFromUs} of ${
        //   torrent.peersConnected
        // } peers`,
      }
    case TorrentStatus.CHECK:
      return {
        message: 'Verifying ...',
        progressColor: 'warning',
        progress: torrent.recheckProgress,
      }
    case TorrentStatus.STOPPED:
      if (torrent.error) {
        return {
          message: torrent.errorString,
          progress: 0,
          progressColor: 'info',
        }
      }

      return {
        message: 'Stopped',
        // progress: 0,
        progressColor: 'inherit',
      }
  }

  return null
}

export default memo(TorrentListItem)
