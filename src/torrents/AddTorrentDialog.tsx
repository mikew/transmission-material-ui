import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import TextField from '@material-ui/core/TextField/TextField'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import GroupSelect from '@src/settings/GroupSelect'

import * as actions from './actions'

function AddTorrentDialog() {
  const dispatch = useDispatch()
  const isAddDialogVisible = useSelector(
    (state) => state.torrents.isAddDialogVisible,
  )
  const params = new URLSearchParams(window.location.search)
  const magnetUrlFromParams = params.get('magnetUrl')
  const inputRef = useRef<HTMLInputElement>()
  const [magnetUrl, setMagnetUrl] = useState('')
  const [current, updateCurrent] = useState<
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
          location: current ? current.location : undefined,
        }),
      )
    }

    handleBackdropClick()
  }, [dispatch, handleBackdropClick, magnetUrl, current])

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
      updateCurrent(undefined)
    }
  }, [isAddDialogVisible])

  useEffect(() => {
    if (magnetUrlFromParams) {
      setMagnetUrl(magnetUrlFromParams)
      dispatch(actions.showAddDialog())
    }
  }, [dispatch, magnetUrlFromParams])

  useEffect(() => {
    if (navigator.registerProtocolHandler) {
      const currentUrl = new URL(window.location.toString())
      // Remove any query params.
      currentUrl.search = ''
      navigator.registerProtocolHandler(
        'magnet',
        `${currentUrl}?magnetUrl=%s`,
        'Transmission',
      )
    }
  }, [])

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      onEntered={() => {
        // console.log(inputRef)
        setTimeout(() => {
          if (!inputRef.current) {
            return
          }

          inputRef.current.focus()
        }, 50)
      }}
      open={isAddDialogVisible}
      onClose={handleBackdropClick}
    >
      <DialogTitle>Add Torrent</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            inputRef={inputRef}
            value={magnetUrl}
            fullWidth={true}
            label="Magnet"
            onChange={(event) => {
              setMagnetUrl(event.target.value)
            }}
          />
          <GroupSelect
            value={current}
            onChange={(group) => updateCurrent(group)}
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

export default React.memo(AddTorrentDialog)
