import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Field, useField } from 'formik'
import { Checkbox, TextField, TextFieldProps } from 'formik-mui'

export type SettingsCheckboxComboWithTextFieldProps = Omit<
  TextFieldProps,
  'form' | 'meta' | 'field'
> & {
  checkboxFieldName: string
  textFieldName: string
}

const SettingsCheckboxComboWithTextField: React.FC<
  SettingsCheckboxComboWithTextFieldProps
> = ({ checkboxFieldName, textFieldName, ...props }) => {
  const [{ value }] = useField(checkboxFieldName)

  return (
    <ListItem divider>
      <ListItemIcon>
        <Field name={checkboxFieldName} component={Checkbox} type="checkbox" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Field
            name={textFieldName}
            component={TextField}
            disabled={!value}
            fullWidth
            {...props}
            helperText={
              <>
                {props.helperText} [{checkboxFieldName}] [{textFieldName}]
              </>
            }
          />
        }
      />
    </ListItem>
  )
}

export default SettingsCheckboxComboWithTextField
