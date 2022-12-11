import { SagaIterator } from '@redux-saga/core'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { mainActions } from './main.slice'

const QS_KEY = 'QS'
enum ACTION {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

const fetchLocalStorge = () =>
  new Promise((resolve, reject) => {
    try {
      // FETCH FROM LOCAL STORAGE
      const qsListStr: string | null = localStorage.getItem(QS_KEY)
      let qsList: string[] = []
      if (qsListStr) {
        qsList = JSON.parse(qsListStr) as string[]
      }
      resolve(qsList)
    } catch (error) {
      reject(error)
    }
  })

const updateLocalStorage = (value: string, action: ACTION) =>
  new Promise((resolve, reject) => {
    try {
      // FETCH FROM LOCAL STORAGE
      const qsListStr: string | null = localStorage.getItem(QS_KEY)
      let qsList: string[] = []
      if (qsListStr) {
        qsList = JSON.parse(qsListStr) as string[]
      }
      // ADD / REMOVE
      if (action === ACTION.ADD && qsList.indexOf(value) === -1) {
        qsList.unshift(value)
      } else if (action === ACTION.REMOVE && qsList.indexOf(value) !== -1) {
        const index = qsList.indexOf(value)
        qsList.splice(index, 1)
      }
      // SAVE BACK TO LOCAL STORAGE
      localStorage.setItem(QS_KEY, JSON.stringify(qsList))
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })

// Worker Sagas
function* onFetchQS(): SagaIterator {
  try {
    const response = yield call(fetchLocalStorge)
    if (response) {
      yield put(mainActions.fetchQuickSectionSucceeded(response))
    } else {
      const errors = [new Error('Local storage error')]
      yield put(mainActions.fetchQuickSectionFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Local storage error')]
    yield put(mainActions.fetchQuickSectionFailed(errors))
  }
}

function* onOpenQS({
  payload,
}: {
  type: typeof mainActions.openQuickSectionRequest
  payload: string
}): SagaIterator {
  try {
    const response = yield call(updateLocalStorage, payload, ACTION.ADD)
    if (response) {
      yield put(mainActions.openQuickSectionSucceeded(payload))
    } else {
      const errors = [new Error('Local storage error')]
      yield put(mainActions.openQuickSectionFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Local storage error')]
    yield put(mainActions.openQuickSectionFailed(errors))
  }
}

function* onCloseQS({
  payload,
}: {
  type: typeof mainActions.closeQuickSectionRequest
  payload: string
}): SagaIterator {
  try {
    const response = yield call(updateLocalStorage, payload, ACTION.REMOVE)
    if (response) {
      yield put(mainActions.closeQuickSectionSucceeded(payload))
    } else {
      const errors = [new Error('Local storage error')]
      yield put(mainActions.closeQuickSectionFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Local storage error')]
    yield put(mainActions.closeQuickSectionFailed(errors))
  }
}

// Watcher Saga
export function* mainWatcherSaga(): SagaIterator {
  yield takeEvery(mainActions.fetchQuickSectionRequest.type, onFetchQS)
  yield takeLatest(mainActions.openQuickSectionRequest.type, onOpenQS)
  yield takeLatest(mainActions.closeQuickSectionRequest.type, onCloseQS)
}

export default mainWatcherSaga
