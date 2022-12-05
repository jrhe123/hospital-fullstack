import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import App from 'App'
// import 'config/i18n'
// reset
import 'index.css'
import reportWebVitals from 'reportWebVitals'
// to-do: remove it
// import { initMockServiceWorker } from 'test/msw'
// initMockServiceWorker()

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// )
const element = document.getElementById('root')
if (element !== null) {
  const root = ReactDOM.createRoot(element)
  root.render(
    // <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>,
    // </React.StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
