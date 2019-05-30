import {
  createStyles,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import React from 'react'

interface Props {
  tracker: TransmissionTrackerStat
}

// tslint:disable-next-line:function-name
function TrackerListItem(props: Props & WithStyles<typeof styles>) {
  const { tracker: x } = props

  const secondary = (
    <React.Fragment>
      <div className={props.classes.left}>
        Announce: {x.lastAnnounceResult}
        <br />
        Scrape: {x.lastScrapeResult}
        <br />
      </div>
      <Typography variant="caption" className={props.classes.right}>
        Seeds: <AlignedNumber>{x.seederCount.toLocaleString()}</AlignedNumber>
        <br />
        Downloads:{' '}
        <AlignedNumber>{x.downloadCount.toLocaleString()}</AlignedNumber>
        <br />
        Leechers:{' '}
        <AlignedNumber>{x.leecherCount.toLocaleString()}</AlignedNumber>
        <br />
      </Typography>
    </React.Fragment>
  )

  return (
    <ListItem>
      <ListItemText
        primary={x.host}
        secondary={secondary}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}

const styles = createStyles({
  left: {
    float: 'left',
    width: 'calc(100% - 120px)',
  },
  right: {
    float: 'right',
    textAlign: 'right',
  },
})

export default React.memo(withStyles(styles)(TrackerListItem))

// tslint:disable-next-line:variable-name
const AlignedNumber: React.SFC = (props) => (
  <span
    style={{ width: 45, display: 'inline-block', textAlign: 'left' }}
    {...props}
  />
)
