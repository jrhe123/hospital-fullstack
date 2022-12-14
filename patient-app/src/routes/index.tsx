import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// theme layout
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import { useMeService } from 'features/me'

// pages
const HomePage = React.lazy(() => import('pages/HomePage'))
const MePage = React.lazy(() => import('pages/MePage'))
const RegisterPage = React.lazy(() => import('pages/RegisterPage'))
const HealthcardPage = React.lazy(() => import('pages/HealthcardPage'))

const AppRoutes = () => {
  const { isLoaded, isLogin, validate } = useMeService()

  useEffect(() => {
    if (!isLoaded) {
      validate()
    }
  }, [isLoaded, validate])

  if (!isLoaded) {
    return null
  }

  return (
    <>
      <Suspense fallback={<div />}>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<Footer />}>
              {/* main tab */}
              <Route path="/" element={<HomePage />} />
              <Route path="/me" element={<MePage />} />
            </Route>
            <Route path="/me/register" element={<RegisterPage />} />
            <Route path="/me/healthcard" element={<HealthcardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes
