import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Button, Drawer, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import React, { MouseEvent, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import useWindowSize from 'hooks/useWindowSize'

const LOGO_BAR_HEIGHT = 130
const NAV_BAR_WIDTH = 420
const FOOTER_HEIGHT = 42
const BREAK_POINT = 600
const BUTTON_SIZE = 60
const SM_BUTTON_SIZE = 42

const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [collapseC, setCollapseC] = useState<boolean>(true)
  const [collapseE, setCollapseE] = useState<boolean>(true)
  const [anchorElC, setAnchorElC] = useState<null | HTMLElement>(null)
  const [anchorElE, setAnchorElE] = useState<null | HTMLElement>(null)
  const { pathname } = useLocation()
  const { width } = useWindowSize()
  const isMobile = width <= BREAK_POINT

  let isHome = true
  let isAbout = false
  let isBooking = false
  let isClass = false
  let isEvent = false
  let isContact = false
  if (pathname.includes('about')) {
    isHome = false
    isAbout = true
  } else if (pathname.includes('book-online')) {
    isHome = false
    isBooking = true
  } else if (pathname.includes('class')) {
    isHome = false
    isClass = true
  } else if (pathname.includes('event')) {
    isHome = false
    isEvent = true
  } else if (pathname.includes('contact')) {
    isHome = false
    isContact = true
  }

  // class sub menu
  const handleHoverClassBtn = (event: MouseEvent<HTMLButtonElement>) => {
    if (anchorElC !== event.currentTarget) {
      setAnchorElC(event.currentTarget)
    }
  }
  const handleCloseClassMenu = () => {
    setAnchorElC(null)
  }

  // event sub menu
  const handleHoverEventBtn = (event: MouseEvent<HTMLButtonElement>) => {
    if (anchorElE !== event.currentTarget) {
      setAnchorElE(event.currentTarget)
    }
  }
  const handleCloseEventMenu = () => {
    setAnchorElE(null)
  }

  return (
    <>
      {isMobile && (
        <Box
          component="div"
          sx={{
            position: 'relative',
          }}
        >
          <Drawer
            anchor={'left'}
            open={open}
            className={'yt-burge-menu'}
            onClose={() => {
              setOpen(false)
            }}
          >
            {/* home */}
            <Box
              component="div"
              sx={{
                mb: '24px',
                mt: '60px',
                width: '100vw',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isHome ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isHome ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (isHome) return
                  navigate('/')
                }}
              >
                Home
              </Typography>
            </Box>
            {/* about */}
            <Box
              component="div"
              sx={{
                mb: '24px',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isAbout ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isAbout ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (isAbout) return
                  navigate('/about')
                }}
              >
                About
              </Typography>
            </Box>
            {/* class */}
            <Box component="div" sx={{ mb: '24px' }}>
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isClass ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isClass ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (pathname !== '/class') {
                    navigate('/class')
                  }
                }}
              >
                &nbsp;&nbsp;Class&nbsp;&nbsp;
                <a
                  onClick={e => {
                    e.stopPropagation()
                    setCollapseC(!collapseC)
                  }}
                >
                  <KeyboardArrowUpIcon
                    sx={{
                      color: '#1e2025',
                      marginBottom: '-5px',
                    }}
                    fontSize={'medium'}
                    className={collapseC ? 'rotate-icon active' : 'rotate-icon'}
                  />
                </a>
              </Typography>
            </Box>
            {!collapseC && (
              <>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/porfolio' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/porfolio' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/porfolio') {
                        navigate('/porfolio')
                      }
                    }}
                  >
                    Porfolio
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/intro-to-art' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/intro-to-art' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/intro-to-art') {
                        navigate('/intro-to-art')
                      }
                    }}
                  >
                    Intro to Art
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/private-lesson' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/private-lesson' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/private-lesson') {
                        navigate('/private-lesson')
                      }
                    }}
                  >
                    Private Lesson
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/workshops' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/workshops' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/workshops') {
                        navigate('/workshops')
                      }
                    }}
                  >
                    Workshops
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/anime' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/anime' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/anime') {
                        navigate('/anime')
                      }
                    }}
                  >
                    Anime
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/life-drawing' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/life-drawing' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/life-drawing') {
                        navigate('/life-drawing')
                      }
                    }}
                  >
                    Life Drawing
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/self-expression' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/self-expression' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/self-expression') {
                        navigate('/self-expression')
                      }
                    }}
                  >
                    Self Expression
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/industrial-design' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/industrial-design' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/industrial-design') {
                        navigate('/industrial-design')
                      }
                    }}
                  >
                    Industrial Design
                  </Typography>
                </Box>
              </>
            )}
            {/* event */}
            <Box component="div" sx={{ mb: '24px' }}>
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isEvent ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isEvent ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (pathname !== '/event') {
                    navigate('/event')
                  }
                }}
              >
                &nbsp;&nbsp;Events&nbsp;&nbsp;
                <a
                  onClick={e => {
                    e.stopPropagation()
                    setCollapseE(!collapseE)
                  }}
                >
                  <KeyboardArrowUpIcon
                    sx={{
                      color: '#1e2025',
                      marginBottom: '-5px',
                    }}
                    fontSize={'medium'}
                    className={collapseE ? 'rotate-icon active' : 'rotate-icon'}
                  />
                </a>
              </Typography>
            </Box>
            {!collapseE && (
              <>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/art-history' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/art-history' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/art-history') {
                        navigate('/art-history')
                      }
                    }}
                  >
                    Art History
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/paint-night' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/paint-night' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/paint-night') {
                        navigate('/paint-night')
                      }
                    }}
                  >
                    Paint Night
                  </Typography>
                </Box>
                <Box component="div" sx={{ mb: '24px' }}>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '14px',
                      color: pathname === '/giant-painting' ? '#dbc8be' : '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: pathname === '/giant-painting' ? 'bold' : 200,
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpen(false)
                      if (pathname !== '/giant-painting') {
                        navigate('/giant-painting')
                      }
                    }}
                  >
                    Giant Paint
                  </Typography>
                </Box>
              </>
            )}
            {/* book online */}
            <Box
              component="div"
              sx={{
                mb: '24px',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isBooking ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isBooking ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (isBooking) return
                  navigate('/book-online')
                }}
              >
                Book Online
              </Typography>
            </Box>
            {/* contact */}
            <Box component="div">
              <Typography
                component="div"
                sx={{
                  fontSize: '18px',
                  color: isContact ? '#dbc8be' : '#1e2025',
                  fontFamily: 'Playfair',
                  fontWeight: isContact ? 'bold' : 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setOpen(false)
                  if (isContact) return
                  navigate('/contact')
                }}
              >
                Contact
              </Typography>
            </Box>
            {open && (
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={() => {
                    setOpen(false)
                  }}
                  sx={{
                    padding: '4px',
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      width: `${SM_BUTTON_SIZE}px`,
                      height: `${SM_BUTTON_SIZE}px`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CloseIcon
                      sx={{
                        color: '#1e2025',
                      }}
                      fontSize={'medium'}
                    />
                  </Box>
                </IconButton>
              </Box>
            )}
          </Drawer>
        </Box>
      )}
      <AppBar
        position={isMobile ? 'relative' : 'sticky'}
        sx={{
          background: 'white',
        }}
        elevation={0}
      >
        <Box
          component="div"
          sx={{
            position: 'relative',
          }}
        >
          {/* logo bar */}
          <Box
            component="div"
            sx={{
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: `${LOGO_BAR_HEIGHT}px`,
              paddingTop: '36px',
              paddingBottom: '18px',
            }}
          >
            <Box component="div">
              <Button
                onClick={() => {
                  navigate('/')
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontSize: '22px',
                    color: '#1e2025',
                    fontFamily: 'Playfair',
                    fontWeight: 200,
                    textAlign: 'center',
                  }}
                >
                  Art and Design{isMobile ? <br /> : ' '}Toronto
                </Typography>
              </Button>
            </Box>
          </Box>
          {/* divider */}
          {!isMobile && (
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
                  height: '1px',
                  width: 'calc(100vw - 24px)',
                  background: '#000',
                }}
              />
            </Box>
          )}
          {/* burger button */}
          {isMobile && (
            <Box
              component="div"
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
              }}
            >
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <IconButton
                  onClick={() => {
                    setOpen(true)
                  }}
                  sx={{
                    padding: '8px',
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      width: `${BUTTON_SIZE}px`,
                      height: `${BUTTON_SIZE}px`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MenuIcon
                      sx={{
                        color: '#1e2025',
                      }}
                      fontSize={'large'}
                    />
                  </Box>
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
        {/* nav bar */}
        {!isMobile && (
          <Box
            component="div"
            sx={{
              mt: '12px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: '100%',
                width: `${NAV_BAR_WIDTH}px`,
              }}
            >
              {/* home */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                      cursor: 'pointer',
                    }}
                  >
                    Home
                  </Typography>
                </Button>
              </Box>
              {/* about */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/about')
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                    }}
                  >
                    About
                  </Typography>
                </Button>
              </Box>
              {/* class */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/class')
                  }}
                  aria-owns={anchorElC ? 'class-sub-menu' : undefined}
                  aria-haspopup="true"
                  onMouseOver={handleHoverClassBtn}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                      cursor: 'pointer',
                    }}
                  >
                    Class
                  </Typography>
                </Button>
                <Menu
                  id="class-sub-menu"
                  anchorEl={anchorElC}
                  open={Boolean(anchorElC)}
                  onClose={handleCloseClassMenu}
                  MenuListProps={{ onMouseLeave: handleCloseClassMenu }}
                >
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/porfolio')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Porfolio
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/intro-to-art')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Intro to Art
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/private-lesson')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Private Lesson
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/workshops')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Workshops
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/anime')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Anime
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/life-drawing')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Life Drawing
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/self-expression')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Self Expression
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseClassMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/industrial-design')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: '80px',
                        }}
                      >
                        Industrial Design
                      </Typography>
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
              {/* events */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/events')
                  }}
                  aria-owns={anchorElE ? 'event-sub-menu' : undefined}
                  aria-haspopup="true"
                  onMouseOver={handleHoverEventBtn}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                      textAlign: 'left',
                    }}
                  >
                    Events
                  </Typography>
                </Button>
                <Menu
                  id="event-sub-menu"
                  anchorEl={anchorElE}
                  open={Boolean(anchorElE)}
                  onClose={handleCloseEventMenu}
                  MenuListProps={{ onMouseLeave: handleCloseEventMenu }}
                >
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseEventMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/art-history')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                        }}
                      >
                        Art History
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseEventMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/paint-night')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                        }}
                      >
                        Paint Night
                      </Typography>
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ padding: 0 }} onClick={handleCloseEventMenu}>
                    <Button
                      sx={{
                        padding: 0,
                        paddingLeft: '9px',
                        paddingRight: '9px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                        marginLeft: '3px',
                      }}
                      onClick={() => {
                        navigate('/giant-painting')
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          fontSize: '13px',
                          color: '#1e2025',
                          fontFamily: 'Playfair',
                          fontWeight: 200,
                          textAlign: 'left',
                        }}
                      >
                        Giant Paint
                      </Typography>
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
              {/* book online */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/book-online')
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Book Online
                  </Typography>
                </Button>
              </Box>
              {/* contact */}
              <Box
                component="div"
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ height: '100%', paddingLeft: '12px', paddingRight: '12px' }}
                  onClick={() => {
                    navigate('/contact')
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontSize: '13px',
                      color: '#1e2025',
                      fontFamily: 'Playfair',
                      fontWeight: 200,
                      cursor: 'pointer',
                    }}
                  >
                    Contact
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </AppBar>
      {/* page content outlet */}
      <Box
        component="div"
        sx={{
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingBottom: `${FOOTER_HEIGHT}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Header
