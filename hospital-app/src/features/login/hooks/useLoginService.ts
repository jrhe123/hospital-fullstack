import { useCallback } from 'react'

import {
  loginActions,
  selectIsLoading,
  selectIsAuth,
  selectUser,
  selectPermissions,
} from 'features/login/store'
import { User, LoginFormInput } from 'features/login/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type LoginServiceOperators = {
  isLoading: boolean
  isAuth: boolean
  user: User | null
  permissions: string[]
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
    isAuth: useAppSelector(selectIsAuth),
    user: useAppSelector(selectUser),
    permissions: useAppSelector(selectPermissions),
    login: useCallback(
      (form: LoginFormInput) => {
        dispatch(loginActions.loginRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useLoginService
