import { RootState } from '@src/redux/types'
import * as actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'
import TrackerList from '@src/torrents/TrackerList'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

type Props = ReturnType<typeof mapState> & typeof actions

const fields = new Set<keyof TransmissionTorrent>(['trackerStats'])

function InspectorTabTrackers(props: Props) {
  useEffect(() => {
    props.addFields(fields)

    return () => {
      props.removeFields(fields)
    }
  }, [])

  return (
    <React.Fragment>
      {props.checkedTorrents.map((x) => (
        <TrackerList torrent={x} key={x.id} />
      ))}
    </React.Fragment>
  )
}

const mapState = (state: RootState) => ({
  checkedTorrents: selectors.getCheckedTorrents(state),
})

export default connect(
  mapState,
  actions,
)(React.memo(InspectorTabTrackers))
