import { useCallback } from 'react'

import { homeActions, selectIsLoading, selectTodos } from 'features/home/store'
import { Todo, GetTodoFormInput } from 'features/home/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type TodoServiceOperators = {
  isLoading: boolean
  todos: Todo[]
  getTodos: (form: GetTodoFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useHomeService = (): Readonly<TodoServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    todos: useAppSelector(selectTodos),
    getTodos: useCallback(
      (form: GetTodoFormInput) => {
        dispatch(homeActions.getTodosRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useHomeService
