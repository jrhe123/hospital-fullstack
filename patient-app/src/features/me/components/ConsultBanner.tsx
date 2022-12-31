import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

import BannerImage9 from 'assets/images/banner/banner-9.jpg'

import { IconNavigator } from '../types'

const iconNavigatorListV2: IconNavigator[] = [
  {
    icon: <Icon icon="uil:bill" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Payment',
    link: '/payment',
  },
  {
    icon: <Icon icon="ic:round-history" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'History',
    link: '/history',
  },
  {
    icon: <Icon icon="gg:pill" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Medication',
    link: '/medication',
  },
  {
    icon: <Icon icon="ant-design:insurance-filled" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Insurance',
    link: '/insurance',
  },
  {
    icon: <Icon icon="carbon:medication" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Refill',
    link: '/refill',
  },
]

export const ConsultBanner = () => (
  <Box
    component="div"
    sx={{
      width: 'calc(100% - 24px)',
      margin: '0 auto',
    }}
  >
    <Box
      component="div"
      sx={{
        background: 'white',
        width: '100%',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      {/* title */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '18px',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '12px',
            fontFamily: 'Playfair',
            fontWeight: 'bold',
          }}
        >
          Consultation
        </Typography>
        {/* more btn */}
        <Button sx={{ padding: 0, minWidth: '20px' }} onClick={() => {}}>
          <Typography
            component="div"
            sx={{
              fontSize: '9px',
              fontFamily: 'Playfair',
              textDecoration: 'underline',
              color: 'black',
            }}
          >
            More
          </Typography>
        </Button>
      </Box>
      {/* nav icons */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {iconNavigatorListV2.map((nav, index) => (
          <Box key={index} component="div">
            <Box
              component="div"
              sx={{
                width: '32px',
                height: '32px',
                position: 'relative',
                margin: '0 auto',
              }}
            >
              <Box
                component="div"
                sx={{
                  background:
                    'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
                  borderRadius: '6px',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton sx={{}}>{nav.icon}</IconButton>
              </Box>
            </Box>
            <Typography
              component="div"
              sx={{
                marginTop: '6px',
                fontSize: '9px',
                fontFamily: 'Playfair',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {nav.title}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* ad banner */}
      <Box component="div" sx={{ marginTop: '12px' }}>
        <Box
          component="img"
          sx={{
            cursor: 'pointer',
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
          alt={'ad banner image'}
          src={BannerImage9}
        />
      </Box>
    </Box>
  </Box>
)
