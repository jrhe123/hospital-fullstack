// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'store/store'

export interface MainState {
  isLoading: boolean
  quickSections: string[]
  errors?: Error[]
}

const initialState: MainState = {
  isLoading: false,
  quickSections: [],
  errors: [],
}

// slice
export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // fetch from local storage quick bar (eg: refresh browser)
    fetchQuickSectionRequest(state) {
      state.isLoading = true
      state.errors = []
    },
    fetchQuickSectionSucceeded(state, action: PayloadAction<string[]>) {
      state.isLoading = false
      state.quickSections = action.payload
    },
    fetchQuickSectionFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // open quick bar
    openQuickSectionRequest(state, action: PayloadAction<string>) {
      state.isLoading = true
      state.errors = []
    },
    openQuickSectionSucceeded(state, action: PayloadAction<string>) {
      state.isLoading = false
      if (state.quickSections.indexOf(action.payload) === -1) {
        state.quickSections.unshift(action.payload)
      }
    },
    openQuickSectionFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // close quick bar
    closeQuickSectionRequest(state, action: PayloadAction<string>) {
      state.isLoading = true
      state.errors = []
    },
    closeQuickSectionSucceeded(state, action: PayloadAction<string>) {
      state.isLoading = false
      const index = state.quickSections.indexOf(action.payload)
      if (index !== -1) {
        state.quickSections.splice(index, 1)
      }
    },
    closeQuickSectionFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const mainActions = {
  // fetch quick section
  fetchQuickSectionRequest: mainSlice.actions.fetchQuickSectionRequest,
  fetchQuickSectionSucceeded: mainSlice.actions.fetchQuickSectionSucceeded,
  fetchQuickSectionFailed: mainSlice.actions.fetchQuickSectionFailed,
  // open quick section
  openQuickSectionRequest: mainSlice.actions.openQuickSectionRequest,
  openQuickSectionSucceeded: mainSlice.actions.openQuickSectionSucceeded,
  openQuickSectionFailed: mainSlice.actions.openQuickSectionFailed,
  // close quick section
  closeQuickSectionRequest: mainSlice.actions.closeQuickSectionRequest,
  closeQuickSectionSucceeded: mainSlice.actions.closeQuickSectionSucceeded,
  closeQuickSectionFailed: mainSlice.actions.closeQuickSectionFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.main.isLoading
export const selectQuickSections = (state: RootState) => state.main.quickSections

// Reducer
export default mainSlice.reducer
