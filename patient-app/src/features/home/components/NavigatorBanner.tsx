import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import DomainIcon from '@mui/icons-material/Domain'
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook'
import MedicationIcon from '@mui/icons-material/Medication'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import { ImageNavigator } from '../types'

const imageNavigatorList: ImageNavigator[] = [
  {
    icon: (
      <ContactPhoneIcon
        sx={{
          color: '#3073AC',
          padding: 0,
          marginBottom: '3px',
        }}
        fontSize={'large'}
      />
    ),
    title: 'Consultation',
    subtitle: 'Answer patient inquiries',
  },
  {
    icon: (
      <DomainIcon
        sx={{
          color: '#3073AC',
          padding: 0,
          marginBottom: '3px',
        }}
        fontSize={'large'}
      />
    ),
    title: 'Find a doctor',
    subtitle: "Find a doctor's department",
  },
  {
    icon: (
      <LaptopChromebookIcon
        sx={{
          color: '#3073AC',
          padding: 0,
          marginBottom: '3px',
        }}
        fontSize={'large'}
      />
    ),
    title: 'Register online',
    subtitle: 'Online appointment',
  },
  {
    icon: (
      <MedicationIcon
        sx={{
          color: '#3073AC',
          padding: 0,
          marginBottom: '3px',
        }}
        fontSize={'large'}
      />
    ),
    title: 'Prescription',
    subtitle: 'Medication Information',
  },
]

export const NavigatorBanner = () => (
  <Box
    component="div"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '18px',
      paddingBottom: '18px',
    }}
  >
    <Box
      component="div"
      sx={{
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
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
              {navigator.icon}
              <Typography
                component="div"
                sx={{
                  marginTop: '3px',
                  fontSize: '9px',
                  color: '#000',
                  fontFamily: 'Playfair',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {navigator.title}
              </Typography>
            </Box>
          </Button>
        </Box>
      ))}
    </Box>
  </Box>
)
