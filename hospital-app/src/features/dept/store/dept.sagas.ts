import { SagaIterator } from '@redux-saga/core'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  searchDepartments,
  createDept,
  fetchDept,
  updateDept,
  deleteDept,
  //
  searchDeptSubs,
} from 'features/dept/api'
import { deptActions } from 'features/dept/store/dept.slice'
import {
  SearchDeptFormInput,
  CreateDeptFormInput,
  FetchDeptFormInput,
  UpdateDeptFormInput,
  DeleteDeptFormInput,
  //
  SearchDeptSubFormInput,
} from 'features/dept/types'

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

function* onCreateDept({
  payload,
}: {
  type: typeof deptActions.createDeptRequest
  payload: CreateDeptFormInput
}): SagaIterator {
  try {
    const response = yield call(createDept, payload)
    if (response.result) {
      toast.success('Success, department added')
      yield put(deptActions.createDeptSucceeded(response))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(deptActions.createDeptFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(deptActions.createDeptFailed(errors))
  }
}

function* onFetchDept({
  payload,
}: {
  type: typeof deptActions.fetchDeptRequest
  payload: FetchDeptFormInput
}): SagaIterator {
  try {
    const response = yield call(fetchDept, payload)
    if (response.result) {
      yield put(deptActions.fetchDeptSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(deptActions.fetchDeptFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(deptActions.fetchDeptFailed(errors))
  }
}

function* onUpdateDept({
  payload,
}: {
  type: typeof deptActions.updateDeptRequest
  payload: UpdateDeptFormInput
}): SagaIterator {
  try {
    delete payload.outpatientId
    delete payload.recommendedId
    const response = yield call(updateDept, payload)
    if (response.result) {
      toast.success('Success, department updated')
      // refetch
      const doctor = yield call(fetchDept, {
        id: payload.id,
      })
      yield put(deptActions.updateDeptSucceeded(doctor.data))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(deptActions.updateDeptFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(deptActions.updateDeptFailed(errors))
  }
}

function* onDeleteDept({
  payload,
}: {
  type: typeof deptActions.deleteDeptRequest
  payload: DeleteDeptFormInput
}): SagaIterator {
  try {
    const response = yield call(deleteDept, payload)
    if (response.result) {
      toast.success('Success, department deleted')
      yield put(deptActions.deleteDeptSucceeded(payload.ids))
    } else {
      toast.error('Oops, something goes wrong. Please check sub sections under this department')
      const errors = [new Error(response.message)]
      yield put(deptActions.deleteDeptFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(deptActions.deleteDeptFailed(errors))
  }
}

// Dept Sub
function* onFetchDeptSubList({
  payload,
}: {
  type: typeof deptActions.fetchDeptSubRequest
  payload: SearchDeptSubFormInput
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
  yield takeEvery(deptActions.createDeptRequest.type, onCreateDept)
  yield takeEvery(deptActions.fetchDeptRequest.type, onFetchDept)
  yield takeEvery(deptActions.updateDeptRequest.type, onUpdateDept)
  yield takeEvery(deptActions.deleteDeptRequest.type, onDeleteDept)
  //
  yield takeLatest(deptActions.fetchDeptSubRequest.type, onFetchDeptSubList)
}

export default deptWatcherSaga
