import { useCallback } from 'react'

import {
  loginActions,
  selectIsLoaded,
  selectIsLoading,
  selectIsAuth,
  selectUser,
  selectPermissions,
} from 'features/login/store'
import { User, LoginFormInput } from 'features/login/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type LoginServiceOperators = {
  isLoaded: boolean
  isLoading: boolean
  isAuth: boolean
  user: User | null
  permissions: string[]
  login: (form: LoginFormInput) => void
  logout: () => void
  validate: () => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useLoginService = (): Readonly<LoginServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoaded: useAppSelector(selectIsLoaded),
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
    logout: useCallback(() => {
      dispatch(loginActions.logoutRequest())
    }, [dispatch]),
    validate: useCallback(() => {
      dispatch(loginActions.validateRequest())
    }, [dispatch]),
  }
}

export default useLoginService
