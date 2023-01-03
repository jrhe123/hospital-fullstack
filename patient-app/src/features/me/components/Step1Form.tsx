import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { FC, useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'
import FormTimePicker from 'libs/ui/components/FormTimePicker'

import { useMeService } from '../hooks'
import { Sex, HealthcardFormV1Input } from '../types'

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
const inputLabelStyle = {
  fontSize: '9.5px',
  lineHeight: '2px',
  overflow: 'visible',
  '&.Mui-focused': {
    lineHeight: '17px',
  },
  '&.MuiFormLabel-filled': {
    lineHeight: '17px',
  },
}
const selectFieldStyle = {
  height: '32px',
  fontSize: '11px',
  '& svg': {
    right: 0,
  },
}
const timePickerStyle = {
  height: '32px',
  width: '100%',
  '& div input': {
    height: '32px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '9px',
    paddingRight: '9px',
    fontSize: '11px',
  },
  '& div div button svg': {
    fontSize: '18px',
  },
}

type SexType = {
  id: number
  name: string
}
const sexList: SexType[] = [
  {
    id: 1,
    name: Sex.MALE,
  },
  {
    id: 2,
    name: Sex.FEMALE,
  },
  {
    id: 3,
    name: Sex.UNISEX,
  },
]

interface Step1FormProps {
  handleConfirm: (data: HealthcardFormV1Input) => void
}
export const Step1Form: FC<Step1FormProps> = ({ handleConfirm }) => {
  const [defaultValues, setDefauleValues] = useState<HealthcardFormV1Input>({
    name: '',
    pid: '',
    sex: Sex.MALE,
    sexId: '1',
    birthday: new Date(),
    tel: '',
  })

  const { user } = useMeService()

  // form check
  const formValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    pid: Yup.string().required('PID is required'),
    sex: Yup.mixed<Sex>().oneOf(Object.values(Sex)),
    birthday: Yup.date().max(new Date()),
    tel: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Tel is invalid',
    ),
  })
  const methods = useForm<HealthcardFormV1Input, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  useEffect(() => {
    if (user) {
      const dob = dayjs(user.birthday).add(1, 'day').format('YYYY-MM-DD')
      setValue('name', user.name)
      setValue('pid', user.pid)
      setValue('birthday', new Date(dob))
      setValue('tel', user.tel)

      // re-format the enum
      const sex = Object.keys(Sex)[
        Object.values(Sex).indexOf(user.sex as unknown as Sex)
      ] as keyof typeof Sex
      const sexId = sexList.find(item => item.name === Sex[sex || 'MALE'])?.id
      setValue('sex', Sex[sex || 'MALE'])
      setValue('sexId', String(sexId || 1))
    }
  }, [user, setValue])

  const onSubmitClick = (data: HealthcardFormV1Input) => {
    const sex = sexList.find(i => i.id === Number(data.sexId))
    setValue('sex', sex?.name as Sex)

    const values = getValues()
    handleConfirm(values)
  }

  return (
    <Box
      component="div"
      sx={{
        position: 'absolute',
        top: '90px',
        left: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="div"
        sx={{
          width: 'calc(100% - 24px)',
          height: '420px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          padding: '12px',
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
          Please fill up personal information
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: '9px',
            marginBottom: '24px',
          }}
        >
          Help doctors understand your basic physical conditions, and facilitate consultation and
          prescribing medicines
        </Typography>
        {/* name */}
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
            Name
          </Typography>
          <FormTextField
            name="name"
            control={control}
            sx={textFieldStyle}
            type={'text'}
            variant={'outlined'}
          />
        </Box>
        {/* pid */}
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
            Healthcard
          </Typography>
          <FormTextField
            name="pid"
            control={control}
            sx={textFieldStyle}
            type={'text'}
            variant={'outlined'}
          />
        </Box>
        {/* sex */}
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
            Gender
          </Typography>
          <FormSelect
            name="sexId"
            label={''}
            control={control}
            sx={selectFieldStyle}
            lsx={inputLabelStyle}
            errorMessage={'Invalid sex'}
          >
            {sexList.map((sex, index) => (
              <MenuItem key={index} value={sex.id} sx={{ fontSize: '11px' }}>
                {sex.name}
              </MenuItem>
            ))}
          </FormSelect>
        </Box>
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
        {/* birthday */}
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
            DOB
          </Typography>
          <FormTimePicker name="birthday" label={''} control={control} sx={timePickerStyle} />
        </Box>
        {/* btn */}
        <Box
          component="div"
          sx={{
            position: 'absolute',
            left: '12px',
            bottom: '12px',
            zIndex: 1,
            width: 'calc(100% - 24px)',
          }}
          onClick={handleSubmit(onSubmitClick)}
        >
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
                Next
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
