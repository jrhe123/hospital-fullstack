// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  Department,
  DepartmentPageUtil,
  DeptSub,
  DeptSubPageUtil,
  SearchDeptFormInput,
} from 'features/dept/types'
import type { RootState } from 'store/store'

export interface DeptState {
  isLoading: boolean
  totalCount: number
  totalPage: number
  departmentList: Department[]
  deptSubList: DeptSub[]
  errors?: Error[]
}

const initialState: DeptState = {
  isLoading: false,
  // department
  totalCount: 0,
  totalPage: 0,
  departmentList: [],
  deptSubList: [],
  errors: [],
}

// slice
export const deptSlice = createSlice({
  name: 'dept',
  initialState,
  reducers: {
    // fetch department list
    fetchDepartmentRequest(state, action: PayloadAction<SearchDeptFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    fetchDepartmentSucceeded(state, action: PayloadAction<DepartmentPageUtil>) {
      state.isLoading = false
      state.departmentList = action.payload.pageUtil.list
      state.totalCount = action.payload.pageUtil.totalCount
      state.totalPage = action.payload.pageUtil.totalPage
    },
    fetchDepartmentFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // fetch deptSub list
    fetchDeptSubRequest(state, action: PayloadAction<SearchDeptFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    fetchDeptSubSucceeded(state, action: PayloadAction<DeptSubPageUtil>) {
      state.isLoading = false
      state.deptSubList = action.payload.pageUtil.list
      state.totalCount = action.payload.pageUtil.totalCount
      state.totalPage = action.payload.pageUtil.totalPage
    },
    fetchDeptSubFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const deptActions = {
  // fetch department list
  fetchDepartmentRequest: deptSlice.actions.fetchDepartmentRequest,
  fetchDepartmentSucceeded: deptSlice.actions.fetchDepartmentSucceeded,
  fetchDepartmentFailed: deptSlice.actions.fetchDepartmentFailed,
  // fetch deptSub list
  fetchDeptSubRequest: deptSlice.actions.fetchDeptSubRequest,
  fetchDeptSubSucceeded: deptSlice.actions.fetchDeptSubSucceeded,
  fetchDeptSubFailed: deptSlice.actions.fetchDeptSubFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.dept.isLoading
export const selectDepartmentList = (state: RootState) => state.dept.departmentList
export const selectDeptSubList = (state: RootState) => state.dept.deptSubList
export const selectTotalCount = (state: RootState) => state.dept.totalCount
export const selectTotalPage = (state: RootState) => state.dept.totalPage

// Reducer
export default deptSlice.reducer
