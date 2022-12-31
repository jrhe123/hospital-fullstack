import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import FormSelect from 'libs/ui/components/FormSelect'
import FormTextField from 'libs/ui/components/FormTextField'
import FormTimePicker from 'libs/ui/components/FormTimePicker'

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

export const Step1Form = () => {
  console.log('123')
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
          height: '600px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        123
      </Box>
    </Box>
  )
}
