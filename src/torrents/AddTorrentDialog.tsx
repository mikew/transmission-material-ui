import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { memo, useCallback, useEffect, useState } from 'react'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'
import GroupSelect from '@src/settings/GroupSelect'

import actions from './actions'

function AddTorrentDialog() {
  const dispatch = useRootDispatch()
  const isAddDialogVisible = useRootSelector(
    (state) => state.torrents.isAddDialogVisible,
  )
  const params = new URLSearchParams(
    typeof window === 'undefined' ? undefined : window.location.search,
  )
  const magnetUrlFromParams = params.get('magnetUrl')
  const [magnetUrl, setMagnetUrl] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<
    TorrentGroupDefinition | undefined
  >()

  const handleBackdropClick = useCallback(() => {
    dispatch(actions.toggleAddDialog())
  }, [dispatch])

  const handleAddClick = useCallback(() => {
    if (magnetUrl) {
      dispatch(
        actions.addTorrent({
          mode: 'magnet',
          data: magnetUrl,
          location: selectedLocation ? selectedLocation.location : undefined,
        }),
      )
    }

    handleBackdropClick()
  }, [dispatch, handleBackdropClick, magnetUrl, selectedLocation])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      handleAddClick()
    },
    [handleAddClick],
  )

  useEffect(() => {
    if (!isAddDialogVisible) {
      setMagnetUrl('')
      setSelectedLocation(undefined)
    }
  }, [isAddDialogVisible])

  useEffect(() => {
    if (magnetUrlFromParams) {
      setMagnetUrl(magnetUrlFromParams)
      dispatch(actions.showAddDialog())
    }
  }, [dispatch, magnetUrlFromParams])

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.registerProtocolHandler) {
      const currentUrl = new URL(window.location.toString())
      // Remove any query params.
      currentUrl.search = ''
      navigator.registerProtocolHandler('magnet', `${currentUrl}?magnetUrl=%s`)
    }
  }, [])

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={isAddDialogVisible}
      onClose={handleBackdropClick}
    >
      <DialogTitle>Add Torrent</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            value={magnetUrl}
            fullWidth
            label="Magnet"
            onChange={(event) => {
              setMagnetUrl(event.target.value)
            }}
          />
          <GroupSelect
            value={selectedLocation}
            onChange={(group) => setSelectedLocation(group)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(AddTorrentDialog)
