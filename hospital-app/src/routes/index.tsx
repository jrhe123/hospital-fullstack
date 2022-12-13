import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// theme layout
import Layout from 'components/Layout'
import Sidebar from 'components/Sidebar'
import { useLoginService } from 'features/login'
import { useMainService } from 'mainSaga'

// pages
const HomePage = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'))
const DoctorPage = React.lazy(() => import('pages/DoctorPage'))
const DoctorDetailPage = React.lazy(() => import('pages/DoctorDetailPage'))

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
  const { fetchQuickSection } = useMainService()

  useEffect(() => {
    fetchQuickSection()
    validate()
  }, [fetchQuickSection, validate])

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
                  path="/staff/doctor"
                  element={
                    <ProtectedRoute {...defaultProtectedRouteProps} outlet={<DoctorPage />} />
                  }
                />
                <Route
                  path="/staff/doctor/:id"
                  element={
                    <ProtectedRoute {...defaultProtectedRouteProps} outlet={<DoctorDetailPage />} />
                  }
                />
                <Route
                  path="/staff/nurse"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>nurse page</div>}
                    />
                  }
                />
                <Route
                  path="/staff/worker"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>worker page</div>}
                    />
                  }
                />
                <Route
                  path="/staff/transaction"
                  element={
                    <ProtectedRoute
                      {...defaultProtectedRouteProps}
                      outlet={<div>transaction page</div>}
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
