import { ListItem, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { TextField } from 'formik-mui'

const SettingsTextField = ({ name, ...props }) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={
          <Field name={name} component={TextField} fullWidth {...props} />
        }
        secondary={`[${name}]`}
      />
    </ListItem>
  )
}

export default SettingsTextField
