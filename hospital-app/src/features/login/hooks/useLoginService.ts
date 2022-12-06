import { useCallback } from 'react'

import { loginActions, selectIsLoading, selectUser } from 'features/login/store'
import { User, LoginFormInput } from 'features/login/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type LoginServiceOperators = {
  isLoading: boolean
  user: User | null
  login: (form: LoginFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useLoginService = (): Readonly<LoginServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    user: useAppSelector(selectUser),
    login: useCallback(
      (form: LoginFormInput) => {
        dispatch(loginActions.loginRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useLoginService
