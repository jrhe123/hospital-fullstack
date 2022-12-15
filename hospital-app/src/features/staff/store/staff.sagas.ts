import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  searchDepartments,
  searchDepAndSub,
  //
  searchDoctors,
  fetchDoctorDetail,
  uploadDoctorPhoto,
  createDoctor,
} from 'features/staff/api'
import { staffActions } from 'features/staff/store/staff.slice'
import {
  FetchDoctorDetailFormInput,
  SearchDoctorFormInput,
  UploadDoctorPhotoFormInput,
  CreateDoctorFormInput,
} from 'features/staff/types'

// Worker Sagas
function* onFetchDepartmentList(): SagaIterator {
  try {
    const response = yield call(searchDepartments)
    if (response.result) {
      yield put(staffActions.fetchDepartmentSucceeded(response))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDepartmentFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDepartmentFailed(errors))
  }
}

function* onFetchDeptAndSub(): SagaIterator {
  try {
    const response = yield call(searchDepAndSub)
    if (response.result) {
      yield put(staffActions.fetchDeptAndSubSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDeptAndSubFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDeptAndSubFailed(errors))
  }
}

// ===========================

function* onFetchDoctorList({
  payload,
}: {
  type: typeof staffActions.fetchDoctorRequest
  payload: SearchDoctorFormInput
}): SagaIterator {
  try {
    const response = yield call(searchDoctors, payload)
    if (response.result) {
      yield put(staffActions.fetchDoctorSucceeded(response))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDoctorFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDoctorFailed(errors))
  }
}

function* onFetchDoctorDetail({
  payload,
}: {
  type: typeof staffActions.fetchDoctorDetailRequest
  payload: FetchDoctorDetailFormInput
}): SagaIterator {
  try {
    const response = yield call(fetchDoctorDetail, payload)
    if (response.result) {
      yield put(staffActions.fetchDoctorDetailSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDoctorDetailFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDoctorDetailFailed(errors))
  }
}

function* onUploadDoctorPhoto({
  payload,
}: {
  type: typeof staffActions.uploadDoctorPhotoRequest
  payload: UploadDoctorPhotoFormInput
}): SagaIterator {
  try {
    const formData = new FormData()
    formData.append('doctorId', payload.doctorId)
    formData.append('file', payload.file)
    const response = yield call(uploadDoctorPhoto, formData)
    if (response.result) {
      toast.success('Success, image uploaded')
      yield put(staffActions.uploadDoctorPhotoSucceeded(response.photo))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.uploadDoctorPhotoFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.uploadDoctorPhotoFailed(errors))
  }
}

function* onCreateDoctor({
  payload,
}: {
  type: typeof staffActions.createDoctorRequest
  payload: CreateDoctorFormInput
}): SagaIterator {
  try {
    const response = yield call(createDoctor, payload)
    if (response.result) {
      toast.success('Success, doctor added')
      yield put(staffActions.createDoctorSucceeded(response))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.createDoctorFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.createDoctorFailed(errors))
  }
}

// Watcher Saga
export function* staffWatcherSaga(): SagaIterator {
  yield takeLatest(staffActions.fetchDepartmentRequest.type, onFetchDepartmentList)
  yield takeLatest(staffActions.fetchDeptAndSubRequest.type, onFetchDeptAndSub)
  //
  yield takeLatest(staffActions.fetchDoctorRequest.type, onFetchDoctorList)
  yield takeEvery(staffActions.fetchDoctorDetailRequest.type, onFetchDoctorDetail)
  yield takeEvery(staffActions.uploadDoctorPhotoRequest.type, onUploadDoctorPhoto)
  yield takeEvery(staffActions.createDoctorRequest.type, onCreateDoctor)
}

export default staffWatcherSaga
