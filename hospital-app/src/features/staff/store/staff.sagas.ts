import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { searchDepartments, searchDoctors, fetchDoctorDetail } from 'features/staff/api'
import { staffActions } from 'features/staff/store/staff.slice'
import { FetchDoctorDetailFormInput, SearchDoctorFormInput } from 'features/staff/types'

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

// Watcher Saga
export function* staffWatcherSaga(): SagaIterator {
  yield takeLatest(staffActions.fetchDepartmentRequest.type, onFetchDepartmentList)
  yield takeLatest(staffActions.fetchDoctorRequest.type, onFetchDoctorList)
  yield takeLatest(staffActions.fetchDoctorDetailRequest.type, onFetchDoctorDetail)
}

export default staffWatcherSaga
