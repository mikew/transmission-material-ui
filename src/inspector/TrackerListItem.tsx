import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography/Typography'
import React from 'react'

interface Props {
  tracker: TransmissionTrackerStat
}

function TrackerListItem(props: Props) {
  const classes = useStyles()

  const secondary = (
    <React.Fragment>
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
    </React.Fragment>
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

const useStyles = makeStyles({
  left: {
    float: 'left',
    width: 'calc(100% - 120px)',
  },
  right: {
    float: 'right',
    textAlign: 'right',
  },
})

export default React.memo(TrackerListItem)

const AlignedNumber: React.SFC = (props) => (
  <span
    style={{ width: 45, display: 'inline-block', textAlign: 'left' }}
    {...props}
  />
)
