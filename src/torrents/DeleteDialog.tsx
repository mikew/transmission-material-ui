import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { memo, useCallback, useEffect, useState } from 'react'

import {
  useRootDispatch,
  useRootSelectorShallowEqual,
} from '@src/redux/helpers'

import actions from './actions'
import * as selectors from './selectors'

function DeleteDialog() {
  const dispatch = useRootDispatch()
  const mappedState = useRootSelectorShallowEqual(mapState)
  const [deleteData, setDeleteData] = useState(false)
  const onClose = useCallback(
    () => dispatch(actions.toggleDeleteDialog()),
    [dispatch],
  )
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

      <DialogContent sx={{ padding: 0 }}>
        <List dense disablePadding>
          {mappedState.checked.map((x) => (
            <ListItem divider={true} key={x.id}>
              <ListItemText primary={x.name} sx={{ wordBreak: 'break-all' }} />
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
              color="error"
            />
          }
          label="Delete Data?"
        />

        <Button onClick={onDeleteClick} variant="contained" color="error">
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

export default memo(DeleteDialog)
