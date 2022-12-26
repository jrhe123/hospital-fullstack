import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { sendCode, loginOrRegister } from 'features/me/api'
import { meActions } from 'features/me/store/me.slice'
import { SendCodeFormInput, LoginOrRegisterFormInput } from 'features/me/types'

// Worker Sagas
function* onSendCode({
  payload,
}: {
  type: typeof meActions.sendCodeRequest
  payload: SendCodeFormInput
}): SagaIterator {
  try {
    const response = yield call(sendCode, payload)
    if (response.result) {
      toast.success('Success, SMS has been sent')
      yield put(meActions.sendCodeSucceeded())
    } else {
      const errors = [new Error(response.message)]
      yield put(meActions.sendCodeFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(meActions.sendCodeFailed(errors))
  }
}

function* onLoginOrRegister({
  payload,
}: {
  type: typeof meActions.loginOrRegisterRequest
  payload: LoginOrRegisterFormInput
}): SagaIterator {
  try {
    const response = yield call(loginOrRegister, payload)
    if (response.result) {
      toast.success('Success, logged in')
      localStorage.setItem('token', response.token)
      yield put(meActions.loginOrRegisterSucceeded(true))
    } else {
      const errors = [new Error(response.message)]
      yield put(meActions.loginOrRegisterFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(meActions.loginOrRegisterFailed(errors))
  }
}

// Watcher Saga
export function* meWatcherSaga(): SagaIterator {
  yield takeLatest(meActions.sendCodeRequest.type, onSendCode)
  yield takeLatest(meActions.loginOrRegisterRequest.type, onLoginOrRegister)
}

export default meWatcherSaga
