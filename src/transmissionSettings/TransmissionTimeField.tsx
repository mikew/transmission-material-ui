import { TextField, TextFieldProps } from '@mui/material'
import { FieldProps } from 'formik'
import { fieldToTextField } from 'formik-mui'

export interface TransmissionTimeFieldProps
  extends FieldProps,
    Omit<TextFieldProps, 'name' | 'value' | 'error'> {}

const TransmissionTimeField: React.FC<TransmissionTimeFieldProps> = ({
  children,
  ...props
}) => {
  const finalProps = fieldToTextField(props)
  finalProps.value = getTimeStringFromNumber(props.field.value)
  finalProps.onChange = (event) => {
    // Using setFieldValue is a lot easier than the trickery involved when
    // looking to use field.onChange + modify event.target.value.
    props.form.setFieldValue(
      props.field.name,
      getNumberFromTimeString(event.target.value),
    )
  }
  return (
    <TextField {...finalProps} type="time">
      {children}
    </TextField>
  )
}

function getTimeStringFromNumber(input: number) {
  const remainder = input % 60
  const numerator = input - remainder

  return `${(numerator / 60).toString().padStart(2, '0')}:${remainder
    .toString()
    .padStart(2, '0')}`
}

function getNumberFromTimeString(input: string) {
  const [hours, minutes] = input.split(':').map(Number)

  return hours * 60 + minutes
}

export default TransmissionTimeField
