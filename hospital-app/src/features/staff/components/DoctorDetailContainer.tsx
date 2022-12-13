import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { BoxWrapper } from 'components/BoxWrapper'

type DoctorDetailParams = {
  id?: string
}

export const DoctorDetailContainer = () => {
  const { id } = useParams<DoctorDetailParams>()
  const navigate = useNavigate()

  if (!id) {
    navigate('/staff/doctor')
  }

  console.log('id: ', id)

  return (
    <BoxWrapper>
      <Box
        component="div"
        sx={{
          paddingTop: '18px',
          paddingBottom: '18px',
          paddingLeft: '12px',
          paddingRight: '12px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      ></Box>
    </BoxWrapper>
  )
}
