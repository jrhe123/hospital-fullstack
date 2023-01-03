import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useMeService } from '../hooks'
import { IconNavigator } from '../types'

const iconNavigatorList: IconNavigator[] = [
  {
    icon: <Icon icon="uis:hospital-symbol" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Health Card',
    link: 'healthcard',
  },
  {
    icon: <Icon icon="healthicons:doctor-male" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Doctors',
    link: 'doctor',
  },
  {
    icon: <Icon icon="material-symbols:note-alt" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Reports',
    link: 'report',
  },
  {
    icon: (
      <Icon icon="majesticons:script-prescription" style={{ color: 'white', fontSize: '32px' }} />
    ),
    title: 'Prescription',
    link: 'prescription',
  },
]

export const NaviBanner = () => {
  const navigate = useNavigate()
  const { isLogin } = useMeService()

  return (
    <Box
      component="div"
      sx={{
        position: 'absolute',
        top: '64px',
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
                  background: isLogin
                    ? 'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)'
                    : '#bebebf',
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
                <IconButton
                  disabled={!isLogin}
                  sx={{}}
                  onClick={() => {
                    navigate(`/me/${nav.link}`)
                  }}
                >
                  {nav.icon}
                </IconButton>
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
                color: isLogin ? '#000' : '#bebebf',
              }}
            >
              {nav.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
