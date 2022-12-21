import { SagaIterator } from '@redux-saga/core'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { searchDepartments, searchDeptSubs } from 'features/dept/api'
import { deptActions } from 'features/dept/store/dept.slice'
import { SearchDeptFormInput } from 'features/dept/types'

// Worker Sagas
function* onFetchDepartmentList({
  payload,
}: {
  type: typeof deptActions.fetchDepartmentRequest
  payload: SearchDeptFormInput
}): SagaIterator {
  try {
    const response = yield call(searchDepartments, payload)
    if (response.result) {
      yield put(deptActions.fetchDepartmentSucceeded(response))
    } else {
      const errors = [new Error(response.message)]
      yield put(deptActions.fetchDepartmentFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(deptActions.fetchDepartmentFailed(errors))
  }
}

function* onFetchDeptSubList({
  payload,
}: {
  type: typeof deptActions.fetchDeptSubRequest
  payload: SearchDeptFormInput
}): SagaIterator {
  try {
    const response = yield call(searchDeptSubs, payload)
    if (response.result) {
      yield put(deptActions.fetchDeptSubSucceeded(response))
    } else {
      const errors = [new Error(response.message)]
      yield put(deptActions.fetchDeptSubFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(deptActions.fetchDeptSubFailed(errors))
  }
}

// Watcher Saga
export function* deptWatcherSaga(): SagaIterator {
  yield takeLatest(deptActions.fetchDepartmentRequest.type, onFetchDepartmentList)
  yield takeLatest(deptActions.fetchDeptSubRequest.type, onFetchDeptSubList)
}

export default deptWatcherSaga
