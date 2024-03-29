import { Box } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

interface Props {
  tracker: TransmissionTrackerStat
}

function TrackerListItem(props: Props) {
  const secondary = (
    <>
      <Box
        sx={{
          float: 'left',
          width: 'calc(100% - 120px)',
        }}
      >
        Announce: {props.tracker.lastAnnounceResult}
        <br />
        Scrape: {props.tracker.lastScrapeResult}
        <br />
      </Box>
      <Box
        sx={{
          float: 'right',
          textAlign: 'right',
        }}
      >
        <Typography variant="caption">
          Seeds:{' '}
          <AlignedNumber>
            {props.tracker.seederCount.toLocaleString()}
          </AlignedNumber>
          <br />
          Downloads:{' '}
          <AlignedNumber>
            {props.tracker.downloadCount.toLocaleString()}
          </AlignedNumber>
          <br />
          Leechers:{' '}
          <AlignedNumber>
            {props.tracker.leecherCount.toLocaleString()}
          </AlignedNumber>
          <br />
        </Typography>
      </Box>
    </>
  )

  return (
    <ListItem divider={true}>
      <ListItemText primary={props.tracker.host} secondary={secondary} />
    </ListItem>
  )
}

export default memo(TrackerListItem)

const AlignedNumber: React.FC<
  React.PropsWithChildren<JSX.IntrinsicElements['span']>
> = (props) => (
  <span
    style={{ width: 45, display: 'inline-block', textAlign: 'left' }}
    {...props}
  />
)
