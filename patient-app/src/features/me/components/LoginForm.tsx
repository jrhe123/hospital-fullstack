import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import FormTextField from 'libs/ui/components/FormTextField'

import { useMeService } from '../hooks'
import { LoginOrRegisterFormInput } from '../types'

const isPhoneNumber = (value: string) => {
  if (value === undefined || value === null) {
    return false
  }
  const result = value.match(/\d/g)
  return result?.length === 10
}

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
  const [isSend, setIsSend] = useState<boolean>(false)
  const { isLoading, sendCode, loginOrRegister } = useMeService()

  // form check
  const formValidationSchema = Yup.object().shape({
    tel: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Tel is invalid',
    ),
    code: Yup.string().required('Code is required'),
  })
  const methods = useForm<LoginOrRegisterFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  // watch tel for send code btn
  const tel = useWatch({
    control,
    name: 'tel',
  })
  const code = useWatch({
    control,
    name: 'code',
  })

  const onSubmitClick = (data: LoginOrRegisterFormInput) => {
    if (isLoading) return
    const values = getValues()
    loginOrRegister(values)
  }

  const handleSendCode = () => {
    if (isLoading) return
    const values = getValues()
    if (!isPhoneNumber(values.tel)) {
      toast.error('Plese enter a valid number')
      return
    }
    sendCode({
      tel: String(values.tel).trim(),
    })
    setIsSend(true)
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
              width: '36px',
              marginRight: '12px',
            }}
          >
            Phone
          </Typography>
          <Box component="div" sx={{ position: 'relative', flex: 1 }}>
            <FormTextField
              name="tel"
              control={control}
              sx={textFieldStyle}
              type={'number'}
              variant={'outlined'}
            />
            <Box
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                width: '32px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton sx={{ padding: 0 }} onClick={handleSendCode} disabled={!tel || isLoading}>
                <Icon
                  icon="mdi:send"
                  style={{ color: !tel ? '#bebebf' : '#3073AC', fontSize: '18px' }}
                />
              </IconButton>
            </Box>
          </Box>
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
              width: '36px',
              marginRight: '12px',
            }}
          >
            Code
          </Typography>
          <Box component="div" sx={{ position: 'relative', flex: 1 }}>
            <FormTextField
              name="code"
              control={control}
              sx={textFieldStyle}
              type={'text'}
              variant={'outlined'}
            />
          </Box>
        </Box>
        {/* btn */}
        <Box component="div" sx={{}}>
          <Button
            sx={{ width: '100%', padding: 0 }}
            disabled={!tel || !code || isLoading}
            onClick={handleSubmit(onSubmitClick)}
          >
            <Box
              component="div"
              sx={{
                width: '100%',
                height: '32px',
                background: !tel || !code ? '#bebebf' : '#3073AC',
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
