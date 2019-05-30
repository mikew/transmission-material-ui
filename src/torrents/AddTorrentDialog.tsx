import Button from '@material-ui/core/Button/Button'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import TextField from '@material-ui/core/TextField/TextField'
import apiInstance from '@src/api/apiInstance'
import { RootState } from '@src/redux/types'
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
    this.props.toggleAddDialog()
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
