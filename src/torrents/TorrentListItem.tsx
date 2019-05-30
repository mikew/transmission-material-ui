import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Icon from '@material-ui/core/Icon/Icon'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography/Typography'
import { TorrentStatus } from '@src/api'
import React from 'react'

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
  onCheckboxChange: (
    event: React.ChangeEvent,
    torrent: TransmissionTorrent,
  ) => void
}

interface StatusResult {
  progress: number
  message: string
  // progressColor: string
  progressColor: NonNullable<LinearProgressProps['color']>
}

// tslint:disable-next-line:function-name
function TorrentListItem(props: Props) {
  const status = getStatus(props.torrent)
  const progress = status ? (
    <LinearProgress
      variant="determinate"
      color={status.progressColor}
      value={status.progress}
    />
  ) : null

  const handleClick = (event: React.MouseEvent) => {
    props.onClick(event, props.torrent)
  }

  // const handleCheckboxClick = (event: React.ChangeEvent) => {
  const handleCheckboxClick = (event: any) => {
    props.onCheckboxChange(event, props.torrent)
  }

  const handleRightIconClick = (event: React.MouseEvent) => {
    if (!props.onRightIconClick) {
      return
    }

    props.onRightIconClick(event, props.torrent)
  }

  const rightIcon = props.rightIcon ? (
    <IconButton {...props.rightIconProps} onClickCapture={handleRightIconClick}>
      <Icon>{props.rightIcon}</Icon>
    </IconButton>
  ) : (
    undefined
  )

  return (
    <ListItem button={true} divider={true} onClick={handleClick}>
      <Checkbox onClickCapture={handleCheckboxClick} checked={props.checked} />

      <ListItemText
        primary={props.torrent.name}
        primaryTypographyProps={{ style: { wordBreak: 'break-all' } }}
        secondary={
          <React.Fragment>
            {progress}
            <Typography color="textSecondary">
              {status ? status.message : undefined}
            </Typography>
          </React.Fragment>
        }
        secondaryTypographyProps={{ component: 'div' }}
      />

      {rightIcon}
    </ListItem>
  )
}

const getStatus = (torrent: TransmissionTorrent): StatusResult | null => {
  switch (torrent.status) {
    case TorrentStatus.DOWNLOAD:
      return {
        progress: torrent.percentDone * 100,
        progressColor: 'secondary',
        message: `Downloading from ${torrent.peersSendingToUs} of ${
          torrent.peersConnected
        } peers`,
      }

    case TorrentStatus.SEED:
      return {
        progress: torrent.uploadRatio * 100,
        progressColor: 'primary',
        message: `Seeding to ${torrent.peersGettingFromUs} of ${
          torrent.peersConnected
        } peers`,
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

export default React.memo(TorrentListItem)
