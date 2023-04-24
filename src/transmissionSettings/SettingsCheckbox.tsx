import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Field } from 'formik'
import { Checkbox } from 'formik-mui'
import React from 'react'

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
  const fieldName = `[${name}]`
  const finalHelperText = helperText ? (
    <>
      {helperText} {fieldName}
    </>
  ) : (
    fieldName
  )

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
      <ListItemText primary={props.label} secondary={finalHelperText} />
    </ListItem>
  )
}

export default SettingsCheckbox
