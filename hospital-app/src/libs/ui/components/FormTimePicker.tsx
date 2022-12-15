import { SxProps, TextField, Theme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
// react hook form
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormTimePickerProps {
  name: string
  control: Control<any> // eslint-disable-line
  label?: string
  sx?: SxProps<Theme>
}

export const FormTimePicker = ({ name, control, label, sx }: FormTimePickerProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, ...restField }, fieldState: { error } }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={label}
          onChange={onChange}
          inputFormat="MM/DD/YYYY"
          value={value}
          renderInput={params => (
            <TextField
              {...params}
              helperText={error ? error.message : null}
              error={!!error}
              sx={sx}
            />
          )}
          views={['year', 'month', 'day']}
          {...restField}
        />
      </LocalizationProvider>
    )}
  />
)

export default FormTimePicker
