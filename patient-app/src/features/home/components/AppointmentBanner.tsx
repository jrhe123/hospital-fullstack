import OfflineBoltIcon from '@mui/icons-material/OfflineBolt'
import QrCodeIcon from '@mui/icons-material/QrCode'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import { Box, Typography } from '@mui/material'
import React from 'react'

import IconImage2 from 'assets/images/page/index/icon-2.png'
import IconImage3 from 'assets/images/page/index/icon-3.png'

export const AppointmentBanner = () => (
  <Box
    component="div"
    sx={{ display: 'flex', flexDirection: 'row', paddingTop: '12px', paddingBottom: '12px' }}
  >
    {/* left */}
    <Box
      component="div"
      sx={{ flex: 1, padding: '12px', display: 'flex', justifyContent: 'center' }}
    >
      <VaccinesIcon
        sx={{
          color: '#3073AC',
          padding: 0,
        }}
        fontSize={'large'}
      />
    </Box>
    {/* right */}
    <Box component="div" sx={{ flex: 5, display: 'flex', alignItems: 'center' }}>
      <Box component="div">
        {/* line 1 */}
        <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            component="div"
            sx={{
              fontSize: '15px',
              color: '#1e2025',
              fontFamily: 'Playfair',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '18px',
            }}
          >
            Reservation
          </Typography>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: '18px',
            }}
          >
            <OfflineBoltIcon
              sx={{
                color: '#3073AC',
                padding: 0,
                marginRight: '6px',
              }}
              fontSize={'small'}
            />
            <Typography
              component="div"
              sx={{
                fontSize: '9px',
                color: '#1e2025',
                fontFamily: 'Playfair',
                fontWeight: 200,
                cursor: 'pointer',
              }}
            >
              Tracking
            </Typography>
          </Box>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <QrCodeIcon
              sx={{
                color: '#3073AC',
                padding: 0,
                marginRight: '6px',
              }}
              fontSize={'small'}
            />
            <Typography
              component="div"
              sx={{
                fontSize: '9px',
                color: '#1e2025',
                fontFamily: 'Playfair',
                fontWeight: 200,
                cursor: 'pointer',
              }}
            >
              QR Code
            </Typography>
          </Box>
        </Box>
        {/* line 2 */}
        <Typography
          component="div"
          sx={{
            marginTop: '3px',
            fontSize: '10px',
            color: '#1e2025',
            fontFamily: 'Playfair',
            fontWeight: 200,
            cursor: 'pointer',
          }}
        >
          Guidelines for Visiting Hospitals During the Epidemic?
        </Typography>
      </Box>
    </Box>
  </Box>
)
