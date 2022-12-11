import { all, fork } from 'redux-saga/effects'

import { homeWatcherSaga } from 'features/home/store/home.sagas'
import { loginWatcherSaga } from 'features/login/store/login.sagas'
import { staffWatcherSaga } from 'features/staff/store/staff.sagas'
import { mainWatcherSaga } from 'mainSaga/main.sagas'

export function* rootSaga() {
  // list of saga
  yield all([
    // global
    fork(mainWatcherSaga),
    // features
    fork(homeWatcherSaga),
    fork(loginWatcherSaga),
    fork(staffWatcherSaga),
  ])
}

export default rootSaga
