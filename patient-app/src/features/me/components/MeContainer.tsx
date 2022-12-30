import { Icon } from '@iconify/react'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MAX_WIDTH = 390
const AVATAR_ICON_SIZE = 36

const InfoBanner = () => (
  <Box
    component="div"
    sx={{
      background: '#4373E6',
      padding: '12px',
      paddingBottom: '60px',
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {/* avatar */}
    <Box component="div">
      <IconButton
        onClick={() => {}}
        sx={{
          padding: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            width: `${AVATAR_ICON_SIZE}px`,
            height: `${AVATAR_ICON_SIZE}px`,
            borderRadius: `${AVATAR_ICON_SIZE}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PersonIcon
            sx={{
              color: 'white',
              fontSize: '36px',
            }}
          />
        </Box>
      </IconButton>
    </Box>
    {/* info */}
    <Box component="div" sx={{ marginLeft: '12px' }}>
      <Typography
        component="div"
        sx={{
          fontSize: '12px',
          color: 'white',
          fontFamily: 'Playfair',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '3px',
        }}
      >
        Register / Login
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: '10px',
          color: 'white',
          fontFamily: 'Playfair',
        }}
      >
        Please login for consultation
      </Typography>
    </Box>
  </Box>
)

export type IconNavigator = {
  icon: React.ReactNode
  title: string
  link: string
}

const iconNavigatorList: IconNavigator[] = [
  {
    icon: <Icon icon="uis:hospital-symbol" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Signin',
    link: '/login',
  },
  {
    icon: <Icon icon="healthicons:doctor-male" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Doctor',
    link: '/doctor',
  },
  {
    icon: <Icon icon="material-symbols:note-alt" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Report',
    link: '/report',
  },
  {
    icon: (
      <Icon icon="majesticons:script-prescription" style={{ color: 'white', fontSize: '32px' }} />
    ),
    title: 'Prescription',
    link: '/prescription',
  },
]

const NaviBanner = () => (
  <Box
    component="div"
    sx={{
      position: 'absolute',
      top: '54px',
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      component="div"
      sx={{
        width: 'calc(100% - 24px)',
        height: '100px',
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
      {iconNavigatorList.map((nav, index) => (
        <Box key={index} component="div">
          <Box
            component="div"
            sx={{
              width: '48px',
              height: '48px',
              position: 'relative',
            }}
          >
            <Box
              component="div"
              sx={{
                background: '#E0DFFA',
                borderRadius: '6px',
                height: '48px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                transform: 'rotate(12deg)',
              }}
            />
            <Box
              component="div"
              sx={{
                background: '#4373E6',
                borderRadius: '6px',
                height: '48px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
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
  </Box>
)

export const MeContainer = () => {
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
      <Box
        component="div"
        sx={{ width: '100%', maxWidth: `${MAX_WIDTH}px`, background: '#F8F8F8' }}
      >
        <Box component="div" sx={{ position: 'relative', marginBottom: '54px' }}>
          {/* info banner */}
          <InfoBanner />
          {/* navi banner */}
          <NaviBanner />
        </Box>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
      </Box>
    </Box>
  )
}
