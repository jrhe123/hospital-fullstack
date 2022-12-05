import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'

import IconImage1 from 'assets/images/page/index/icon-1.png'
import IconImage2 from 'assets/images/page/index/icon-2.png'
import IconImage3 from 'assets/images/page/index/icon-3.png'
import SwiperImage1 from 'assets/images/swiper/swiper-1.jpg'
import SwiperImage2 from 'assets/images/swiper/swiper-2.jpg'
import SwiperImage3 from 'assets/images/swiper/swiper-3.jpg'
import SwiperImage4 from 'assets/images/swiper/swiper-4.jpg'

import { Image } from '../types'

const MAX_WIDTH = 390

const imageList: Image[] = [
  {
    image: SwiperImage1,
    title: 'How to protect against the Amicron BA.5 mutant strain?',
  },
  {
    image: SwiperImage2,
    title: 'Tribute to the most beautiful retrograde',
  },
  {
    image: SwiperImage3,
    title: 'Operation Manual for Prevention of Novel Coronavirus',
  },
  {
    image: SwiperImage4,
    title: 'Priority to receive the third dose of the new crown vaccine',
  },
]

const CarouselBanner = () => (
  <Box component="div">
    <Carousel indicators={false} swipe={true} autoPlay={true} sx={{ width: '100%' }}>
      {imageList.map((item, index) => (
        <Box key={index}>
          <Box
            component="img"
            sx={{
              width: '100%',
              cursor: 'pointer',
              display: 'block',
              objectFit: 'cover',
            }}
            alt={item.title}
            src={item.image}
          />
        </Box>
      ))}
    </Carousel>
  </Box>
)

const AppointmentBanner = () => (
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

export const HomeContainer = () => {
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
        {/* carousel */}
        <CarouselBanner />
        {/* register */}
        <AppointmentBanner />
      </Box>
    </Box>
  )
}
