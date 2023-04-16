import { memo, useEffect } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'
import actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'

import TorrentTrackerList from './TorrentTrackerList'

const fields = new Set<keyof TransmissionTorrent>(['trackerStats'])

function InspectorTabTrackers() {
  const dispatch = useRootDispatch()
  const checkedTorrents = useRootSelector(selectors.getCheckedTorrents)

  useEffect(() => {
    dispatch(actions.addFields(fields))

    return () => {
      dispatch(actions.removeFields(fields))
    }
  }, [dispatch])

  return (
    <>
      {checkedTorrents.map((x) => (
        <TorrentTrackerList torrent={x} key={x.id} />
      ))}
    </>
  )
}

export default memo(InspectorTabTrackers)
