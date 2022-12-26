// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { SendCodeFormInput, LoginOrRegisterFormInput } from 'features/me/types'
import type { RootState } from 'store/store'

export interface MeState {
  isLoading: boolean
  isLogin: boolean
  errors?: Error[]
}

const initialState: MeState = {
  isLoading: false,
  isLogin: false,
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
    loginOrRegisterSucceeded(state, action: PayloadAction<boolean>) {
      state.isLoading = false
      state.isLogin = action.payload
    },
    loginOrRegisterFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.isLogin = false
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
}

// Selectors
export const selectIsLoading = (state: RootState) => state.me.isLoading
export const selectIsLogin = (state: RootState) => state.me.isLogin

// Reducer
export default meSlice.reducer
