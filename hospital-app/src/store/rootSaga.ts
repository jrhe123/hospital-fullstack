import { all, fork } from 'redux-saga/effects'

import { homeWatcherSaga } from 'features/home/store/home.sagas'
import { loginWatcherSaga } from 'features/login/store/login.sagas'
import { staffWatcherSaga } from 'features/staff/store/staff.sagas'

export function* rootSaga() {
  // list of saga
  yield all([fork(homeWatcherSaga), fork(loginWatcherSaga), fork(staffWatcherSaga)])
}

export default rootSaga
