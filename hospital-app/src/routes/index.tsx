import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

// theme layout
// import Footer from 'components/Footer'
import Layout from 'components/Layout'

// pages
const HomePage = React.lazy(() => import('pages/HomePage'))
const LoginPage = React.lazy(() => import('pages/LoginPage'))

const AppRoutes = () => (
  <>
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<Layout />}>
          <Route>
            {/* main tab */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  </>
)

export default AppRoutes
