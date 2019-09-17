import Button from '@material-ui/core/Button/Button'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import List from '@material-ui/core/List/List'
import ListItem from '@material-ui/core/ListItem/ListItem'
import ListItemText from '@material-ui/core/ListItemText/ListItemText'
import { AppDispatch, RootState } from '@src/redux/types'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

function DeleteDialog(
  props: ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>,
) {
  const [deleteData, setDeleteData] = useState(false)

  const handleBackdropClick = useCallback(() => {
    props.onClose()
  }, [])

  useEffect(() => {
    if (!props.isDeleteDialogVisible) {
      setDeleteData(false)
    }
  }, [props.isDeleteDialogVisible])

  return (
    <Dialog
      open={props.isDeleteDialogVisible}
      fullWidth={true}
      onClose={handleBackdropClick}
    >
      <DialogTitle>Delete {props.checked.length} torrents</DialogTitle>
      <DialogContent>
        <List dense={true}>
          {props.checked.map((x) => (
            <ListItem divider={true} key={x.id}>
              <ListItemText primary={x.name} />
            </ListItem>
          ))}
        </List>
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
