import React from 'react'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'

// error boundary handles
import ErrorBoundary from 'components/ErrorBoundary'
import AppRoutes from 'routes'
import { history, store } from 'store/store'

const App = () => (
  <>
    <ErrorBoundary>
      <Provider store={store}>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </Provider>
    </ErrorBoundary>
  </>
)

export default App
