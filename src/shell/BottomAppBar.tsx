import { Close } from '@mui/icons-material'
import Add from '@mui/icons-material/Add'
import Info from '@mui/icons-material/Info'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import inspectorActions from '@src/inspector/actions'
import { useRootDispatch, useRootSelector } from '@src/redux/helpers'
import actions from '@src/torrents/actions'

const BottomAppBar: React.FC = (props) => {
  const dispatch = useRootDispatch()
  const isInspectorOpen = useRootSelector(
    (state) => state.inspector.isInspectorOpen,
  )

  return (
    <AppBar
      position="static"
      sx={(theme) => ({
        position: 'fixed',
        bottom: 0,
        // Force to have the same index as when position="fixed".
        zIndex: theme.zIndex.appBar,
      })}
    >
      <Toolbar variant="dense">
        <Box flexGrow={1} />
        <IconButton
          edge="end"
          onClick={() => {
            dispatch(inspectorActions.toggleInspector())
          }}
        >
          {isInspectorOpen ? <Close /> : <Info />}
        </IconButton>
      </Toolbar>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          // bottom: 0,
          right: 0,
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ pointerEvents: 'all' }}>
          <Fab
            color="secondary"
            onClick={() => dispatch(actions.toggleAddDialog())}
          >
            <Add />
          </Fab>
        </Box>
      </Box>
    </AppBar>
  )
}

export default BottomAppBar
