import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import TextField from '@material-ui/core/TextField/TextField'
import { RootState } from '@src/redux/types'
import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

function AddTorrentDialog(props: ReturnType<typeof mapState> & typeof actions) {
  const [magnetUrl, setMagnetUrl] = useState('')

  const handleBackdropClick = useCallback(() => {
    setMagnetUrl('')
    props.toggleAddDialog()
  }, [])

  const handleAddClick = useCallback(() => {
    if (magnetUrl) {
      props.addTorrent({ mode: 'magnet', data: magnetUrl })
    }

    handleBackdropClick()
  }, [magnetUrl])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      handleAddClick()
    },
    [handleAddClick],
  )

  return (
    <Dialog
      open={props.isAddDialogVisible}
      onBackdropClick={handleBackdropClick}
    >
      <DialogTitle>Add Torrent</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth={true}
            autoFocus={true}
            label="Magnet"
            onChange={(event) => {
              setMagnetUrl(event.target.value)
            }}
          />
          <TextField fullWidth={true} type="file" />
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

const mapState = (state: RootState) => ({
  isAddDialogVisible: state.torrents.isAddDialogVisible,
})

export default connect(
  mapState,
  actions,
)(AddTorrentDialog)
