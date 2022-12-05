import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import NavigatorIconImage1 from 'assets/images/page/index/navigator-icon-1.png'
import NavigatorIconImage2 from 'assets/images/page/index/navigator-icon-2.png'
import NavigatorIconImage3 from 'assets/images/page/index/navigator-icon-3.png'
import NavigatorIconImage4 from 'assets/images/page/index/navigator-icon-4.png'

import { ImageNavigator } from '../types'

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

export const NavigatorBanner = () => (
  <Box
    component="div"
    sx={{
      flex: 1,
      background: '#F8F8F8',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: '18px',
      paddingBottom: '18px',
    }}
  >
    {imageNavigatorList.map((navigator, index) => (
      <Box
        key={index}
        component="div"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Button sx={{ height: '100%' }} onClick={() => {}}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                width: '60%',
                cursor: 'pointer',
                display: 'block',
                objectFit: 'cover',
              }}
              alt={navigator.title}
              src={navigator.image}
            />
            <Typography
              component="div"
              sx={{
                marginTop: '6px',
                fontSize: '11px',
                color: '#1e2025',
                fontFamily: 'Playfair',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {navigator.title}
            </Typography>
            <Typography
              component="div"
              sx={{
                fontSize: '8px',
                color: '##1e2025',
                fontFamily: 'Playfair',
                fontWeight: 200,
                cursor: 'pointer',
              }}
            >
              {navigator.subtitle}
            </Typography>
          </Box>
        </Button>
      </Box>
    ))}
  </Box>
)
