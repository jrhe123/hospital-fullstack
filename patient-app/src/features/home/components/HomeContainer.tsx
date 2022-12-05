import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NavigatorIconImage1 from 'assets/images/page/index/navigator-icon-1.png'
import NavigatorIconImage2 from 'assets/images/page/index/navigator-icon-2.png'
import NavigatorIconImage3 from 'assets/images/page/index/navigator-icon-3.png'
import NavigatorIconImage4 from 'assets/images/page/index/navigator-icon-4.png'

import { ImageNavigator } from '../types'

import { AppointmentBanner } from './AppointmentBanner'
import { CarouselBanner } from './CarouselBanner'

const MAX_WIDTH = 390

const imageNavigatorList: ImageNavigator[] = [
  {
    image: NavigatorIconImage1,
    title: 'Consultation',
    subtitle: 'Answer patient inquiries',
  },
  {
    image: NavigatorIconImage2,
    title: 'Find a doctor',
    subtitle: "Find a doctor's department",
  },
  {
    image: NavigatorIconImage3,
    title: 'Register online',
    subtitle: 'Online appointment',
  },
  {
    image: NavigatorIconImage4,
    title: 'Prescription',
    subtitle: 'Medication Information',
  },
]

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
      </Box>
    </Box>
  )
}
