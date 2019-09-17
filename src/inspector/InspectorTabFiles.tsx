import { RootState } from '@src/redux/types'
import * as actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import TorrentFileList from './TorrentFileList'

type Props = ReturnType<typeof mapState> & typeof actions

const fields = new Set<keyof TransmissionTorrent>(['files'])

function InspectorTabFiles(props: Props) {
  useEffect(() => {
    props.addFields(fields)

    return () => {
      props.removeFields(fields)
    }
  }, [])

  return (
    <React.Fragment>
      {props.checkedTorrents.map((x) => (
        <TorrentFileList torrent={x} key={x.id} />
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
)(React.memo(InspectorTabFiles))
