import { Speed } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'

import { useRootDispatch, useRootSelector } from '@src/redux/helpers'

import actions from './actions'

type SlowModeButtonProps = Omit<IconButtonProps, 'color' | 'onClick'>

const SlowModeButton: React.FC<SlowModeButtonProps> = (props) => {
  const isAltSpeedEnabled = useRootSelector(
    (state) => !!state.transmissionSettings.settings['alt-speed-enabled'],
  )
  const dispatch = useRootDispatch()

  return (
    <IconButton
      {...props}
      color={isAltSpeedEnabled ? 'warning' : undefined}
      onClick={() => {
        dispatch(
          actions.update({
            'alt-speed-enabled': !isAltSpeedEnabled,
          }),
        )
      }}
    >
      <Speed sx={{ transform: 'scaleX(-1)' }} />
    </IconButton>
  )
}
export default SlowModeButton
