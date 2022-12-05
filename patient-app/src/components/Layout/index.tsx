import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from 'components/Header'
import Playfair from 'fonts/PlayfairDisplay-Regular.woff2'

const Layout = () => {
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          button: {
            textTransform: 'none',
          },
          fontFamily: ['Playfair', 'Arial'].join(','),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Playfair';
                font-style: normal;
                font-display: swap;
                font-weight: 200;
                src: local('Playfair'), local('Playfair-Regular'), url(${Playfair}) format('woff2');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
            `,
          },
        },
        palette: {
          mode: 'light',
          primary: {
            light: '#c2c2c2',
            main: '#c2c2c2',
            dark: '#c2c2c2',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ef9a9a',
            main: '#ef5350',
            dark: '#b71c1c',
            contrastText: '#fff',
          },
        },
      }),
    [],
  )

  return (
    <Box
      component="div"
      sx={{
        bgcolor: '#FFF',
        height: '100vh',
        position: 'relative',
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          <Box component="div">
            <Outlet />
          </Box>
        </main>
      </ThemeProvider>
      <ToastContainer draggable pauseOnHover />
      <Box
        component="div"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99,
          overflow: 'hidden',
        }}
      >
        <Header />
      </Box>
    </Box>
  )
}

export default Layout
