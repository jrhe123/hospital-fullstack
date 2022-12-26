import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MAX_WIDTH = 390

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
      <Box component="div" sx={{ width: '100%', maxWidth: `${MAX_WIDTH}px` }}>
        me container here
      </Box>
    </Box>
  )
}
