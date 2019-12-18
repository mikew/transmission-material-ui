import React, { useEffect } from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import * as actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'

import TorrentTrackerList from './TorrentTrackerList'

const fields = new Set<keyof TransmissionTorrent>(['trackerStats'])

function InspectorTabTrackers() {
  const dispatch = useDispatch()
  const checkedTorrents = useSelector(selectors.getCheckedTorrents)

  useEffect(() => {
    dispatch(actions.addFields(fields))

    return () => {
      dispatch(actions.removeFields(fields))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      {checkedTorrents.map((x) => (
        <TorrentTrackerList torrent={x} key={x.id} />
      ))}
    </React.Fragment>
  )
}

export default React.memo(InspectorTabTrackers)
