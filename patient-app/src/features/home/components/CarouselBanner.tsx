import { Box } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

import SwiperImage1 from 'assets/images/swiper/swiper-1.jpg'
import SwiperImage2 from 'assets/images/swiper/swiper-2.jpg'
import SwiperImage3 from 'assets/images/swiper/swiper-3.jpg'
import SwiperImage4 from 'assets/images/swiper/swiper-4.jpg'

import { Image } from '../types'

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

export const CarouselBanner = () => (
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
