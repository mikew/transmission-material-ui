import Drawer from '@mui/material/Drawer/Drawer'
import Icon from '@mui/material/Icon/Icon'
import Tab from '@mui/material/Tab/Tab'
import Tabs from '@mui/material/Tabs/Tabs'
import makeStyles from '@mui/styles/makeStyles'
import { memo } from 'react'

import { RootState } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'
import FloatingBarSpacer from '@src/util/FloatingBarSpacer'

import actions from './actions'
import InspectorTabFiles from './InspectorTabFiles'
import InspectorTabInfo from './InspectorTabInfo'
import InspectorTabPeers from './InspectorTabPeers'
import InspectorTabs from './InspectorTabs'
import InspectorTabTrackers from './InspectorTabTrackers'

function Inspector() {
  const dispatch = useDispatch()
  const setTab = (_event: unknown, value: InspectorTabs) =>
    dispatch(actions.setTab(value))
  const mappedState = useShallowEqualSelector(mapState)
  const classes = useStyles()

  return (
    <Drawer
      open={mappedState.isInspectorOpen}
      variant="persistent"
      anchor="right"
      PaperProps={{
        // Seems to be an issue with variant="persistent" and
        // PaperProps.className
        // className: props.classes.paper,
        classes: {
          root: classes.paper,
        },
      }}
    >
      <FloatingBarSpacer />
      <Tabs value={mappedState.currentTab} onChange={setTab} centered={true}>
        <Tab
          value={InspectorTabs.info}
          // label="Info"
          icon={<Icon color="action">info</Icon>}
          className={classes.tab}
        />
        <Tab
          value={InspectorTabs.files}
          // label="Files"
          icon={<Icon color="action">folder</Icon>}
          className={classes.tab}
        />
        <Tab
          value={InspectorTabs.trackers}
          // label="Trackers"
          icon={<Icon color="action">rss_feed</Icon>}
          className={classes.tab}
        />
        <Tab
          value={InspectorTabs.peers}
          // label="Peers"
          icon={<Icon color="action">group</Icon>}
          className={classes.tab}
        />
      </Tabs>
      {mappedState.isInspectorOpen
        ? renderCurrentTab({
            currentTab: mappedState.currentTab,
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
    case InspectorTabs.files:
      return <InspectorTabFiles />
    case InspectorTabs.info:
      return <InspectorTabInfo />
  }

  return null
}

const mapState = (state: RootState) => ({
  currentTab: state.inspector.currentTab,
  isInspectorOpen: state.inspector.isInspectorOpen,
})

const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 48,
  },
  paper: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    width: 400,
  },
}))

export default memo(Inspector)
