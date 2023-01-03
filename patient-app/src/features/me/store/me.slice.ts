// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import {
  SendCodeFormInput,
  LoginOrRegisterFormInput,
  UploadPatientPhotoFormInput,
  UserInfo,
  HealthcardFormInput,
} from 'features/me/types'
import type { RootState } from 'store/store'

export interface MeState {
  isLoading: boolean
  isLoaded: boolean
  isLogin: boolean
  user: UserInfo | null
  errors?: Error[]
}

const initialState: MeState = {
  isLoading: false,
  isLoaded: false,
  isLogin: false,
  user: null,
  errors: [],
}

// slice
export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    // send code
    sendCodeRequest(state, action: PayloadAction<SendCodeFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    sendCodeSucceeded(state) {
      state.isLoading = false
    },
    sendCodeFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // login / register
    loginOrRegisterRequest(state, action: PayloadAction<LoginOrRegisterFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    loginOrRegisterSucceeded(state, action: PayloadAction<UserInfo>) {
      state.isLoading = false
      state.isLogin = true
      state.user = action.payload
    },
    loginOrRegisterFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.isLogin = false
      state.user = null
      state.errors = action.payload
    },
    // upload patient photo
    uploadPatientPhotoRequest(state, action: PayloadAction<UploadPatientPhotoFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    uploadPatientPhotoSucceeded(state, action: PayloadAction<string>) {
      state.isLoading = false
      if (state.user) {
        state.user.photo = action.payload
      }
    },
    uploadPatientPhotoFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
    // validate
    validateRequest(state) {
      state.isLoading = true
      state.errors = []
    },
    validateSucceeded(state, action: PayloadAction<UserInfo>) {
      state.isLoading = false
      state.isLoaded = true
      state.isLogin = true
      state.user = action.payload
    },
    validateFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.isLoaded = true
      state.isLogin = false
      state.user = null
      state.errors = action.payload
    },
    // update patient
    updatePatientRequest(state, action: PayloadAction<HealthcardFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    updatePatientSucceeded(state, action: PayloadAction<UserInfo>) {
      state.isLoading = false
      state.user = action.payload
    },
    updatePatientFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const meActions = {
  // send code
  sendCodeRequest: meSlice.actions.sendCodeRequest,
  sendCodeSucceeded: meSlice.actions.sendCodeSucceeded,
  sendCodeFailed: meSlice.actions.sendCodeFailed,
  // login / register
  loginOrRegisterRequest: meSlice.actions.loginOrRegisterRequest,
  loginOrRegisterSucceeded: meSlice.actions.loginOrRegisterSucceeded,
  loginOrRegisterFailed: meSlice.actions.loginOrRegisterFailed,
  // upload patient photo
  uploadPatientPhotoRequest: meSlice.actions.uploadPatientPhotoRequest,
  uploadPatientPhotoSucceeded: meSlice.actions.uploadPatientPhotoSucceeded,
  uploadPatientPhotoFailed: meSlice.actions.uploadPatientPhotoFailed,
  // validate
  validateRequest: meSlice.actions.validateRequest,
  validateSucceeded: meSlice.actions.validateSucceeded,
  validateFailed: meSlice.actions.validateFailed,
  // update patient
  updatePatientRequest: meSlice.actions.updatePatientRequest,
  updatePatientSucceeded: meSlice.actions.updatePatientSucceeded,
  updatePatientFailed: meSlice.actions.updatePatientFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.me.isLoading
export const selectIsLoaded = (state: RootState) => state.me.isLoaded
export const selectIsLogin = (state: RootState) => state.me.isLogin
export const selectUser = (state: RootState) => state.me.user

// Reducer
export default meSlice.reducer
