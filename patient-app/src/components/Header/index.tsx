import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ModeStandbyIcon from '@mui/icons-material/ModeStandby'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HEADER_HEIGHT = 42
const MEDIA_ICON_SIZE = 24

const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  let goBack = false
  let title = 'Covid Hospital'
  if (pathname.includes('/me/healthcard')) {
    goBack = true
    title = 'Health Card'
  } else if (pathname.includes('/registration')) {
    title = 'Register'
  } else if (pathname.includes('/message')) {
    title = 'Inbox'
  } else if (pathname.includes('/health')) {
    title = 'Health'
  } else if (pathname.includes('/me')) {
    title = 'Profile'
  }

  return (
    <Box
      component="div"
      sx={{
        width: '100vw',
        height: `${HEADER_HEIGHT}px`,
        display: 'flex',
        paddingLeft: '6px',
        paddingRight: '6px',
        alignItems: 'center',
        background: 'white',
        position: 'relative',
      }}
    >
      {/* label */}
      <Box
        component="div"
        sx={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '12px',
            color: '#1e2025',
            fontFamily: 'Playfair',
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1,
          }}
        >
          {title}
        </Typography>
      </Box>
      {/* left side btn */}
      {goBack ? (
        <Box
          component="div"
          sx={{
            position: 'absolute',
            left: '12px',
            top: 0,
            height: '100%',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <IconButton
              onClick={() => {
                navigate(-1)
              }}
              sx={{
                padding: 0,
              }}
            >
              <Box
                component="div"
                sx={{
                  width: `${MEDIA_ICON_SIZE}px`,
                  height: `${MEDIA_ICON_SIZE}px`,
                  borderRadius: `${MEDIA_ICON_SIZE}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ArrowBackIosIcon
                  sx={{
                    color: 'black',
                  }}
                  fontSize={'small'}
                />
              </Box>
            </IconButton>
          </Box>
        </Box>
      ) : null}

      {/* right side btn */}
      <Box
        component="div"
        sx={{
          position: 'absolute',
          right: '6px',
          top: 0,
          height: '100%',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              border: '1px solid #BEBEBF',
              borderRadius: '15px',
              paddingLeft: '6px',
              paddingRight: '6px',
            }}
          >
            <Box component="div" sx={{ marginRight: '3px' }}>
              <IconButton
                onClick={() => {}}
                sx={{
                  padding: 0,
                }}
              >
                <Box
                  component="div"
                  sx={{
                    width: `${MEDIA_ICON_SIZE}px`,
                    height: `${MEDIA_ICON_SIZE}px`,
                    borderRadius: `${MEDIA_ICON_SIZE}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MoreHorizIcon
                    sx={{
                      color: 'black',
                    }}
                    fontSize={'small'}
                  />
                </Box>
              </IconButton>
            </Box>
            <div
              style={{
                width: '1px',
                height: '15px',
                marginRight: '3px',
                marginTop: '2px',
                background: '#e5e5e7',
              }}
            />
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
                    width: `${MEDIA_ICON_SIZE}px`,
                    height: `${MEDIA_ICON_SIZE}px`,
                    borderRadius: `${MEDIA_ICON_SIZE}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ModeStandbyIcon
                    sx={{
                      color: 'black',
                    }}
                    fontSize={'small'}
                  />
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
