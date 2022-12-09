import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery } from 'redux-saga/effects'

import { login, logout, validate } from 'features/login/api'
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
    toast.success(`Success, welcome back`)
    // action
    const userInfo: UserInfo = {
      user: response.user,
      permissions: response.permissions,
    }
    yield put(loginActions.loginSucceeded(userInfo))
  } else {
    toast.error('Oops, incorrect username OR password')
    const errors = [new Error(response.message)]
    yield put(loginActions.loginFailed(errors))
  }
}

function* onLogout(): SagaIterator {
  const response = yield call(logout)
  if (response.result) {
    // store token
    localStorage.removeItem('token')
    toast.success(`Success, logged out`)
    // action
    yield put(loginActions.logoutSucceeded())
  } else {
    toast.error('Oops, something goes wrong')
    const errors = [new Error(response.message)]
    yield put(loginActions.logoutFailed(errors))
  }
}

function* onValidate(): SagaIterator {
  try {
    const response = yield call(validate)
    if (response.result) {
      // action
      const userInfo: UserInfo = {
        user: response.user,
        permissions: response.permissions,
      }
      yield put(loginActions.validateSucceeded(userInfo))
    } else {
      const errors = [new Error(response.message)]
      yield put(loginActions.validateFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Unauthorized')]
    yield put(loginActions.validateFailed(errors))
  }
}

// Watcher Saga
export function* loginWatcherSaga(): SagaIterator {
  yield takeEvery(loginActions.loginRequest.type, onLogin)
  yield takeEvery(loginActions.logoutRequest.type, onLogout)
  yield takeEvery(loginActions.validateRequest.type, onValidate)
}

export default loginWatcherSaga
