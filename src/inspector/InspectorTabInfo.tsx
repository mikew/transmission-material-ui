import { Button, Stack } from '@mui/material'
import { memo, useEffect, useMemo } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'
import { getGroups } from '@src/settings/selectors'
import actions from '@src/torrents/actions'
import * as selectors from '@src/torrents/selectors'

import GroupSelect from '../settings/GroupSelect'

const fields = new Set<keyof TransmissionTorrent>([])

function InspectorTabInfo() {
  const checkedTorrents = useRootSelector(selectors.getCheckedTorrents)
  const dispatch = useRootDispatch()
  useEffect(() => {
    dispatch(actions.addFields(fields))

    return () => {
      dispatch(actions.removeFields(fields))
    }
  }, [dispatch])

  const groups = useRootSelector(getGroups)
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
          groupName,
          location: found,
        }

        return definition
      }
    }
  }, [checkedTorrents, groups])

  return (
    <>
      {checkedTorrents.length > 0 ? (
        <>
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
          <Stack spacing={1} paddingX={1}>
            <Button
              color="warning"
              onClick={() => {
                dispatch(
                  actions.verifyTorrents(checkedTorrents.map((x) => x.id)),
                )
              }}
            >
              Verify Selected Torrents
            </Button>
          </Stack>
        </>
      ) : undefined}
      {/* {props.checkedTorrents.map((x) => (
      ))} */}
    </>
  )
}

export default memo(InspectorTabInfo)
