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
          fontSize: '15px',
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
          fontSize: '12px',
          color: 'white',
          fontFamily: 'Playfair',
        }}
      >
        Please login for consultation
      </Typography>
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
        <Box component="div" sx={{ position: 'relative', marginBottom: '42px' }}>
          {/* info banner */}
          <InfoBanner />
          {/* navi banner */}
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
              }}
            ></Box>
          </Box>
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
