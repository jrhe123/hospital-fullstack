import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import logger from 'redux-logger'

import { Env } from 'config/Env'
// list of reducers
import deptReducer from 'features/dept/store/dept.slice'
import homeReducer from 'features/home/store/home.slice'
import loginReducer from 'features/login/store/login.slice'
import staffReducer from 'features/staff/store/staff.slice'
// global
import mainReducer from 'mainSaga/main.slice'
// saga
import { rootSaga } from 'store/rootSaga'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 100000,
})

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, routerMiddleware]
  if (!Env.isProd()) middlewares.push(logger)
  const store = configureStore({
    reducer: {
      // global
      main: mainReducer,
      // features
      home: homeReducer,
      login: loginReducer,
      staff: staffReducer,
      dept: deptReducer,
      // router
      router: routerReducer,
    },
    devTools: Env.isDev(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(middlewares),
  })
  sagaMiddleware.run(rootSaga)
  return store
}

// store & history
export const store = makeStore()
export const history = createReduxHistory(store)

// types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
