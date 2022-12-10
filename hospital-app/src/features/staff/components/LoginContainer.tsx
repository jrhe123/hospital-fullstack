import QrCodeIcon from '@mui/icons-material/QrCode'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import BgImage from 'assets/images/login/bg.jpg'
import LogoImage from 'assets/images/login/logo.png'

import { useLoginService } from '../hooks'

const BackgroundImage = () => (
  <Box
    component="div"
    sx={{
      position: 'fixed',
      zIndex: 0,
    }}
  >
    <Box
      component="img"
      sx={{
        height: '100vh',
        cursor: 'pointer',
        display: 'block',
        objectFit: 'cover',
      }}
      alt={'login page background'}
      src={BgImage}
    />
  </Box>
)

export const LoginContainer = () => {
  const [username, setUsername] = useState<string>('admin')
  const [password, setPassword] = useState<string>('abc123456')
  const { isLoading, login } = useLoginService()

  const handleLogin = () => {
    if (isLoading) return
    if (!username) {
      toast.warn('Please enter your username..')
      return
    }
    if (!password) {
      toast.warn('Please enter your password..')
      return
    }
    login({
      username: username.trim(),
      password,
    })
  }

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
      }}
    >
      <BackgroundImage />
      <Box
        component="div"
        sx={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="div"
          sx={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '480px',
            width: '80%',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        >
          {/* left logo */}
          <Box component="div" sx={{ flex: 2 }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                cursor: 'pointer',
                display: 'block',
                objectFit: 'cover',
                padding: '12px',
                paddingRight: '36px',
              }}
              alt={'logo'}
              src={LogoImage}
            />
          </Box>
          {/* right login form */}
          <Box component="div" sx={{ flex: 3 }}>
            <Box component="div" sx={{ marginBottom: '12px' }}>
              <TextField
                onChange={e => {
                  setUsername(e.target.value)
                }}
                placeholder={'Username'}
                value={username}
                sx={{
                  width: '100%',
                }}
                InputProps={{
                  sx: {
                    fontSize: 12,
                    color: '#000',
                    height: '36px',
                  },
                }}
              />
            </Box>
            <Box component="div" sx={{ marginBottom: '24px' }}>
              <TextField
                onChange={e => {
                  setPassword(e.target.value)
                }}
                placeholder={'Password'}
                value={password}
                type={'password'}
                sx={{
                  width: '100%',
                }}
                InputProps={{
                  sx: {
                    fontSize: 12,
                    color: '#000',
                    height: '36px',
                  },
                }}
              />
            </Box>
            <Box component="div" sx={{ marginBottom: '6px' }}>
              <Button
                sx={{ width: '100%', padding: 0, borderRadius: '3px', overflow: 'hidden' }}
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
              >
                <Box
                  sx={{
                    background: !username || !password ? '#bebebf' : '#81B3AA',
                    width: '100%',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '12px',
                      color: 'white',
                      fontFamily: 'Playfair',
                      fontWeight: 'bold',
                    }}
                  >
                    Login
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box component="div" sx={{ marginBottom: '12px' }}>
              <Button sx={{ width: '100%', height: '36px', border: '1px solid #81B3AA' }}>
                <QrCodeIcon
                  sx={{
                    color: '#81B3AA',
                    padding: 0,
                    marginRight: '6px',
                  }}
                  fontSize={'small'}
                />
                <Typography
                  component="div"
                  sx={{
                    fontSize: '12px',
                    color: '#81B3AA',
                    fontFamily: 'Playfair',
                    fontWeight: 'bold',
                  }}
                >
                  QR Login
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
