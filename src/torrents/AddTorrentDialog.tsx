import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import apiInstance from '@src/api/apiInstance'
import { AppDispatch, RootState } from '@src/redux/types'
import React from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

interface State {
  magnetUrl: string
}

function buildInitialState(): State {
  return {
    magnetUrl: '',
  }
}

class AddTorrentDialog extends React.PureComponent<
  ReturnType<typeof mapState> & typeof actions
> {
  state: State = buildInitialState()

  render() {
    return (
      <Dialog
        open={this.props.isAddDialogVisible}
        onBackdropClick={this.handleBackdropClick}
      >
        <DialogTitle>Add Torrent</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth={true}
              autoFocus={true}
              label="Magnet"
              onChange={this.handleMagnetChange}
            />
            <TextField fullWidth={true} type="file" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAddClick}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  handleBackdropClick = () => {
    this.setState(buildInitialState)
    this.props.toggleAddDialog(null)
  }

  handleMagnetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ magnetUrl: event.target.value })
  }

  handleAddClick = async () => {
    if (this.state.magnetUrl) {
      const response = await apiInstance.addUrl('torrent-add', {
        filename: this.state.magnetUrl,
      })

      this.props.get([response.id])
    }

    this.handleBackdropClick()
    this.props.get()
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.handleAddClick()
  }
}

const mapState = (state: RootState) => ({
  isAddDialogVisible: state.torrents.isAddDialogVisible,
})

export default connect(
  mapState,
  actions,
)(AddTorrentDialog)
