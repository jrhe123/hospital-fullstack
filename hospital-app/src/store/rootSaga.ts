import { all, fork } from 'redux-saga/effects'

import { homeWatcherSaga } from 'features/home/store/home.sagas'
import { loginWatcherSaga } from 'features/login/store/login.sagas'

export function* rootSaga() {
  // list of saga
  yield all([fork(homeWatcherSaga), fork(loginWatcherSaga)])
}

export default rootSaga
