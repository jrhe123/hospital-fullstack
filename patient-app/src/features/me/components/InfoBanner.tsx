import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

import { CustomModal } from 'components/Modal'

import { LoginForm } from './LoginForm'

const AVATAR_ICON_SIZE = 36

export const InfoBanner = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <CustomModal
        open={open}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          padding: '18px',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
        disableBackdropClick={false}
        handleCloseModal={() => {
          setOpen(false)
        }}
      >
        <LoginForm />
      </CustomModal>
      <Box
        component="div"
        sx={{
          background:
            'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
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
          <Button
            sx={{ padding: 0 }}
            onClick={() => {
              setOpen(true)
            }}
          >
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
          </Button>
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
    </>
  )
}
