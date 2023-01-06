import { SagaIterator } from '@redux-saga/core'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { searchWorkPlans } from 'features/diagnosis/api'
import { diagnosisActions } from 'features/diagnosis/store/diagnosis.slice'
import { SearchWorkPlanFormInput, DiagnosisDeptPageUtil } from 'features/diagnosis/types'

// Worker Sagas
function* onFetchWorkPlanDeptList({
  payload,
}: {
  type: typeof diagnosisActions.fetchWorkPlanDeptRequest
  payload: SearchWorkPlanFormInput
}): SagaIterator {
  try {
    const response = yield call(searchWorkPlans, payload)

    console.log('!!!!!!!!')
    console.log('!!!!!!!!')
    console.log('!!!!!!!!')
    console.log('!!!!!!!!')
    console.log('!!!!!!!!')
    console.log('payload: ', payload)
    console.log('response: ', response)

    if (response.result) {
      yield put(diagnosisActions.fetchWorkPlanDeptSucceeded(response))
    } else {
      const errors = [new Error(response.message)]
      yield put(diagnosisActions.fetchWorkPlanDeptFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(diagnosisActions.fetchWorkPlanDeptFailed(errors))
  }
}

// Watcher Saga
export function* diagnosisWatcherSaga(): SagaIterator {
  yield takeLatest(diagnosisActions.fetchWorkPlanDeptRequest.type, onFetchWorkPlanDeptList)
}

export default diagnosisWatcherSaga
