import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, MenuItem, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'
import FormTimePicker from 'libs/ui/components/FormTimePicker'

import { Sex, HealthcardFormInput } from '../types'

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

type Insurance = {
  id: number
  title: string
}
const insuranceList: Insurance[] = [
  {
    id: 1,
    title: 'social basic medical insurance',
  },
  {
    id: 2,
    title: 'commercial medical insurance',
  },
  {
    id: 3,
    title: 'rural cooperative medical care',
  },
  {
    id: 4,
    title: 'serious illness coordinating',
  },
  {
    id: 5,
    title: 'public health care',
  },
  {
    id: 6,
    title: 'urban Resident Medical Insurance',
  },
  {
    id: 7,
    title: 'other',
  },
  {
    id: 8,
    title: 'N/A',
  },
]

type Disease = {
  id: number
  title: string
}
const diseaseList: Disease[] = [
  {
    id: 1,
    title: 'hypertension',
  },
  {
    id: 2,
    title: 'diabetes',
  },
  {
    id: 3,
    title: 'heart disease',
  },
  {
    id: 4,
    title: 'cerebral infarction',
  },
  {
    id: 5,
    title: 'cerebral hemorrhage',
  },
  {
    id: 6,
    title: 'stroke',
  },
  {
    id: 7,
    title: 'leukemia',
  },
  {
    id: 8,
    title: 'epilepsy',
  },
  {
    id: 9,
    title: 'kidney disease',
  },
  {
    id: 10,
    title: 'other',
  },
  {
    id: 11,
    title: 'N/A',
  },
]

interface TagDivProps {
  title: string
  active: boolean
  inactiveColor: string
  inactiveBgColor: string
  activeColor: string
  activeBgColor: string
}
const TagDiv: FC<TagDivProps> = ({
  title,
  active,
  inactiveColor,
  inactiveBgColor,
  activeColor,
  activeBgColor,
}) => (
  <Button
    sx={{
      marginRight: '6px',
      marginBottom: '6px',
      padding: 0,
      minWidth: '0px',
    }}
  >
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: active ? activeBgColor : inactiveBgColor,
        padding: '3px 9px',
        borderRadius: '3px',
      }}
    >
      <Typography
        component="div"
        sx={{
          fontSize: '10px',
          fontWeight: 'bold',
          color: active ? activeColor : inactiveColor,
        }}
      >
        {title}
      </Typography>
    </Box>
  </Button>
)

export const Step2Form = () => {
  const [defaultValues, setDefauleValues] = useState<HealthcardFormInput>({
    name: '',
    pid: '',
    sex: Sex.MALE,
    sexId: '1',
    birthday: new Date(),
    tel: '',
  })

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
  const methods = useForm<HealthcardFormInput, unknown>({
    defaultValues,
    resolver: yupResolver(formValidationSchema),
  })
  const { control, handleSubmit, reset, watch, setValue, getValues } = methods

  const onSubmitClick = (data: HealthcardFormInput) => {
    const values = getValues()
    console.log('submit: ', values)
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
          Please fill up your medical history & insurance info
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
        {/* diease */}
        <Box component="div" sx={{ marginBottom: '12px' }}>
          <Typography
            component="div"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}
          >
            Do you have or do you suffer from?
          </Typography>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {diseaseList.map((di, index) => (
              <TagDiv
                key={index}
                title={di.title}
                active={false}
                activeColor={'white'}
                activeBgColor={'#E1BD63'}
                inactiveColor={'#E1BD63'}
                inactiveBgColor={'#FAF6E8'}
              />
            ))}
          </Box>
        </Box>
        {/* health card type */}
        <Box component="div" sx={{ marginBottom: '12px' }}>
          <Typography
            component="div"
            sx={{
              fontSize: '10px',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}
          >
            Please select health card type:
          </Typography>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {insuranceList.map((insur, index) => (
              <TagDiv
                key={index}
                title={insur.title}
                active={false}
                activeColor={'white'}
                activeBgColor={'#7EC49E'}
                inactiveColor={'#7EC49E'}
                inactiveBgColor={'#E9F6F0'}
              />
            ))}
          </Box>
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
                Confirm
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
