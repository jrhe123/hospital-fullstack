import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery } from 'redux-saga/effects'

import { searchDepartments, searchDoctors } from 'features/staff/api'
import { staffActions } from 'features/staff/store/staff.slice'
import { SearchDoctorFormInput } from 'features/staff/types'

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

// Watcher Saga
export function* staffWatcherSaga(): SagaIterator {
  yield takeEvery(staffActions.fetchDepartmentRequest.type, onFetchDepartmentList)
  yield takeEvery(staffActions.fetchDoctorRequest.type, onFetchDoctorList)
}

export default staffWatcherSaga
