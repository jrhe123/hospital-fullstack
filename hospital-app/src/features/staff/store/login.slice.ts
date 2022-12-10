// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { User, LoginFormInput, UserInfo } from 'features/login/types'
import type { RootState } from 'store/store'

export interface LoginState {
  isLoaded: boolean
  isLoading: boolean
  isAuth: boolean
  user: User | null
  permissions: string[]
  errors?: Error[]
}

const initialState: LoginState = {
  isLoaded: false,
  isLoading: false,
  isAuth: false,
  user: null,
  permissions: [],
  errors: [],
}

// slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // login
    loginRequest(state, action: PayloadAction<LoginFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    loginSucceeded(state, action: PayloadAction<UserInfo>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload.user
      state.permissions = action.payload.permissions
    },
    loginFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.isAuth = false
      state.user = null
      state.permissions = []
      state.errors = action.payload
    },
    // logout
    logoutRequest(state) {
      state.isLoading = true
      state.errors = []
    },
    logoutSucceeded(state) {
      state.isLoading = false
      state.isAuth = false
      state.user = null
      state.permissions = []
    },
    logoutFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.isAuth = false
      state.user = null
      state.permissions = []
      state.errors = action.payload
    },
    // validate
    validateRequest(state) {
      state.isLoaded = false
      state.isLoading = true
      state.errors = []
    },
    validateSucceeded(state, action: PayloadAction<UserInfo>) {
      state.isLoaded = true
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload.user
      state.permissions = action.payload.permissions
    },
    validateFailed(state, action: PayloadAction<Error[]>) {
      state.isLoaded = true
      state.isLoading = false
      state.isAuth = false
      state.user = null
      state.permissions = []
      state.errors = action.payload
    },
  },
})

// Actions
export const loginActions = {
  // login
  loginRequest: loginSlice.actions.loginRequest,
  loginSucceeded: loginSlice.actions.loginSucceeded,
  loginFailed: loginSlice.actions.loginFailed,
  // logout
  logoutRequest: loginSlice.actions.logoutRequest,
  logoutSucceeded: loginSlice.actions.logoutSucceeded,
  logoutFailed: loginSlice.actions.logoutFailed,
  // validate
  validateRequest: loginSlice.actions.validateRequest,
  validateSucceeded: loginSlice.actions.validateSucceeded,
  validateFailed: loginSlice.actions.validateFailed,
}

// Selectors
export const selectIsLoaded = (state: RootState) => state.login.isLoaded
export const selectIsLoading = (state: RootState) => state.login.isLoading
export const selectIsAuth = (state: RootState) => state.login.isAuth
export const selectUser = (state: RootState) => state.login.user
export const selectPermissions = (state: RootState) => state.login.permissions

// Reducer
export default loginSlice.reducer
