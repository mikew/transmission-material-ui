import { ListItem, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { TextField, TextFieldProps } from 'formik-mui'

export type SettingsTextFieldProps = Omit<
  TextFieldProps,
  'field' | 'form' | 'meta'
> & {
  name: string
}

const SettingsTextField: React.FC<SettingsTextFieldProps> = ({
  name,
  ...props
}) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={
          <Field
            name={name}
            component={TextField}
            fullWidth
            {...props}
            helperText={
              <>
                {props.helperText} [{name}]
              </>
            }
          />
        }
      />
    </ListItem>
  )
}

export default SettingsTextField
