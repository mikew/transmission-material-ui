import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import * as actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'
import React, { useEffect } from 'react'

import GroupSelect from '../settings/GroupSelect'

const fields = new Set<keyof TransmissionTorrent>([])

function InspectorTabInfo() {
  const checkedTorrents = useSelector(selectors.getCheckedTorrents)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.addFields(fields))

    return () => {
      dispatch(actions.removeFields(fields))
    }
  }, [dispatch])

  return (
    <React.Fragment>
      {checkedTorrents.length > 0 ? (
        <GroupSelect
          onChange={(group) => {
            dispatch(
              actions.torrentSetLocation({
                ids: checkedTorrents.map((x) => x.id),
                location: group.location,
              }),
            )
          }}
        />
      ) : (
        undefined
      )}
      {/* {props.checkedTorrents.map((x) => (
      ))} */}
    </React.Fragment>
  )
}

export default React.memo(InspectorTabInfo)
