import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { sendCode, loginOrRegister, uploadPatientPhoto, validate } from 'features/me/api'
import { meActions } from 'features/me/store/me.slice'
import {
  SendCodeFormInput,
  LoginOrRegisterFormInput,
  UploadPatientPhotoFormInput,
} from 'features/me/types'

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
      toast.success('Welcome back')
      localStorage.setItem('token', response.token)
      const validateRes = yield call(validate)
      if (validateRes.result) {
        yield put(meActions.loginOrRegisterSucceeded(validateRes.user))
      } else {
        localStorage.removeItem('token')
        toast.error('Oops, something goes wrong')
        const errors = [new Error('invalid login')]
        yield put(meActions.loginOrRegisterFailed(errors))
      }
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error('invalid login')]
      yield put(meActions.loginOrRegisterFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(meActions.loginOrRegisterFailed(errors))
  }
}

function* onUploadPatientPhoto({
  payload,
}: {
  type: typeof meActions.uploadPatientPhotoRequest
  payload: UploadPatientPhotoFormInput
}): SagaIterator {
  try {
    const formData = new FormData()
    formData.append('file', payload.file)
    const response = yield call(uploadPatientPhoto, formData)
    if (response.result) {
      toast.success('Success, image uploaded')
      yield put(meActions.uploadPatientPhotoSucceeded(response.photo))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(meActions.uploadPatientPhotoFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(meActions.uploadPatientPhotoFailed(errors))
  }
}

function* onValidate(): SagaIterator {
  try {
    const response = yield call(validate)
    if (response.result) {
      yield put(meActions.validateSucceeded(response.user))
    } else {
      localStorage.removeItem('token')
      const errors = [new Error('invalid token')]
      yield put(meActions.validateFailed(errors))
    }
  } catch (error) {
    localStorage.removeItem('token')
    const errors = [new Error('Api error')]
    yield put(meActions.validateFailed(errors))
  }
}

// Watcher Saga
export function* meWatcherSaga(): SagaIterator {
  yield takeLatest(meActions.sendCodeRequest.type, onSendCode)
  yield takeLatest(meActions.loginOrRegisterRequest.type, onLoginOrRegister)
  yield takeEvery(meActions.uploadPatientPhotoRequest.type, onUploadPatientPhoto)
  yield takeLatest(meActions.validateRequest.type, onValidate)
}

export default meWatcherSaga
