import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BannerImage1 from 'assets/images/banner/banner-1.jpg'
import BannerImage10 from 'assets/images/banner/banner-10.jpg'

import { ConsultBanner } from './ConsultBanner'
import { InfoBanner } from './InfoBanner'
import { NaviBanner } from './NaviBanner'

const MAX_WIDTH = 390

const AdBanner = () => (
  <Box
    component="div"
    sx={{
      width: 'calc(100% - 24px)',
      margin: '0 auto',
      marginTop: '72px',
      marginBottom: '18px',
    }}
  >
    <Box
      component="img"
      sx={{
        cursor: 'pointer',
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
      alt={'ad banner image'}
      src={BannerImage1}
    />
  </Box>
)

const AdBanner2 = () => (
  <Box
    component="div"
    sx={{
      width: 'calc(100% - 24px)',
      margin: '0 auto',
      marginTop: '18px',
      marginBottom: '72px',
    }}
  >
    <Box
      component="img"
      sx={{
        cursor: 'pointer',
        display: 'block',
        objectFit: 'cover',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
      alt={'ad banner image'}
      src={BannerImage10}
    />
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
        sx={{
          width: '100%',
          maxWidth: `${MAX_WIDTH}px`,
          background: '#F8F8F8',
        }}
      >
        <Box component="div" sx={{ position: 'relative' }}>
          {/* info banner */}
          <InfoBanner />
          {/* navi banner */}
          <NaviBanner />
        </Box>
        {/* ad banner */}
        <AdBanner />
        {/* consult */}
        <ConsultBanner />
        {/* ad banner 2 */}
        <AdBanner2 />
      </Box>
    </Box>
  )
}
