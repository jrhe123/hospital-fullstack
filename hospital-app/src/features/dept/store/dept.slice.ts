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
  CreateDeptSubResponse,
  SearchDeptSubFormInput,
  CreateDeptSubFormInput,
  FetchDeptSubFormInput,
  UpdateDeptSubFormInput,
  DeleteDeptSubFormInput,
} from 'features/dept/types'
import type { RootState } from 'store/store'

export interface DeptState {
  isLoading: boolean
  totalCount: number
  totalPage: number
  //
  departmentList: Department[]
  department: Department | null
  //
  deptSubList: DeptSub[]
  deptSub: DeptSub | null
  //
  errors?: Error[]
}

const initialState: DeptState = {
  isLoading: false,
  totalCount: 0,
  totalPage: 0,
  //
  departmentList: [],
  department: null,
  //
  deptSubList: [],
  deptSub: null,
  //
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
    // create dept sub
    createDeptSubRequest(state, action: PayloadAction<CreateDeptSubFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    createDeptSubSucceeded(state, action: PayloadAction<CreateDeptSubResponse>) {
      state.isLoading = false
      state.deptSubList.unshift(action.payload.data)
      state.totalCount += 1
    },
    createDeptSubFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // fetch dept sub
    fetchDeptSubDetailRequest(state, action: PayloadAction<FetchDeptSubFormInput>) {
      state.isLoading = true
      state.deptSub = null
      state.errors = []
    },
    fetchDeptSubDetailSucceeded(state, action: PayloadAction<DeptSub>) {
      state.isLoading = false
      state.deptSub = action.payload
    },
    fetchDeptSubDetailFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // update dept sub
    updateDeptSubRequest(state, action: PayloadAction<UpdateDeptSubFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    updateDeptSubSucceeded(state, action: PayloadAction<DeptSub>) {
      state.isLoading = false
      state.deptSub = action.payload
    },
    updateDeptSubFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // delete dept sub
    deleteDeptSubRequest(state, action: PayloadAction<DeleteDeptSubFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    deleteDeptSubSucceeded(state, action: PayloadAction<number[]>) {
      state.isLoading = false
      const filterDeptSubList = state.deptSubList.filter(
        item => action.payload.indexOf(item.id) === -1,
      )
      const reducedCount = state.deptSubList.length - filterDeptSubList.length
      state.deptSubList = filterDeptSubList
      state.totalCount -= Math.max(reducedCount, 0)
    },
    deleteDeptSubFailed(state, action: PayloadAction<Error[]>) {
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
  // ============= Dept Sub =============
  // fetch deptSub list
  fetchDeptSubRequest: deptSlice.actions.fetchDeptSubRequest,
  fetchDeptSubSucceeded: deptSlice.actions.fetchDeptSubSucceeded,
  fetchDeptSubFailed: deptSlice.actions.fetchDeptSubFailed,
  // create dept sub
  createDeptSubRequest: deptSlice.actions.createDeptSubRequest,
  createDeptSubSucceeded: deptSlice.actions.createDeptSubSucceeded,
  createDeptSubFailed: deptSlice.actions.createDeptSubFailed,
  // fetch dept sub
  fetchDeptSubDetailRequest: deptSlice.actions.fetchDeptSubDetailRequest,
  fetchDeptSubDetailSucceeded: deptSlice.actions.fetchDeptSubDetailSucceeded,
  fetchDeptSubDetailFailed: deptSlice.actions.fetchDeptSubDetailFailed,
  // update dept sub
  updateDeptSubRequest: deptSlice.actions.updateDeptSubRequest,
  updateDeptSubSucceeded: deptSlice.actions.updateDeptSubSucceeded,
  updateDeptSubFailed: deptSlice.actions.updateDeptSubFailed,
  // delete dept sub
  deleteDeptSubRequest: deptSlice.actions.deleteDeptSubRequest,
  deleteDeptSubSucceeded: deptSlice.actions.deleteDeptSubSucceeded,
  deleteDeptSubFailed: deptSlice.actions.deleteDeptSubFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.dept.isLoading
export const selectTotalCount = (state: RootState) => state.dept.totalCount
export const selectTotalPage = (state: RootState) => state.dept.totalPage
//
export const selectDepartmentList = (state: RootState) => state.dept.departmentList
export const selectDepartment = (state: RootState) => state.dept.department
//
export const selectDeptSubList = (state: RootState) => state.dept.deptSubList
export const selectDeptSub = (state: RootState) => state.dept.deptSub

// Reducer
export default deptSlice.reducer
