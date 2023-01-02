// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { SendCodeFormInput, LoginOrRegisterFormInput, UserInfo } from 'features/me/types'
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
  // validate
  validateRequest: meSlice.actions.validateRequest,
  validateSucceeded: meSlice.actions.validateSucceeded,
  validateFailed: meSlice.actions.validateFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.me.isLoading
export const selectIsLoaded = (state: RootState) => state.me.isLoaded
export const selectIsLogin = (state: RootState) => state.me.isLogin
export const selectUser = (state: RootState) => state.me.user

// Reducer
export default meSlice.reducer
