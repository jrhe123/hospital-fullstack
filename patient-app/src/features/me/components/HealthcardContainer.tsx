import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

const MAX_WIDTH = 390
const HEADER_HEIGHT = 42

export const StepBanner = () => (
  <Box
    component="div"
    sx={{
      background:
        'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
      padding: '12px',
      paddingBottom: '180px',
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {/* steps */}
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Box component="div" sx={{}}>
        1
      </Box>
      <Box component="div" sx={{}}>
        2
      </Box>
      <Box component="div" sx={{}}>
        3
      </Box>
      <Box component="div" sx={{}}>
        4
      </Box>
      <Box component="div" sx={{}}>
        5
      </Box>
    </Box>
  </Box>
)

export const HealthcardContainer = () => {
  console.log('!23')

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: `${HEADER_HEIGHT}px`,
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
        <Box component="div" sx={{ position: 'relative', marginBottom: '54px' }}>
          <StepBanner />
        </Box>
      </Box>
    </Box>
  )
}
