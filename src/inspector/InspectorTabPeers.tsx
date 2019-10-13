import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import * as actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'
import React, { useEffect } from 'react'

import TorrentPeerList from './TorrentPeerList'

const fields = new Set<keyof TransmissionTorrent>(['peers'])

function InspectorTabPeers() {
  const dispatch = useDispatch()
  const checkedTorrents = useSelector(selectors.getCheckedTorrents)
  useEffect(() => {
    dispatch(actions.addFields(fields))

    return () => {
      dispatch(actions.removeFields(fields))
    }
  }, [])

  return (
    <React.Fragment>
      {checkedTorrents.map((x) => (
        <TorrentPeerList torrent={x} key={x.id} />
      ))}
    </React.Fragment>
  )
}

export default React.memo(InspectorTabPeers)
