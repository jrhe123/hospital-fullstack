import { Box, Button, TextField, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useStaffService } from '../hooks'

interface BoxWrapperProps {
  children?: React.ReactNode
}

const BoxWrapper: FC<BoxWrapperProps> = ({ children }) => (
  <Box
    component="div"
    sx={{
      width: '100%',
      height: '100%',
      background: 'white',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      borderRadius: '3px',
    }}
    className="hide-scroll"
  >
    {children}
  </Box>
)

export const DoctorContainer = () => {
  const { isLoading } = useStaffService()

  return (
    <BoxWrapper>
      <Box>123</Box>
    </BoxWrapper>
  )
}
