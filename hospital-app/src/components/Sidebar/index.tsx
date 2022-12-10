import BallotIcon from '@mui/icons-material/Ballot'
import DnsIcon from '@mui/icons-material/Dns'
import EmailIcon from '@mui/icons-material/Email'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useLoginService } from 'features/login'

enum TAB {
  HOME = 'HOME',
  MANAGEMENT = 'MANAGEMENT',
  STAFF = 'STAFF',
  DIAGOSE = 'DIAGOSE',
  SYSTEM = 'SYSTEM',
}
type Narbar = {
  name: string
  icon?: React.ReactNode
  link: string
  activeTab?: TAB
  subNavbar?: Narbar[]
}
const navbars: Narbar[] = [
  {
    name: 'Home',
    icon: (
      <HomeIcon
        sx={{
          padding: 0,
        }}
        fontSize={'small'}
      />
    ),
    link: '/',
    activeTab: TAB.HOME,
    subNavbar: [],
  },
  {
    name: 'Management',
    icon: (
      <PeopleAltIcon
        sx={{
          padding: 0,
        }}
        fontSize={'small'}
      />
    ),
    link: '/management',
    activeTab: TAB.MANAGEMENT,
    subNavbar: [],
  },
  {
    name: 'Staff',
    icon: (
      <MonitorHeartIcon
        sx={{
          padding: 0,
        }}
        fontSize={'small'}
      />
    ),
    link: '/staff',
    activeTab: TAB.STAFF,
    subNavbar: [],
  },
  {
    name: 'Diagose',
    icon: (
      <BallotIcon
        sx={{
          padding: 0,
        }}
        fontSize={'small'}
      />
    ),
    link: '/diagose',
    activeTab: TAB.DIAGOSE,
    subNavbar: [],
  },
  {
    name: 'System',
    icon: (
      <DnsIcon
        sx={{
          padding: 0,
        }}
        fontSize={'small'}
      />
    ),
    link: '/system',
    activeTab: TAB.SYSTEM,
    subNavbar: [],
  },
]

const TOP_BAR_HEIGHT = 36

const Sidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { user, logout } = useLoginService()

  const [toggle, setToggle] = useState<boolean>(true)
  const [tab, setTab] = useState(TAB.HOME)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (pathname.includes('management')) {
      setTab(TAB.MANAGEMENT)
    } else if (pathname.includes('staff')) {
      setTab(TAB.STAFF)
    } else if (pathname.includes('diagose')) {
      setTab(TAB.DIAGOSE)
    } else if (pathname.includes('system')) {
      setTab(TAB.SYSTEM)
    }
  }, [pathname])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const width: number = toggle ? 210 : 42
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* wrapper */}
      <Box
        className="side-bar-container"
        sx={{
          width: `${width}px`,
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          background: '#2C373E',
        }}
      >
        {/* logo */}
        <Box
          component="div"
          sx={{
            background: '#81B3AA',
            height: `${TOP_BAR_HEIGHT}px`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GroupsIcon sx={{ color: 'white' }} fontSize={'medium'} />
          <Typography
            component="div"
            sx={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              marginLeft: '6px',
              fontSize: '12px',
            }}
          >
            COVID
          </Typography>
        </Box>
        {/* nav bar */}
        <Box
          component="div"
          sx={{
            padding: '12px',
          }}
        >
          {navbars.map((nav, index) => (
            <Box component="div" key={index} sx={{ width: '100%' }}>
              <Button
                onClick={() => {
                  // navigate(nav.link)
                }}
                sx={{ padding: 0, width: '100%', paddingTop: '6px', paddingBottom: '6px' }}
              >
                <Box
                  component="div"
                  className="side-bar-tab"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    color: nav.activeTab === tab ? 'white' : '#bebebf',
                  }}
                >
                  <Box component="div">{nav.icon}</Box>
                  {toggle && (
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{
                        marginLeft: '12px',
                        fontWeight: nav.activeTab === tab ? 'bold' : 400,
                      }}
                    >
                      {nav.name}
                    </Typography>
                  )}
                </Box>
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      {/* page content outlet */}
      <Box
        component="div"
        sx={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Box
          component="div"
          sx={{
            height: `${TOP_BAR_HEIGHT}px`,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        >
          {/* left icon */}
          <Box component="div">
            <IconButton>
              <MenuIcon
                fontSize={'small'}
                sx={{
                  color: '#000',
                }}
              />
            </IconButton>
          </Box>
          {/* right bar */}
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* email */}
            <Box
              component="div"
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: '3px',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#EB655A',
                  zIndex: 1,
                }}
                component="div"
              >
                <Typography
                  component="div"
                  sx={{
                    color: 'white',
                    fontSize: '9px',
                    marginBottom: '1px',
                  }}
                >
                  0
                </Typography>
              </Box>
              <IconButton>
                <EmailIcon
                  fontSize={'small'}
                  sx={{
                    color: '#000',
                  }}
                />
              </IconButton>
            </Box>
            {/* dropdown */}
            <Box component="div" sx={{ height: '100%' }}>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                onMouseOver={handleClick}
                sx={{ height: '100%' }}
              >
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      color: 'black',
                      fontSize: '12px',
                    }}
                  >
                    {user?.name}
                  </Typography>
                </Box>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                <MenuItem onClick={handleClose}>
                  <Typography
                    component="div"
                    sx={{
                      color: 'black',
                      fontSize: '12px',
                    }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Typography
                    component="div"
                    sx={{
                      color: 'black',
                      fontSize: '12px',
                    }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
        <Box component="div">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
