import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppointmentBanner } from './AppointmentBanner'
import { CarouselBanner } from './CarouselBanner'
import { DepartmentBanner } from './DepartmentBanner'
import { NavigatorBanner } from './NavigatorBanner'

const MAX_WIDTH = 390

export const HomeContainer = () => {
  console.log('123')

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box component="div" sx={{ width: '100%', maxWidth: `${MAX_WIDTH}px` }}>
        {/* carousel */}
        <CarouselBanner />
        {/* register */}
        <AppointmentBanner />
        <Box
          component="div"
          sx={{
            background: '#F8F8F8',
          }}
        >
          {/* navigator */}
          <NavigatorBanner />
          {/* department */}
          <DepartmentBanner />
        </Box>
      </Box>
    </Box>
  )
}
