// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { User, LoginFormInput } from 'features/login/types'
import type { RootState } from 'store/store'

export interface LoginState {
  isLoading: boolean
  user: User | null
  errors?: Error[]
}

const initialState: LoginState = {
  isLoading: false,
  user: null,
  errors: [],
}

// slice
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    loginSucceeded(state, action: PayloadAction<User>) {
      state.isLoading = false
      state.user = action.payload
    },
    loginFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.user = null
      state.errors = action.payload
    },
  },
})

// Actions
export const loginActions = {
  // publish article
  loginRequest: loginSlice.actions.loginRequest,
  loginSucceeded: loginSlice.actions.loginSucceeded,
  loginFailed: loginSlice.actions.loginFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.login.isLoading
export const selectUser = (state: RootState) => state.login.user

// Reducer
export default loginSlice.reducer
