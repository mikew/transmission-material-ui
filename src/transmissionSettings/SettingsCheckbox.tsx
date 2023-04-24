import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { Checkbox } from 'formik-mui'

export type SettingsCheckboxProps = {
  name: string
  label: React.ReactNode
}

const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({
  name,
  ...props
}) => {
  return (
    <ListItem divider>
      <ListItemIcon>
        <Field
          name={name}
          component={Checkbox}
          type="checkbox"
          // Label={{
          //   label: props.label,
          // }}
          // {...props}
        />
      </ListItemIcon>
      <ListItemText primary={props.label} secondary={`[${name}]`} />
    </ListItem>
  )
}

export default SettingsCheckbox
