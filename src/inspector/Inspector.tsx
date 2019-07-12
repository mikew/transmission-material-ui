import Drawer from '@material-ui/core/Drawer/Drawer'
import Icon from '@material-ui/core/Icon/Icon'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
import InspectorTabPeers from '@src/inspector/InspectorTabPeers'
import InspectorTabTrackers from '@src/inspector/InspectorTabTrackers'
import { AppDispatch, RootState } from '@src/redux/types'
import { AppStyles, appStyles } from '@src/styles'
import FloatingBarSpacer from '@src/util/FloatingBarSpacer'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import InspectorTabs from './InspectorTabs'

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  AppStyles<typeof styles>

function Inspector(props: Props) {
  return (
    <Drawer
      open={props.isInspectorOpen}
      variant="persistent"
      anchor="right"
      PaperProps={{
        // Seems to be an issue with variant="persistent" and
        // PaperProps.className
        // className: props.classes.paper,
        classes: {
          root: props.classes.paper,
        },
      }}
    >
      <FloatingBarSpacer />
      <Tabs
        value={props.currentTab}
        onChange={props.setTab}
        centered={true}
        // fullWidth={true}
        className={props.classes.tabs}
      >
        <Tab
          value={InspectorTabs.info}
          // label="Info"
          icon={<Icon color="action">info</Icon>}
          className={props.classes.tab}
        />
        <Tab
          value={InspectorTabs.files}
          // label="Files"
          icon={<Icon color="action">folder</Icon>}
          className={props.classes.tab}
        />
        <Tab
          value={InspectorTabs.trackers}
          // label="Trackers"
          icon={<Icon color="action">rss_feed</Icon>}
          className={props.classes.tab}
        />
        <Tab
          value={InspectorTabs.peers}
          // label="Peers"
          icon={<Icon color="action">group</Icon>}
          className={props.classes.tab}
        />
      </Tabs>
      {props.isInspectorOpen
        ? renderCurrentTab({
            currentTab: props.currentTab,
          })
        : undefined}
      <FloatingBarSpacer />
    </Drawer>
  )
}

// There is literally no difference in this function vs a Functional Component,
// except this has less overhead. :hmm:
function renderCurrentTab(props: { currentTab: InspectorTabs }) {
  switch (props.currentTab) {
    case InspectorTabs.trackers:
      return <InspectorTabTrackers />
    case InspectorTabs.peers:
      return <InspectorTabPeers />
  }

  return null
}

const mapState = (state: RootState) => ({
  currentTab: state.inspector.currentTab,
  isInspectorOpen: state.inspector.isInspectorOpen,
})

const mapDispatch = (dispatch: AppDispatch) => ({
  setTab: (_event: any, value: InspectorTabs) =>
    dispatch(actions.setTab(value)),
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

export default connect(
  mapState,
  mapDispatch,
)(styles(React.memo(Inspector)))
