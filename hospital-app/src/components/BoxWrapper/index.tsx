import { Box } from '@mui/material'
import React, { FC } from 'react'

interface BoxWrapperProps {
  children?: React.ReactNode
}

export const BoxWrapper: FC<BoxWrapperProps> = ({ children }) => (
  <Box
    component="div"
    sx={{
      width: '100%',
      height: '100%',
      background: 'white',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      borderRadius: '3px',
    }}
    className="hide-scroll"
  >
    {children}
  </Box>
)
