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
import React, { useCallback, useEffect, useState } from 'react'

import { RootState } from '@src/redux/types'
import useDispatch from '@src/redux/useDispatch'
import useShallowEqualSelector from '@src/redux/useShallowEqualSelector'

import actions from './actions'
import * as selectors from './selectors'

function DeleteDialog() {
  const dispatch = useDispatch()
  const mappedState = useShallowEqualSelector(mapState)
  const [deleteData, setDeleteData] = useState(false)
  const onClose = useCallback(() => dispatch(actions.toggleDeleteDialog()), [
    dispatch,
  ])
  const onDeleteClick = () => {
    dispatch(
      actions.removeTorrent({
        deleteData,
        ids: mappedState.checked.map((x) => x.id),
      }),
    )
    onClose()
  }
  const handleBackdropClick = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!mappedState.isDeleteDialogVisible) {
      setDeleteData(false)
    }
  }, [mappedState.isDeleteDialogVisible])

  return (
    <Dialog
      open={mappedState.isDeleteDialogVisible}
      fullWidth={true}
      onClose={handleBackdropClick}
    >
      <DialogTitle>Delete {mappedState.checked.length} torrents</DialogTitle>
      <DialogContent>
        <List dense={true}>
          {mappedState.checked.map((x) => (
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

        <Button onClick={onDeleteClick}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

const mapState = (state: RootState) => ({
  checked: selectors.getCheckedTorrents(state),
  isDeleteDialogVisible: state.torrents.isDeleteDialogVisible,
})

export default React.memo(DeleteDialog)
