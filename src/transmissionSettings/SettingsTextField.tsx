import { ListItem, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { TextField, TextFieldProps } from 'formik-mui'

export type SettingsTextFieldProps = Omit<
  TextFieldProps,
  'field' | 'form' | 'meta'
> & {
  name: string
  component?: React.ComponentType<any>
}

const SettingsTextField: React.FC<SettingsTextFieldProps> = ({
  name,
  component,
  ...props
}) => {
  return (
    <ListItem divider>
      <ListItemText
        primary={
          <Field
            name={name}
            component={component ?? TextField}
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
