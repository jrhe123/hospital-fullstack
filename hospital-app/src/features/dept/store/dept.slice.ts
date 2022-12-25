// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  Department,
  DepartmentPageUtil,
  CreateDeptResponse,
  SearchDeptFormInput,
  CreateDeptFormInput,
  FetchDeptFormInput,
  UpdateDeptFormInput,
  DeleteDeptFormInput,
  //
  DeptSub,
  DeptSubPageUtil,
  SearchDeptSubFormInput,
} from 'features/dept/types'
import type { RootState } from 'store/store'

export interface DeptState {
  isLoading: boolean
  totalCount: number
  totalPage: number
  departmentList: Department[]
  department: Department | null
  //
  deptSubList: DeptSub[]
  errors?: Error[]
}

const initialState: DeptState = {
  isLoading: false,
  // department
  totalCount: 0,
  totalPage: 0,
  departmentList: [],
  department: null,
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
    // create dept
    createDeptRequest(state, action: PayloadAction<CreateDeptFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    createDeptSucceeded(state, action: PayloadAction<CreateDeptResponse>) {
      state.isLoading = false
      state.departmentList.unshift(action.payload.data)
      state.totalCount += 1
    },
    createDeptFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // fetch dept
    fetchDeptRequest(state, action: PayloadAction<FetchDeptFormInput>) {
      state.isLoading = true
      state.department = null
      state.errors = []
    },
    fetchDeptSucceeded(state, action: PayloadAction<Department>) {
      state.isLoading = false
      state.department = action.payload
    },
    fetchDeptFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // update dept
    updateDeptRequest(state, action: PayloadAction<UpdateDeptFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    updateDeptSucceeded(state, action: PayloadAction<Department>) {
      state.isLoading = false
      state.department = action.payload
    },
    updateDeptFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // delete dept
    deleteDeptRequest(state, action: PayloadAction<DeleteDeptFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    deleteDeptSucceeded(state, action: PayloadAction<number[]>) {
      state.isLoading = false
      const filterDepartmentList = state.departmentList.filter(
        item => action.payload.indexOf(item.id) === -1,
      )
      const reducedCount = state.departmentList.length - filterDepartmentList.length
      state.departmentList = filterDepartmentList
      state.totalCount -= Math.max(reducedCount, 0)
    },
    deleteDeptFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // Dept Sub
    // fetch deptSub list
    fetchDeptSubRequest(state, action: PayloadAction<SearchDeptSubFormInput>) {
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
  // create dept
  createDeptRequest: deptSlice.actions.createDeptRequest,
  createDeptSucceeded: deptSlice.actions.createDeptSucceeded,
  createDeptFailed: deptSlice.actions.createDeptFailed,
  // fetch dept
  fetchDeptRequest: deptSlice.actions.fetchDeptRequest,
  fetchDeptSucceeded: deptSlice.actions.fetchDeptSucceeded,
  fetchDeptFailed: deptSlice.actions.fetchDeptFailed,
  // update dept
  updateDeptRequest: deptSlice.actions.updateDeptRequest,
  updateDeptSucceeded: deptSlice.actions.updateDeptSucceeded,
  updateDeptFailed: deptSlice.actions.updateDeptFailed,
  // delete dept
  deleteDeptRequest: deptSlice.actions.deleteDeptRequest,
  deleteDeptSucceeded: deptSlice.actions.deleteDeptSucceeded,
  deleteDeptFailed: deptSlice.actions.deleteDeptFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.dept.isLoading
export const selectDepartmentList = (state: RootState) => state.dept.departmentList
export const selectDeptSubList = (state: RootState) => state.dept.deptSubList
export const selectTotalCount = (state: RootState) => state.dept.totalCount
export const selectTotalPage = (state: RootState) => state.dept.totalPage
export const selectDepartment = (state: RootState) => state.dept.department

// Reducer
export default deptSlice.reducer
