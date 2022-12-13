// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  SearchDoctorFormInput,
  Doctor,
  Department,
  DoctorPageUtil,
  DepartmentPageUtil,
  DoctorDetail,
  FetchDoctorDetailFormInput,
  UploadDoctorPhotoFormInput,
} from 'features/staff/types'
import type { RootState } from 'store/store'

export interface StaffState {
  isLoading: boolean
  departmentList: Department[]
  totalCount: number
  totalPage: number
  doctorList: Doctor[]
  doctor: DoctorDetail | null
  errors?: Error[]
}

const initialState: StaffState = {
  isLoading: false,
  // department
  departmentList: [],
  // doctor
  totalCount: 0,
  totalPage: 0,
  doctorList: [],
  doctor: null,
  errors: [],
}

// slice
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // fetch department list
    fetchDepartmentRequest(state) {
      state.isLoading = true
      state.errors = []
    },
    fetchDepartmentSucceeded(state, action: PayloadAction<DepartmentPageUtil>) {
      state.isLoading = false
      state.departmentList = action.payload.list
    },
    fetchDepartmentFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // fetch doctor list
    fetchDoctorRequest(state, action: PayloadAction<SearchDoctorFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    fetchDoctorSucceeded(state, action: PayloadAction<DoctorPageUtil>) {
      state.isLoading = false
      state.doctorList = action.payload.pageUtil.list
      state.totalCount = action.payload.pageUtil.totalCount
      state.totalPage = action.payload.pageUtil.totalPage
    },
    fetchDoctorFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // fetch doctor detail
    fetchDoctorDetailRequest(state, action: PayloadAction<FetchDoctorDetailFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    fetchDoctorDetailSucceeded(state, action: PayloadAction<DoctorDetail>) {
      state.isLoading = false
      state.doctor = action.payload
    },
    fetchDoctorDetailFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // upload doctor photo
    uploadDoctorPhotoRequest(state, action: PayloadAction<UploadDoctorPhotoFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    uploadDoctorPhotoSucceeded(state, action: PayloadAction<string>) {
      state.isLoading = false
      if (state.doctor) {
        state.doctor.photo = action.payload
      }
    },
    uploadDoctorPhotoFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const staffActions = {
  // fetch department
  fetchDepartmentRequest: staffSlice.actions.fetchDepartmentRequest,
  fetchDepartmentSucceeded: staffSlice.actions.fetchDepartmentSucceeded,
  fetchDepartmentFailed: staffSlice.actions.fetchDepartmentFailed,
  // fetch doctor
  fetchDoctorRequest: staffSlice.actions.fetchDoctorRequest,
  fetchDoctorSucceeded: staffSlice.actions.fetchDoctorSucceeded,
  fetchDoctorFailed: staffSlice.actions.fetchDoctorFailed,
  // fetch doctor detail
  fetchDoctorDetailRequest: staffSlice.actions.fetchDoctorDetailRequest,
  fetchDoctorDetailSucceeded: staffSlice.actions.fetchDoctorDetailSucceeded,
  fetchDoctorDetailFailed: staffSlice.actions.fetchDoctorDetailFailed,
  // upload doctor photo
  uploadDoctorPhotoRequest: staffSlice.actions.uploadDoctorPhotoRequest,
  uploadDoctorPhotoSucceeded: staffSlice.actions.uploadDoctorPhotoSucceeded,
  uploadDoctorPhotoFailed: staffSlice.actions.uploadDoctorPhotoFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.staff.isLoading
export const selectDepartmentList = (state: RootState) => state.staff.departmentList
export const selectTotalCount = (state: RootState) => state.staff.totalCount
export const selectTotalPage = (state: RootState) => state.staff.totalPage
export const selectDoctorList = (state: RootState) => state.staff.doctorList
export const selectDoctor = (state: RootState) => state.staff.doctor

// Reducer
export default staffSlice.reducer
