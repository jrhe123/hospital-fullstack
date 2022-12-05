import { Box, Typography } from '@mui/material'
import React from 'react'

import IconImage1 from 'assets/images/page/index/icon-1.png'
import IconImage2 from 'assets/images/page/index/icon-2.png'
import IconImage3 from 'assets/images/page/index/icon-3.png'

export const AppointmentBanner = () => (
  <Box component="div" sx={{ display: 'flex', flexDirection: 'row' }}>
    {/* left */}
    <Box component="div" sx={{ flex: 1, padding: '12px' }}>
      <Box
        component="img"
        sx={{
          width: '100%',
          cursor: 'pointer',
          display: 'block',
          objectFit: 'cover',
        }}
        alt={'booking an vaccine appointment'}
        src={IconImage1}
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
              marginRight: '12px',
            }}
          >
            Appointment
          </Typography>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: '12px',
            }}
          >
            <Box
              component="img"
              sx={{
                width: '27px',
                height: '27px',
                cursor: 'pointer',
                display: 'block',
              }}
              alt={'skip the line'}
              src={IconImage2}
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
            <Box
              component="img"
              sx={{
                width: '27px',
                height: '27px',
                cursor: 'pointer',
                display: 'block',
              }}
              alt={'skip registration'}
              src={IconImage3}
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
