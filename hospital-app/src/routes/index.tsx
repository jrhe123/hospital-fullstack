import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// theme layout
// import Footer from 'components/Footer'
import Layout from 'components/Layout'
import { useLoginService } from 'features/login'

// pages
const HomePage = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'))

type ProtectedRouteProps = {
  isAuthenticated: boolean
  authenticationPath: string
  outlet: JSX.Element
}

const ProtectedRoute = ({ isAuthenticated, authenticationPath, outlet }: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return outlet
  }
  return <Navigate to={{ pathname: authenticationPath }} />
}
const ProtectedRedirect = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return <Navigate to={{ pathname: authenticationPath }} />
  }
  return outlet
}

const AppRoutes = () => {
  const { isLoaded, isAuth, validate } = useLoginService()

  useEffect(() => {
    validate()
  }, [validate])

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isLoaded && isAuth,
    authenticationPath: '/login',
  }
  const defaultProtectedRedirectProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isLoaded && isAuth,
    authenticationPath: '/',
  }

  if (!isLoaded) return null

  return (
    <>
      <Suspense fallback={<div />}>
        <Routes>
          <Route element={<Layout />}>
            <Route>
              {/* main tab */}
              <Route
                path="/"
                element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage />} />}
              />
              <Route
                path="/login"
                element={
                  <ProtectedRedirect {...defaultProtectedRedirectProps} outlet={<LoginPage />} />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes
