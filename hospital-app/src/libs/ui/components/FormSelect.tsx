import { FormControl, InputLabel, Select, SxProps, Theme } from '@mui/material'
// react hook form
import { Controller } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types'

export interface FormSelectProps {
  name: string
  control: Control<any> // eslint-disable-line
  label?: string
  lsx?: SxProps<Theme>
  sx?: SxProps<Theme>
  children: React.ReactNode
  errorMessage?: string
}

export const FormSelect = ({
  name,
  control,
  label,
  lsx,
  sx,
  children,
  errorMessage,
}: FormSelectProps) => {
  const labelId = `${name}-label`
  return (
    <FormControl fullWidth>
      <InputLabel sx={lsx} id={labelId}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              sx={sx}
              labelId={labelId}
              label={label}
              onChange={onChange}
              value={value}
              error={!!error}
            >
              {children}
            </Select>
            {error && (
              <p
                style={{
                  color: '#d32f2f',
                  fontSize: '6px',
                  marginTop: '4px',
                  marginRight: '14px',
                  marginLeft: '14px',
                }}
              >
                {errorMessage || error.message}
              </p>
            )}
          </>
        )}
      />
    </FormControl>
  )
}

export default FormSelect
