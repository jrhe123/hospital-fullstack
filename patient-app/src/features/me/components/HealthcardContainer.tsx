import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

const MAX_WIDTH = 390

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
