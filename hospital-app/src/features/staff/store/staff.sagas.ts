import { SagaIterator } from '@redux-saga/core'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  searchDepartments,
  searchDepAndSub,
  //
  searchDoctors,
  fetchDoctorDetail,
  uploadDoctorPhoto,
  createDoctor,
  fetchDoctorFullDetail,
  updateDoctor,
  deleteDoctor,
} from 'features/staff/api'
import { staffActions } from 'features/staff/store/staff.slice'
import {
  FetchDoctorDetailFormInput,
  SearchDoctorFormInput,
  UploadDoctorPhotoFormInput,
  CreateDoctorFormInput,
  UpdateDoctorFormInput,
  DeleteDoctorFormInput,
} from 'features/staff/types'

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

function* onFetchDeptAndSub(): SagaIterator {
  try {
    const response = yield call(searchDepAndSub)
    if (response.result) {
      yield put(staffActions.fetchDeptAndSubSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDeptAndSubFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDeptAndSubFailed(errors))
  }
}

// ===========================

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

function* onFetchDoctorDetail({
  payload,
}: {
  type: typeof staffActions.fetchDoctorDetailRequest
  payload: FetchDoctorDetailFormInput
}): SagaIterator {
  try {
    const response = yield call(fetchDoctorDetail, payload)
    if (response.result) {
      yield put(staffActions.fetchDoctorDetailSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDoctorDetailFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDoctorDetailFailed(errors))
  }
}

function* onUploadDoctorPhoto({
  payload,
}: {
  type: typeof staffActions.uploadDoctorPhotoRequest
  payload: UploadDoctorPhotoFormInput
}): SagaIterator {
  try {
    const formData = new FormData()
    formData.append('doctorId', payload.doctorId)
    formData.append('file', payload.file)
    const response = yield call(uploadDoctorPhoto, formData)
    if (response.result) {
      toast.success('Success, image uploaded')
      yield put(staffActions.uploadDoctorPhotoSucceeded(response.photo))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.uploadDoctorPhotoFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.uploadDoctorPhotoFailed(errors))
  }
}

function* onCreateDoctor({
  payload,
}: {
  type: typeof staffActions.createDoctorRequest
  payload: CreateDoctorFormInput
}): SagaIterator {
  try {
    payload.birthday = dayjs(payload.birthday).format('YYYY-MM-DD')
    payload.hiredate = dayjs(payload.hiredate).format('YYYY-MM-DD')
    delete payload.sexId
    delete payload.degreeId
    delete payload.jobId
    delete payload.recommendedId
    delete payload.tagStr
    const response = yield call(createDoctor, payload)
    if (response.result) {
      toast.success('Success, doctor added')
      yield put(staffActions.createDoctorSucceeded(response))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.createDoctorFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.createDoctorFailed(errors))
  }
}

function* onFetchDoctorFullDetail({
  payload,
}: {
  type: typeof staffActions.fetchDoctorFullDetailRequest
  payload: FetchDoctorDetailFormInput
}): SagaIterator {
  try {
    const response = yield call(fetchDoctorFullDetail, payload)
    if (response.result) {
      yield put(staffActions.fetchDoctorFullDetailSucceeded(response.data))
    } else {
      const errors = [new Error(response.message)]
      yield put(staffActions.fetchDoctorFullDetailFailed(errors))
    }
  } catch (error) {
    const errors = [new Error('Api error')]
    yield put(staffActions.fetchDoctorFullDetailFailed(errors))
  }
}

function* onUpdateDoctor({
  payload,
}: {
  type: typeof staffActions.updateDoctorRequest
  payload: UpdateDoctorFormInput
}): SagaIterator {
  try {
    payload.birthday = dayjs(payload.birthday).format('YYYY-MM-DD')
    payload.hiredate = dayjs(payload.hiredate).format('YYYY-MM-DD')
    delete payload.sexId
    delete payload.degreeId
    delete payload.jobId
    delete payload.recommendedId
    delete payload.tagStr
    const response = yield call(updateDoctor, payload)
    if (response.result) {
      toast.success('Success, doctor updated')
      // refetch
      const doctor = yield call(fetchDoctorDetail, {
        id: payload.id,
      })
      yield put(staffActions.updateDoctorSucceeded(doctor.data))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.updateDoctorFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.updateDoctorFailed(errors))
  }
}

function* onDeleteDoctor({
  payload,
}: {
  type: typeof staffActions.deleteDoctorRequest
  payload: DeleteDoctorFormInput
}): SagaIterator {
  try {
    const response = yield call(deleteDoctor, payload)
    if (response.result) {
      toast.success('Success, doctor deleted')
      yield put(staffActions.deleteDoctorSucceeded(payload.ids))
    } else {
      toast.error('Oops, something goes wrong')
      const errors = [new Error(response.message)]
      yield put(staffActions.deleteDoctorFailed(errors))
    }
  } catch (error) {
    toast.error('Oops, something goes wrong')
    const errors = [new Error('Api error')]
    yield put(staffActions.deleteDoctorFailed(errors))
  }
}

// Watcher Saga
export function* staffWatcherSaga(): SagaIterator {
  yield takeLatest(staffActions.fetchDepartmentRequest.type, onFetchDepartmentList)
  yield takeLatest(staffActions.fetchDeptAndSubRequest.type, onFetchDeptAndSub)
  //
  yield takeLatest(staffActions.fetchDoctorRequest.type, onFetchDoctorList)
  yield takeEvery(staffActions.fetchDoctorDetailRequest.type, onFetchDoctorDetail)
  yield takeEvery(staffActions.uploadDoctorPhotoRequest.type, onUploadDoctorPhoto)
  yield takeEvery(staffActions.createDoctorRequest.type, onCreateDoctor)
  yield takeEvery(staffActions.fetchDoctorFullDetailRequest.type, onFetchDoctorFullDetail)
  yield takeEvery(staffActions.updateDoctorRequest.type, onUpdateDoctor)
  yield takeEvery(staffActions.deleteDoctorRequest.type, onDeleteDoctor)
}

export default staffWatcherSaga
