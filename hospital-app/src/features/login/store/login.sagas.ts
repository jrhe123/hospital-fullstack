import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'

import { login } from 'features/login/api'
import { loginActions } from 'features/login/store/login.slice'
import { LoginFormInput } from 'features/login/types'

// Worker Sagas
function* onLogin({
  payload,
}: {
  type: typeof loginActions.loginRequest
  payload: LoginFormInput
}): SagaIterator {
  const response = yield call(login, payload)
  if (response.code === 0) {
    // action
    yield put(loginActions.loginSucceeded(response.data))
  } else {
    const errors = [new Error(response.message)]
    yield put(loginActions.loginFailed(errors))
  }
}

// Watcher Saga
export function* loginWatcherSaga(): SagaIterator {
  yield takeEvery(loginActions.loginRequest.type, onLogin)
}

export default loginWatcherSaga
