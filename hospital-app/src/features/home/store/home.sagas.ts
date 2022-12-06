import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'

import { getTodos } from 'features/home/api'
import { homeActions } from 'features/home/store/home.slice'
import { Todo, GetTodoFormInput } from 'features/home/types'

// Worker Sagas
function* onGetTodos({
  payload,
}: {
  type: typeof homeActions.getTodosRequest
  payload: GetTodoFormInput
}): SagaIterator {
  const response = yield call(getTodos, payload)
  if (response.code === 0) {
    // action
    yield put(homeActions.getTodosSucceeded(response.data))
  } else {
    const errors = [new Error(response.message)]
    yield put(homeActions.getTodosFailed(errors))
  }
}

// Watcher Saga
export function* homeWatcherSaga(): SagaIterator {
  yield takeEvery(homeActions.getTodosRequest.type, onGetTodos)
}

export default homeWatcherSaga
