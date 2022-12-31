import { Icon } from '@iconify/react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'

import BannerImage11 from 'assets/images/banner/banner-11.png'

import { Step1Form } from './Step1Form'
import { StepBanner } from './StepBanner'

const MAX_WIDTH = 390
const HEADER_HEIGHT = 42

const AdBanner = () => (
  <Box
    component="div"
    sx={{
      width: 'calc(100% - 24px)',
      margin: '0 auto',
      marginTop: '515px',
      marginBottom: '36px',
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
      src={BannerImage11}
    />
  </Box>
)

export const HealthcardContainer = () => {
  const [step, setStep] = useState<number>(1)

  const renderForm = () => {
    let form = null
    if (step === 1) {
      form = <Step1Form />
    } else if (step === 2) {
      form = <Step1Form />
    } else if (step === 3) {
      form = <Step1Form />
    }
    return form
  }

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
        <Box component="div" sx={{ position: 'relative' }}>
          <StepBanner />
          {renderForm()}
        </Box>
        {/* ad banner */}
        <AdBanner />
      </Box>
    </Box>
  )
}
