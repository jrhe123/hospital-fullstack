import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import FormTextField from 'libs/ui/components/FormTextField'

import { LoginOrRegisterFormInput } from '../types'

const textFieldStyle = {
  '& div': {
    paddingLeft: 1,
    paddingRight: 1,
  },
  '& p.Mui-error': {
    fontSize: '6px',
  },
  '& label': {
    fontSize: '10px',
    lineHeight: 1.67,
  },
  '& .MuiInputBase-root input': {
    padding: 0,
    height: '32px',
    fontSize: '11px',
  },
}
export const LoginForm = () => {
  const [defaultValues, setDefauleValues] = useState<LoginOrRegisterFormInput>({
    tel: '',
    code: '',
  })

  // form check
  const formValidationSchema = Yup.object().shape({
    tel: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Tel is invalid',
    ),
  })
  const methods = useForm<LoginOrRegisterFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const onSubmitClick = (data: LoginOrRegisterFormInput) => {
    const values = getValues()
    console.log('submit: ', values)
  }

  return (
    <Box component="div" sx={{}}>
      <Box
        component="div"
        sx={{
          background: 'white',
          position: 'relative',
        }}
      >
        {/* form */}
        <Typography
          component="div"
          sx={{
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '6px',
          }}
        >
          Please continue with your phone
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: '9px',
            marginBottom: '24px',
          }}
        >
          Please enter 6-digit sms code
        </Typography>
        {/* tel */}
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '12px',
              width: '60px',
            }}
          >
            Phone
          </Typography>
          <FormTextField
            name="tel"
            control={control}
            sx={textFieldStyle}
            type={'text'}
            variant={'outlined'}
          />
        </Box>
        {/* code */}
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '12px' }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginRight: '12px',
              width: '60px',
            }}
          >
            Code
          </Typography>
          <FormTextField
            name="code"
            control={control}
            sx={textFieldStyle}
            type={'text'}
            variant={'outlined'}
          />
        </Box>
        {/* btn */}
        <Box component="div" sx={{}}>
          <Button sx={{ width: '100%', padding: 0 }}>
            <Box
              component="div"
              sx={{
                width: '100%',
                height: '32px',
                background: '#3073AC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                Login
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
