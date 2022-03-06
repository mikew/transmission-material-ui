import Checkbox from '@mui/material/Checkbox/Checkbox'
import Icon from '@mui/material/Icon/Icon'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { memo } from 'react'

import { TorrentStatus } from '@src/api'

interface Props {
  torrent: TransmissionTorrent
  checked: boolean
  rightIcon?: string
  onRightIconClick?: (
    event: React.MouseEvent,
    torrent: TransmissionTorrent,
  ) => void
  rightIconProps?: IconButtonProps
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
  progress: number
  message: React.ReactNode
  progressColor: NonNullable<LinearProgressProps['color']>
}

function TorrentListItem(props: Props) {
  const status = getStatus(props.torrent)
  const progress = status ? (
    <LinearProgress
      variant="determinate"
      color={status.progressColor}
      value={Math.min(status.progress, 100)}
    />
  ) : null

  const handleClick = (event: React.MouseEvent) => {
    props.onClick(event, props.torrent)
  }

  const handleCheckboxClick = (event: React.MouseEvent) => {
    props.onCheckboxChange(event, props.torrent)
  }

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (!props.onDoubleClick) {
      return
    }

    props.onDoubleClick(event, props.torrent)
  }

  const handleRightIconClick = (event: React.MouseEvent) => {
    if (!props.onRightIconClick) {
      return
    }

    props.onRightIconClick(event, props.torrent)
  }

  const rightIcon = props.rightIcon ? (
    <IconButton
      {...props.rightIconProps}
      onClickCapture={handleRightIconClick}
      size="large"
    >
      <Icon>{props.rightIcon}</Icon>
    </IconButton>
  ) : undefined

  return (
    <ListItem
      button={true}
      disableRipple
      divider={true}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <Checkbox onClickCapture={handleCheckboxClick} checked={props.checked} />

      <ListItemText
        primary={props.torrent.name}
        primaryTypographyProps={{ style: { wordBreak: 'break-all' } }}
        secondary={
          <>
            {progress}
            {status ? status.message : undefined}
          </>
        }
        secondaryTypographyProps={
          {
            component: 'div',
            // https://github.com/mui-org/material-ui/issues/19036
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
      />

      {rightIcon}
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
        progressColor: 'secondary',
        message: (
          <>
            <Icon fontSize="small" style={{ verticalAlign: 'middle' }}>
              group
            </Icon>{' '}
            {torrent.peersSendingToUs} / {torrent.peersConnected}
            {' | '}
            <Icon fontSize="small" style={{ verticalAlign: 'middle' }}>
              timer
            </Icon>{' '}
            {eta}
          </>
        ),
        // message: `Downloading from ${torrent.peersSendingToUs} of ${
        //   torrent.peersConnected
        // } peers`,
      }
    }

    case TorrentStatus.SEED:
      return {
        progress: (torrent.uploadRatio / torrent.seedRatioLimit) * 100,
        progressColor: 'primary',
        message: (
          <>
            <Icon fontSize="small" style={{ verticalAlign: 'middle' }}>
              group
            </Icon>{' '}
            {torrent.peersGettingFromUs} / {torrent.peersConnected}
          </>
        ),
        // message: `Seeding to ${torrent.peersGettingFromUs} of ${
        //   torrent.peersConnected
        // } peers`,
      }
    case TorrentStatus.STOPPED:
      if (torrent.error) {
        return {
          message: torrent.errorString,
          progress: 0,
          progressColor: 'primary',
        }
      }

      return {
        message: 'Stopped',
        progress: 0,
        progressColor: 'primary',
      }
  }

  return null
}

export default memo(TorrentListItem)
