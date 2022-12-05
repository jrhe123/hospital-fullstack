import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const HomeContainer = () => {
  return (
    <Box component="div" sx={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
      <Typography
        component="div"
        sx={{
          fontSize: '11px',
          color: '#1e2025',
          fontFamily: 'Playfair',
          fontWeight: 200,
        }}
      >
        home container
      </Typography>
    </Box>
  )
}
