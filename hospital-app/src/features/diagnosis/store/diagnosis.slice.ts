// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  SearchWorkPlanFormInput,
  DiagnosisDept,
  DiagnosisDeptPageUtil,
} from 'features/diagnosis/types'
import type { RootState } from 'store/store'

export interface DiagnosisState {
  isLoading: boolean
  workPlanDeptList: DiagnosisDept[]
  errors?: Error[]
}

const initialState: DiagnosisState = {
  isLoading: false,
  // work plan
  workPlanDeptList: [],
  errors: [],
}

// slice
export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    // fetch work plan list
    fetchWorkPlanDeptRequest(state, action: PayloadAction<SearchWorkPlanFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    fetchWorkPlanDeptSucceeded(state, action: PayloadAction<DiagnosisDeptPageUtil>) {
      state.isLoading = false
      state.workPlanDeptList = action.payload.list
    },
    fetchWorkPlanDeptFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const diagnosisActions = {
  // fetch work plan
  fetchWorkPlanDeptRequest: diagnosisSlice.actions.fetchWorkPlanDeptRequest,
  fetchWorkPlanDeptSucceeded: diagnosisSlice.actions.fetchWorkPlanDeptSucceeded,
  fetchWorkPlanDeptFailed: diagnosisSlice.actions.fetchWorkPlanDeptFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.diagnosis.isLoading
export const selectWorkPlanDeptList = (state: RootState) => state.diagnosis.workPlanDeptList

// Reducer
export default diagnosisSlice.reducer
