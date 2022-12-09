import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'

import { login, logout } from 'features/login/api'
import { loginActions } from 'features/login/store/login.slice'
import { LoginFormInput, UserInfo } from 'features/login/types'

// Worker Sagas
function* onLogin({
  payload,
}: {
  type: typeof loginActions.loginRequest
  payload: LoginFormInput
}): SagaIterator {
  const response = yield call(login, payload)
  if (response.result) {
    // store token
    localStorage.setItem('token', response.token)
    // action
    const userInfo: UserInfo = {
      user: response.user,
      permissions: response.permissions,
    }
    yield put(loginActions.loginSucceeded(userInfo))
  } else {
    const errors = [new Error(response.message)]
    yield put(loginActions.loginFailed(errors))
  }
}

function* onLogout(): SagaIterator {
  const response = yield call(logout)
  if (response.result) {
    // store token
    localStorage.removeItem('token')
    // action
    yield put(loginActions.logoutSucceeded())
  } else {
    const errors = [new Error(response.message)]
    yield put(loginActions.logoutFailed(errors))
  }
}

// Watcher Saga
export function* loginWatcherSaga(): SagaIterator {
  yield takeEvery(loginActions.loginRequest.type, onLogin)
  yield takeEvery(loginActions.logoutRequest.type, onLogout)
}

export default loginWatcherSaga
