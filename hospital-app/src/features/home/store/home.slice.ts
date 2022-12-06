// DUCKS pattern
import { createAction, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Todo, GetTodoFormInput } from 'features/home/types'
import type { RootState } from 'store/store'

export interface HomeState {
  isLoading: boolean
  todos: Todo[]
  errors?: Error[]
}

const initialState: HomeState = {
  isLoading: false,
  todos: [],
  errors: [],
}

// slice
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // get todos
    getTodosRequest(state, action: PayloadAction<GetTodoFormInput>) {
      state.isLoading = true
      state.errors = []
    },
    getTodosSucceeded(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
      state.isLoading = false
    },
    getTodosFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false
      state.errors = action.payload
    },
  },
})

// Actions
export const homeActions = {
  // get todos
  getTodosRequest: homeSlice.actions.getTodosRequest,
  getTodosSucceeded: homeSlice.actions.getTodosSucceeded,
  getTodosFailed: homeSlice.actions.getTodosFailed,
}

// Selectors
export const selectIsLoading = (state: RootState) => state.home.isLoading
export const selectTodos = (state: RootState) => state.home.todos

// Reducer
export default homeSlice.reducer
