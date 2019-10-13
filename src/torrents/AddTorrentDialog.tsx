import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import TextField from '@material-ui/core/TextField/TextField'
import useDispatch from '@src/redux/useDispatch'
import useSelector from '@src/redux/useSelector'
import GroupSelect from '@src/settings/GroupSelect'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import * as actions from './actions'

function AddTorrentDialog() {
  const dispatch = useDispatch()
  const isAddDialogVisible = useSelector(
    (state) => state.torrents.isAddDialogVisible,
  )
  const inputRef = useRef<HTMLInputElement>()
  const [magnetUrl, setMagnetUrl] = useState('')
  const [current, updateCurrent] = useState<
    TorrentGroupDefinition | undefined
  >()

  const handleBackdropClick = useCallback(() => {
    dispatch(actions.toggleAddDialog())
  }, [])

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
  }, [magnetUrl, current])

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

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      onEntered={() => {
        // console.log(inputRef)
        setTimeout(() => {
          inputRef.current!.focus()
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
            fullWidth={true}
            label="Magnet"
            onChange={(event) => {
              setMagnetUrl(event.target.value)
            }}
          />
          {/* <TextField fullWidth={true} type="file" /> */}
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
