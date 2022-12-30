import { Icon } from '@iconify/react'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BannerImage1 from 'assets/images/banner/banner-1.jpg'
import BannerImage10 from 'assets/images/banner/banner-10.jpg'
import BannerImage9 from 'assets/images/banner/banner-9.jpg'

const MAX_WIDTH = 390
const AVATAR_ICON_SIZE = 36

const InfoBanner = () => (
  <Box
    component="div"
    sx={{
      background:
        'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
      padding: '12px',
      paddingBottom: '60px',
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    {/* avatar */}
    <Box component="div">
      <IconButton
        onClick={() => {}}
        sx={{
          padding: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            width: `${AVATAR_ICON_SIZE}px`,
            height: `${AVATAR_ICON_SIZE}px`,
            borderRadius: `${AVATAR_ICON_SIZE}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PersonIcon
            sx={{
              color: 'white',
              fontSize: '36px',
            }}
          />
        </Box>
      </IconButton>
    </Box>
    {/* info */}
    <Box component="div" sx={{ marginLeft: '12px' }}>
      <Typography
        component="div"
        sx={{
          fontSize: '12px',
          color: 'white',
          fontFamily: 'Playfair',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '3px',
        }}
      >
        Register / Login
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: '10px',
          color: 'white',
          fontFamily: 'Playfair',
        }}
      >
        Please login for consultation
      </Typography>
    </Box>
  </Box>
)

export type IconNavigator = {
  icon: React.ReactNode
  title: string
  link: string
}

const iconNavigatorList: IconNavigator[] = [
  {
    icon: <Icon icon="uis:hospital-symbol" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Signin',
    link: '/login',
  },
  {
    icon: <Icon icon="healthicons:doctor-male" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Doctor',
    link: '/doctor',
  },
  {
    icon: <Icon icon="material-symbols:note-alt" style={{ color: 'white', fontSize: '32px' }} />,
    title: 'Report',
    link: '/report',
  },
  {
    icon: (
      <Icon icon="majesticons:script-prescription" style={{ color: 'white', fontSize: '32px' }} />
    ),
    title: 'Prescription',
    link: '/prescription',
  },
]

const NaviBanner = () => (
  <Box
    component="div"
    sx={{
      position: 'absolute',
      top: '54px',
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box
      component="div"
      sx={{
        width: 'calc(100% - 24px)',
        height: '100px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {iconNavigatorList.map((nav, index) => (
        <Box key={index} component="div">
          <Box
            component="div"
            sx={{
              width: '48px',
              height: '48px',
              position: 'relative',
            }}
          >
            <Box
              component="div"
              sx={{
                background: '#E0DFFA',
                borderRadius: '6px',
                height: '48px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                transform: 'rotate(12deg)',
              }}
            />
            <Box
              component="div"
              sx={{
                background:
                  'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
                borderRadius: '6px',
                height: '48px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton sx={{}}>{nav.icon}</IconButton>
            </Box>
          </Box>
          <Typography
            component="div"
            sx={{
              marginTop: '6px',
              fontSize: '9px',
              fontFamily: 'Playfair',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {nav.title}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
)

const iconNavigatorListV2: IconNavigator[] = [
  {
    icon: <Icon icon="uil:bill" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Payment',
    link: '/payment',
  },
  {
    icon: <Icon icon="ic:round-history" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'History',
    link: '/history',
  },
  {
    icon: <Icon icon="gg:pill" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Medication',
    link: '/medication',
  },
  {
    icon: <Icon icon="ant-design:insurance-filled" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Insurance',
    link: '/insurance',
  },
  {
    icon: <Icon icon="carbon:medication" style={{ color: 'white', fontSize: '24px' }} />,
    title: 'Refill',
    link: '/refill',
  },
]

const ConsultBanner = () => (
  <Box
    component="div"
    sx={{
      marginLeft: '12px',
      marginRight: '12px',
    }}
  >
    <Box
      component="div"
      sx={{
        background: 'white',
        width: '100%',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      {/* title */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '18px',
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: '12px',
            fontFamily: 'Playfair',
            fontWeight: 'bold',
          }}
        >
          Consultation
        </Typography>
        {/* more btn */}
        <Button sx={{ padding: 0, minWidth: '20px' }} onClick={() => {}}>
          <Typography
            component="div"
            sx={{
              fontSize: '9px',
              fontFamily: 'Playfair',
              textDecoration: 'underline',
              color: 'black',
            }}
          >
            More
          </Typography>
        </Button>
      </Box>
      {/* nav icons */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {iconNavigatorListV2.map((nav, index) => (
          <Box key={index} component="div">
            <Box
              component="div"
              sx={{
                width: '32px',
                height: '32px',
                position: 'relative',
                margin: '0 auto',
              }}
            >
              <Box
                component="div"
                sx={{
                  background:
                    'linear-gradient(5deg, rgba(102,182,204,1) 0%, rgba(83,148,188,1) 35%, rgba(63,115,172,1) 100%)',
                  borderRadius: '6px',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <IconButton sx={{}}>{nav.icon}</IconButton>
              </Box>
            </Box>
            <Typography
              component="div"
              sx={{
                marginTop: '6px',
                fontSize: '9px',
                fontFamily: 'Playfair',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {nav.title}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* ad banner */}
      <Box component="div" sx={{ marginTop: '12px' }}>
        <Box
          component="img"
          sx={{
            cursor: 'pointer',
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
          alt={'ad banner image'}
          src={BannerImage9}
        />
      </Box>
    </Box>
  </Box>
)

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
      <Box
        component="div"
        sx={{
          width: '100%',
          maxWidth: `${MAX_WIDTH}px`,
          background: '#F8F8F8',
        }}
      >
        <Box component="div" sx={{ position: 'relative', marginBottom: '54px' }}>
          {/* info banner */}
          <InfoBanner />
          {/* navi banner */}
          <NaviBanner />
        </Box>
        {/* ad banner */}
        <Box
          component="div"
          sx={{
            paddingLeft: '12px',
            paddingRight: '12px',
            marginTop: '72px',
            marginBottom: '18px',
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
            src={BannerImage1}
          />
        </Box>
        {/* consult */}
        <ConsultBanner />
        {/* ad banner */}
        <Box
          component="div"
          sx={{
            paddingLeft: '12px',
            paddingRight: '12px',
            marginTop: '18px',
            marginBottom: '72px',
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
            src={BannerImage10}
          />
        </Box>
      </Box>
    </Box>
  )
}
