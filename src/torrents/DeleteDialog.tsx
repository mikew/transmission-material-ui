import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

// tslint:disable-next-line:function-name
function MyComponent(
  props: ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>,
) {
  return (
    <Dialog
      open={props.isDeleteDialogVisible}
      fullWidth={true}
      onClose={props.onClose}
    >
      <DialogTitle>Delete {props.checked.length} torrents</DialogTitle>
      <DialogContent>
        {props.checked.map((x) => x.name).join(', ')}
      </DialogContent>
      <DialogActions>
        <Checkbox>wut</Checkbox>
        <Button>Delete</Button>
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
  onDeleteClick: () => {},
})

export default connect(
  mapState,
  mapDispatch,
)(MyComponent)
