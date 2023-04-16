import { Folder, Group, Info, RssFeed } from '@mui/icons-material'
import { Toolbar } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { memo } from 'react'

import {
  useRootDispatch,
  useRootSelectorShallowEqual,
} from '@src/redux/helpers'

import actions from './actions'
import InspectorTabFiles from './InspectorTabFiles'
import InspectorTabInfo from './InspectorTabInfo'
import InspectorTabPeers from './InspectorTabPeers'
import InspectorTabs from './InspectorTabs'
import InspectorTabTrackers from './InspectorTabTrackers'

function Inspector() {
  const dispatch = useRootDispatch()
  const setTab = (_event: unknown, value: InspectorTabs) =>
    dispatch(actions.setTab(value))
  const mappedState = useRootSelectorShallowEqual(mapState)

  return (
    <Drawer
      open={mappedState.isInspectorOpen}
      variant="persistent"
      anchor="right"
      PaperProps={{
        sx: (theme) => ({
          [theme.breakpoints.only('xs')]: {
            width: '100%',
            borderWidth: 0,
          },
          zIndex: theme.zIndex.appBar - 1,
          width: 400,
          backgroundColor: theme.palette.background.default,
        }),
      }}
    >
      <Toolbar variant="dense" />
      <Tabs
        value={mappedState.currentTab}
        onChange={setTab}
        centered={true}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <StyledTab
          value={InspectorTabs.info}
          // label="Info"
          icon={<Info />}
        />
        <StyledTab
          value={InspectorTabs.files}
          // label="Files"
          icon={<Folder />}
        />
        <StyledTab
          value={InspectorTabs.trackers}
          // label="Trackers"
          icon={<RssFeed />}
        />
        <StyledTab
          value={InspectorTabs.peers}
          // label="Peers"
          icon={<Group />}
        />
      </Tabs>
      {mappedState.isInspectorOpen
        ? renderCurrentTab({
            currentTab: mappedState.currentTab,
          })
        : undefined}
      <Toolbar variant="dense" />
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

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 48,
  // TODO This was part of the mui v4 to v5 migration. Styling around tabs
  // changed and this keeps the previous style. Not sure if it's absolutely
  // necessary.
  color: theme.palette.text.disabled,
}))

export default memo(Inspector)
