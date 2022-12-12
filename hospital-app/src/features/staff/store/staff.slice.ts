// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  SearchDoctorFormInput,
  Doctor,
  Department,
  DoctorPageUtil,
  DepartmentPageUtil,
} from 'features/staff/types'
import type { RootState } from 'store/store'

export interface StaffState {
  isLoading: boolean
  departmentList: Department[]
  totalCount: number
  totalPage: number
  doctorList: Doctor[]
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
  errors: [],
}

// slice
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // fetch department
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
    // fetch doctor
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
}

// Selectors
export const selectIsLoading = (state: RootState) => state.staff.isLoading
export const selectDepartmentList = (state: RootState) => state.staff.departmentList
export const selectTotalCount = (state: RootState) => state.staff.totalCount
export const selectTotalPage = (state: RootState) => state.staff.totalPage
export const selectDoctorList = (state: RootState) => state.staff.doctorList

// Reducer
export default staffSlice.reducer
