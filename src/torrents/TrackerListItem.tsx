import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import Typography from '@material-ui/core/Typography/Typography'
import { AppStyles, appStyles } from '@src/styles'
import React from 'react'

interface Props {
  tracker: TransmissionTrackerStat
}

function TrackerListItem(props: Props & AppStyles<typeof styles>) {
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
    <ListItem divider={true}>
      <ListItemText
        primary={x.host}
        secondary={secondary}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}

const styles = appStyles({
  left: {
    float: 'left',
    width: 'calc(100% - 120px)',
  },
  right: {
    float: 'right',
    textAlign: 'right',
  },
})

export default React.memo(styles(TrackerListItem))

// tslint:disable-next-line:variable-name
const AlignedNumber: React.SFC = (props) => (
  <span
    style={{ width: 45, display: 'inline-block', textAlign: 'left' }}
    {...props}
  />
)
