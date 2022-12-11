import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useStaffService } from '../hooks'

export const DoctorContainer = () => {
  const { isLoading } = useStaffService()

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
      }}
    >
      doctor container here
    </Box>
  )
}
