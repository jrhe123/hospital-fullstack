import { Box, Button, Typography } from '@mui/material'
import React from 'react'

import BannerImage1 from 'assets/images/banner/banner-1.jpg'
import DepartmentIconImage1 from 'assets/images/page/index/department-icon-1.png'
import DepartmentIconImage10 from 'assets/images/page/index/department-icon-10.png'
import DepartmentIconImage2 from 'assets/images/page/index/department-icon-2.png'
import DepartmentIconImage3 from 'assets/images/page/index/department-icon-3.png'
import DepartmentIconImage4 from 'assets/images/page/index/department-icon-4.png'
import DepartmentIconImage5 from 'assets/images/page/index/department-icon-5.png'
import DepartmentIconImage6 from 'assets/images/page/index/department-icon-6.png'
import DepartmentIconImage7 from 'assets/images/page/index/department-icon-7.png'
import DepartmentIconImage8 from 'assets/images/page/index/department-icon-8.png'
import DepartmentIconImage9 from 'assets/images/page/index/department-icon-9.png'

import { CategoryNavigator } from '../types'

const categoryList: CategoryNavigator[] = [
  { image: DepartmentIconImage1, title: 'Dental' },
  { image: DepartmentIconImage2, title: 'Ophthalmology' },
  { image: DepartmentIconImage3, title: 'ENT' },
  { image: DepartmentIconImage4, title: 'Internal' },
  { image: DepartmentIconImage5, title: 'Surgical' },
  { image: DepartmentIconImage6, title: 'Dermatology' },
  { image: DepartmentIconImage7, title: 'Gynecology' },
  { image: DepartmentIconImage8, title: 'Pediatrics' },
  { image: DepartmentIconImage9, title: 'Neurology' },
  { image: DepartmentIconImage10, title: 'More' },
]

export const DepartmentBanner = () => (
  <Box
    component="div"
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Box
      component="div"
      sx={{
        width: 'calc(100% - 24px)',
        background: 'white',
        borderRadius: '12px',
        marginBottom: '36px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      {/* 10 categories */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          padding: '6px',
          marginTop: '6px',
        }}
      >
        {categoryList.map((cate, index) => (
          <Button
            key={index}
            sx={{
              width: '20%',
              marginBottom: '6px',
            }}
          >
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box
                component="img"
                sx={{
                  cursor: 'pointer',
                  display: 'block',
                  objectFit: 'cover',
                  height: '25px',
                  width: '25px',
                }}
                alt={cate.title}
                src={cate.image}
              />
              <Typography
                component="div"
                sx={{
                  marginTop: '6px',
                  fontSize: '9px',
                  color: '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {cate.title}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
      {/* ad banner */}
      <Box
        component="div"
        sx={{
          paddingLeft: '12px',
          paddingRight: '12px',
          marginBottom: '24px',
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
          }}
          alt={'ad banner image'}
          src={BannerImage1}
        />
      </Box>
    </Box>
  </Box>
)
