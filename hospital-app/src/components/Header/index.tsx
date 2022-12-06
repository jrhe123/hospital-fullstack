import ModeStandbyIcon from '@mui/icons-material/ModeStandby'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

const HEADER_HEIGHT = 42
const MEDIA_ICON_SIZE = 24

const Header = () => (
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
        COVID Hospital
      </Typography>
    </Box>
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

export default Header
