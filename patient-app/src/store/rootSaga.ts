import { all, fork } from 'redux-saga/effects'

import { homeWatcherSaga } from 'features/home/store/home.sagas'
import { meWatcherSaga } from 'features/me/store/me.sagas'

export function* rootSaga() {
  // list of saga
  yield all([fork(homeWatcherSaga), fork(meWatcherSaga)])
}

export default rootSaga
