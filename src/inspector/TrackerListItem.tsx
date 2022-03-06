import ListItem from '@mui/material/ListItem/ListItem'
import ListItemText from '@mui/material/ListItemText/ListItemText'
import Typography from '@mui/material/Typography/Typography'
import { memo } from 'react'

import { appMakeStyles } from '@src/styles/helpers'

interface Props {
  tracker: TransmissionTrackerStat
}

function TrackerListItem(props: Props) {
  const { classes } = useStyles()

  const secondary = (
    <>
      <div className={classes.left}>
        Announce: {props.tracker.lastAnnounceResult}
        <br />
        Scrape: {props.tracker.lastScrapeResult}
        <br />
      </div>
      <Typography variant="caption" className={classes.right}>
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
    </>
  )

  return (
    <ListItem divider={true}>
      <ListItemText
        primary={props.tracker.host}
        secondary={secondary}
        secondaryTypographyProps={
          {
            component: 'div',
            // https://github.com/mui-org/material-ui/issues/19036
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
      />
    </ListItem>
  )
}

const useStyles = appMakeStyles()({
  left: {
    float: 'left',
    width: 'calc(100% - 120px)',
  },
  right: {
    float: 'right',
    textAlign: 'right',
  },
})

export default memo(TrackerListItem)

const AlignedNumber: React.SFC = (props) => (
  <span
    style={{ width: 45, display: 'inline-block', textAlign: 'left' }}
    {...props}
  />
)
