import BallotIcon from '@mui/icons-material/Ballot'
import DnsIcon from '@mui/icons-material/Dns'
import EmailIcon from '@mui/icons-material/Email'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
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
  link?: string
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
    activeTab: TAB.MANAGEMENT,
    subNavbar: [
      {
        name: 'Management sub 1',
        link: '/management/sub123',
      },
      {
        name: 'Management sub 2',
        link: '/management/sub321',
      },
    ],
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
    activeTab: TAB.STAFF,
    subNavbar: [
      {
        name: 'Doctor',
        link: '/staff/doctor',
      },
      {
        name: 'Nurse',
        link: '/staff/nurse',
      },
      {
        name: 'Worker',
        link: '/staff/worker',
      },
      {
        name: 'Fee',
        link: '/staff/fee',
      },
    ],
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
    activeTab: TAB.DIAGOSE,
    subNavbar: [
      {
        name: 'Diagose sub 1',
        link: '/diagose/sub123',
      },
      {
        name: 'Diagose sub 2',
        link: '/diagose/sub321',
      },
    ],
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
    activeTab: TAB.SYSTEM,
    subNavbar: [
      {
        name: 'System sub 1',
        link: '/system/sub123',
      },
      {
        name: 'System sub 2',
        link: '/system/sub321',
      },
    ],
  },
]

const TOP_BAR_HEIGHT = 36

const Sidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { isLoading, user, logout } = useLoginService()

  // collapse side bar
  const [toggle, setToggle] = useState<boolean>(true)
  // active tab
  const [tab, setTab] = useState<TAB>(TAB.HOME)
  const [activeSubbar, setActiveSubbar] = useState<TAB | null>(null)
  // hover menu
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
    } else {
      setTab(TAB.HOME)
    }
  }, [pathname])

  // HOVER DROPDOWN
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    if (isLoading) return
    logout()
  }

  const width: number = toggle ? 210 : 48
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
        <Button
          sx={{ padding: 0, width: '100%' }}
          onClick={() => {
            setActiveSubbar(null)
            navigate('/')
          }}
        >
          <Box
            component="div"
            sx={{
              width: '100%',
              background: '#81B3AA',
              height: `${TOP_BAR_HEIGHT}px`,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GroupsIcon
              sx={{ color: 'white', marginRight: toggle ? '6px' : '15px' }}
              fontSize={'medium'}
            />
            {toggle && (
              <Typography
                component="div"
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
                className="fade-in"
              >
                COVID
              </Typography>
            )}
          </Box>
        </Button>
        {/* nav bar */}
        <Box
          component="div"
          sx={{
            padding: '12px',
          }}
        >
          {navbars.map((nav, index) => (
            <Box component="div" key={index} sx={{ width: '100%', marginBottom: '6px' }}>
              <Button
                onClick={() => {
                  if (nav.link) {
                    setActiveSubbar(null)
                    navigate(nav.link)
                  } else {
                    if (!nav.activeTab) return
                    if (nav.activeTab !== activeSubbar) {
                      setActiveSubbar(nav.activeTab)
                    } else {
                      setActiveSubbar(null)
                    }
                  }
                }}
                sx={{ padding: 0, width: '100%', paddingTop: '6px', paddingBottom: '6px' }}
              >
                <Box
                  component="div"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    color: nav.activeTab === tab ? 'white' : '#bebebf',
                    position: 'relative',
                  }}
                >
                  {/* arrow icon  */}
                  {nav.subNavbar?.length && toggle ? (
                    <Box
                      component="div"
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 1,
                        height: '22px',
                      }}
                      className={
                        activeSubbar === nav.activeTab ? 'rotate-div rotate-180' : 'rotate-div'
                      }
                    >
                      <KeyboardArrowDownIcon fontSize={'small'} />
                    </Box>
                  ) : null}
                  <Box
                    component="div"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {nav.icon}
                  </Box>
                  {toggle && (
                    <Typography
                      component="div"
                      sx={{
                        marginLeft: '12px',
                        fontWeight: nav.activeTab === tab ? 'bold' : 400,
                        fontSize: '12px',
                      }}
                    >
                      {nav.name}
                    </Typography>
                  )}
                </Box>
              </Button>
              {/* sub navs */}
              <Box
                component="div"
                className="side-bar-sub-nav"
                sx={{
                  height:
                    nav.subNavbar?.length && activeSubbar === nav.activeTab
                      ? `${nav.subNavbar.length * 30}px`
                      : 0,
                }}
              >
                {activeSubbar === nav.activeTab && nav.subNavbar ? (
                  <>
                    {nav.subNavbar.map((subnav, indexx) => (
                      <Button
                        key={indexx}
                        onClick={() => {
                          if (!subnav.link) return
                          navigate(subnav.link)
                        }}
                        sx={{
                          padding: 0,
                          width: '100%',
                          paddingTop: '6px',
                          paddingBottom: '6px',
                          display: 'flex',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            fontWeight: pathname === subnav.link ? 'bold' : 400,
                            fontSize: '12px',
                            paddingLeft: toggle ? '32px' : '4px',
                            color: pathname === subnav.link ? 'white' : '#bebebf',
                          }}
                          className="fade-in"
                        >
                          {toggle ? subnav.name : subnav.name.substring(0, 2)}
                        </Typography>
                      </Button>
                    ))}
                  </>
                ) : null}
              </Box>
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
          }}
        >
          {/* left icon */}
          <Box component="div">
            <IconButton
              onClick={() => {
                setToggle(!toggle)
              }}
            >
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
                    {/* {user?.name} */}
                    Administator
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
                <MenuItem onClick={handleLogout}>
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
        <Box
          component="div"
          sx={{
            background: '#F2F2FB',
            height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
            padding: '12px',
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
