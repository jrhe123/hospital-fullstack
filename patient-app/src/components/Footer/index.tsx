import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import TextsmsIcon from '@mui/icons-material/Textsms'
import { Box, Button, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import useWindowSize from 'hooks/useWindowSize'

const FOOTER_HEIGHT = 42

const Footer = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { width } = useWindowSize()

  let isHome = true
  let isRegister = false
  let isMessage = false
  let isHealth = false
  let isMe = false
  if (pathname.includes('registration')) {
    isHome = false
    isRegister = true
  } else if (pathname.includes('message')) {
    isHome = false
    isMessage = true
  } else if (pathname.includes('health')) {
    isHome = false
    isHealth = true
  } else if (pathname.includes('me')) {
    isHome = false
    isMe = true
  }

  return (
    <>
      <AppBar
        position={'fixed'}
        sx={{
          background: 'white',
          top: 'auto',
          bottom: 0,
        }}
        elevation={0}
      >
        {/* nav bar */}
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            paddingTop: '3px',
          }}
        >
          {/* home */}
          <Box
            component="div"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <HomeIcon
                  sx={{
                    color: isHome ? '#6198F8' : '#1e2025',
                    padding: 0,
                    marginBottom: '3px',
                  }}
                  fontSize={'medium'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: isHome ? '#6198F8' : '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                    cursor: 'pointer',
                  }}
                >
                  Home
                </Typography>
              </Box>
            </Button>
          </Box>
          {/* registration */}
          <Box
            component="div"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <PendingActionsIcon
                  sx={{
                    color: isRegister ? '#6198F8' : '#1e2025',
                    padding: 0,
                    marginBottom: '3px',
                  }}
                  fontSize={'medium'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: isRegister ? '#6198F8' : '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                  }}
                >
                  Register
                </Typography>
              </Box>
            </Button>
          </Box>
          {/* message */}
          <Box
            component="div"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <TextsmsIcon
                  sx={{
                    color: isMessage ? '#6198F8' : '#1e2025',
                    padding: 0,
                    marginBottom: '3px',
                  }}
                  fontSize={'medium'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: isMessage ? '#6198F8' : '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Message
                </Typography>
              </Box>
            </Button>
          </Box>
          {/* health */}
          <Box
            component="div"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <EscalatorWarningIcon
                  sx={{
                    color: isHealth ? '#6198F8' : '#1e2025',
                    padding: 0,
                    marginBottom: '3px',
                  }}
                  fontSize={'medium'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: isHealth ? '#6198F8' : '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                    cursor: 'pointer',
                  }}
                >
                  Health
                </Typography>
              </Box>
            </Button>
          </Box>
          {/* me */}
          <Box
            component="div"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Button
              sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
              onClick={() => {
                navigate('/')
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <GroupIcon
                  sx={{
                    color: isMe ? '#6198F8' : '#1e2025',
                    padding: 0,
                    marginBottom: '3px',
                  }}
                  fontSize={'medium'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '9px',
                    color: isMe ? '#6198F8' : '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                    cursor: 'pointer',
                  }}
                >
                  Me
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </AppBar>
      {/* page content outlet */}
      <Box
        component="div"
        sx={{
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: `${FOOTER_HEIGHT}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Footer
