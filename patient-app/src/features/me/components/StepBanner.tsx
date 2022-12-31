import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'

interface StepDivProps {
  title: string
  icon: React.ReactNode
}
const StepDiv: FC<StepDivProps> = ({ title, icon }) => (
  <Box
    component="div"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '42px',
        width: '42px',
        borderRadius: '50%',
        background: '#E1EAFB',
      }}
    >
      {icon}
    </Box>
    <Typography
      component="div"
      sx={{
        fontSize: '9px',
        color: 'white',
        fontFamily: 'Playfair',
        marginTop: '6px',
      }}
    >
      {title}
    </Typography>
  </Box>
)

const stepList: {
  title: string
  icon: React.ReactNode
}[] = [
  {
    title: 'Information',
    icon: <Icon icon="uis:hospital-symbol" style={{ color: '#3073AC', fontSize: '24px' }} />,
  },
  {
    title: 'History',
    icon: <Icon icon="ic:round-history" style={{ color: '#3073AC', fontSize: '24px' }} />,
  },
  {
    title: 'Healthcard',
    icon: (
      <Icon icon="ant-design:insurance-filled" style={{ color: '#3073AC', fontSize: '24px' }} />
    ),
  },
]

export const StepBanner = () => (
  <Box
    component="div"
    sx={{
      background:
        'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
      padding: '12px',
      paddingBottom: '120px',
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {/* steps */}
    <Box
      component="div"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Box component="div" sx={{ flex: 1 }}>
        <StepDiv title={stepList[0].title} icon={stepList[0].icon} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', height: 'calc(100% - 18px)' }}>
        <Box
          component="div"
          sx={{
            background: '#E1EAFB',
            height: '1px',
            width: '100%',
          }}
        />
      </Box>
      <Box component="div" sx={{ flex: 1 }}>
        <StepDiv title={stepList[1].title} icon={stepList[1].icon} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', height: 'calc(100% - 18px)' }}>
        <Box
          component="div"
          sx={{
            background: '#E1EAFB',
            height: '1px',
            width: '100%',
          }}
        />
      </Box>
      <Box component="div" sx={{ flex: 1 }}>
        <StepDiv title={stepList[2].title} icon={stepList[2].icon} />
      </Box>
    </Box>
  </Box>
)
