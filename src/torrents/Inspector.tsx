import Button from '@material-ui/core/Button/Button'
import Drawer from '@material-ui/core/Drawer/Drawer'
import Icon from '@material-ui/core/Icon/Icon'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
import { RootState } from '@src/redux/types'
import { AppStyles, appStyles } from '@src/styles'
import FloatingBarSpacer from '@src/util/FloatingBarSpacer'
import React from 'react'
import { connect } from 'react-redux'

import PeerList from './PeerList'
import * as selectors from './selectors'
import TrackerList from './TrackerList'

enum InspectorTabs {
  info,
  files,
  trackers,
  peers,
}

class Inspector extends React.PureComponent<
  ReturnType<typeof mapState> & AppStyles<typeof styles>
> {
  state = {
    currentTab: InspectorTabs.files,
  }

  render() {
    return (
      <Drawer
        open={this.props.isInspectorOpen}
        variant="persistent"
        anchor="right"
        PaperProps={{
          // Seems to be an issue with variant="persistent" and
          // PaperProps.className
          // className: this.props.classes.paper,
          classes: {
            root: this.props.classes.paper,
          },
        }}
      >
        <FloatingBarSpacer />
        <Tabs
          value={this.state.currentTab}
          onChange={this.handleTabChange}
          centered={true}
          // fullWidth={true}
          className={this.props.classes.tabs}
        >
          <Tab
            value={InspectorTabs.info}
            // label="Info"
            icon={<Icon color="action">info</Icon>}
            className={this.props.classes.tab}
          />
          <Tab
            value={InspectorTabs.files}
            // label="Files"
            icon={<Icon color="action">folder</Icon>}
            className={this.props.classes.tab}
          />
          <Tab
            value={InspectorTabs.trackers}
            // label="Trackers"
            icon={<Icon color="action">rss_feed</Icon>}
            className={this.props.classes.tab}
          />
          <Tab
            value={InspectorTabs.peers}
            // label="Peers"
            icon={<Icon color="action">group</Icon>}
            className={this.props.classes.tab}
          />
        </Tabs>
        {this.renderTab()}
        <FloatingBarSpacer />
      </Drawer>
    )
  }

  renderTab() {
    if (!this.props.isInspectorOpen) {
      return null
    }

    switch (this.state.currentTab) {
      case InspectorTabs.info:
        return (
          <React.Fragment>
            <Button>Start All</Button>
            <Button>Stop All</Button>
            <Button>Delete All</Button>
            <Button>Verify</Button>
            {/* {this.props.checkedTorrents.map((x) => (
              <TrackerList torrent={x} key={x.id} />
            ))} */}
          </React.Fragment>
        )
      // case InspectorTabs.files:
      //   return JSON.stringify(this.props.torrent.files)
      case InspectorTabs.trackers:
        return (
          <React.Fragment>
            {this.props.checkedTorrents.map((x) => (
              <TrackerList torrent={x} key={x.id} />
            ))}
          </React.Fragment>
        )
      case InspectorTabs.peers:
        return (
          <React.Fragment>
            {this.props.checkedTorrents.map((x) => (
              <PeerList torrent={x} key={x.id} />
            ))}
          </React.Fragment>
        )
    }

    return null
  }

  handleTabChange = (_event: any, value: InspectorTabs) => {
    this.setState({ currentTab: value })
  }
}

const mapState = (state: RootState) => ({
  isInspectorOpen: state.torrents.isInspectorOpen,
  checkedTorrents: selectors.getCheckedTorrents(state),
})

const styles = appStyles(() => ({
  tabs: {
    minHeight: 72,
  },
  tab: {
    minWidth: 48,
  },
  paper: {
    width: 300,
  },
}))

export default connect(mapState)(styles(Inspector))
