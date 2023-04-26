import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { Checkbox } from 'formik-mui'

export type SettingsCheckboxProps = {
  name: string
  label: React.ReactNode
  helperText?: React.ReactNode
}

const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({
  name,
  helperText,
  ...props
}) => {
  return (
    <ListItem divider>
      <ListItemIcon>
        <Field name={name} component={Checkbox} type="checkbox" />
      </ListItemIcon>
      <ListItemText
        primary={props.label}
        secondary={
          <>
            {helperText} [{name}]
          </>
        }
      />
    </ListItem>
  )
}

export default SettingsCheckbox
