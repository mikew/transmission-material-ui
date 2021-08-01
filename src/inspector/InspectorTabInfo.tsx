import React, { useEffect, useMemo } from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'
import { getGroups } from '@src/settings/selectors'

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

  const groups = useSelector(getGroups)
  // TODO This could be wrapped up into `findGroupForDirectory`
  const firstGroup = useMemo(() => {
    if (checkedTorrents.length === 0) {
      return
    }

    const firstTorrent = checkedTorrents[0]
    for (const groupName in groups) {
      const found = groups[groupName].find((directory) =>
        firstTorrent.downloadDir.startsWith(directory),
      )

      if (found) {
        const definition: TorrentGroupDefinition = {
          groupName: groupName,
          location: found,
        }

        return definition
      }
    }
  }, [checkedTorrents, groups])

  return (
    <React.Fragment>
      {checkedTorrents.length > 0 ? (
        <GroupSelect
          value={firstGroup}
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
