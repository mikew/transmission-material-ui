import { FormControlLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import { AppDispatch, RootState } from '@src/redux/types'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

function DeleteDialog(
  props: ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>,
) {
  const [deleteData, setDeleteData] = useState(false)

  return (
    <Dialog
      open={props.isDeleteDialogVisible}
      fullWidth={true}
      onClose={() => {
        setDeleteData(false)
        props.onClose()
      }}
    >
      <DialogTitle>Delete {props.checked.length} torrents</DialogTitle>
      <DialogContent>
        <ul>
          {props.checked.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={deleteData}
              onChange={(_event, checked) => setDeleteData(checked)}
            />
          }
          label="Delete Data?"
        />

        <Button
          onClick={() => {
            props.onDeleteClick(props.checked.map((x) => x.id), deleteData)
            props.onClose()
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapState = (state: RootState) => ({
  checked: selectors.getCheckedTorrents(state),
  isDeleteDialogVisible: state.torrents.isDeleteDialogVisible,
})

const mapDispatch = (dispatch: AppDispatch) => ({
  onClose: () => dispatch(actions.toggleDeleteDialog()),
  onDeleteClick: (ids: TransmissionIdLookup, deleteData: boolean) =>
    dispatch(
      actions.removeTorrent({
        deleteData,
        ids,
      }),
    ),
})

export default connect(
  mapState,
  mapDispatch,
)(DeleteDialog)
