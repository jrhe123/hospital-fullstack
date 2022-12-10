import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// theme layout
// import Footer from 'components/Footer'
import Layout from 'components/Layout'
import Sidebar from 'components/Sidebar'
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
              <Route element={<Sidebar />}>
                <Route
                  path="/"
                  element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<HomePage />} />}
                />
                <Route
                  path="/management/sub123"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>management page sub123</div>}
                    />
                  }
                />
                <Route
                  path="/management/sub321"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>management page sub321</div>}
                    />
                  }
                />
                <Route
                  path="/staff/sub123"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>staff page sub123</div>}
                    />
                  }
                />
                <Route
                  path="/staff/sub321"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>staff page sub321</div>}
                    />
                  }
                />
                <Route
                  path="/diagose/sub123"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>diagose page sub123</div>}
                    />
                  }
                />
                <Route
                  path="/diagose/sub321"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>diagose page sub321</div>}
                    />
                  }
                />
                <Route
                  path="/system/sub123"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>system page sub123</div>}
                    />
                  }
                />
                <Route
                  path="/system/sub321"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>system page sub321</div>}
                    />
                  }
                />
              </Route>
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
