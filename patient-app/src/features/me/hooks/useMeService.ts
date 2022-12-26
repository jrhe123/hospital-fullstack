import { useCallback } from 'react'

import { meActions, selectIsLoading, selectIsLogin } from 'features/me/store'
import { SendCodeFormInput, LoginOrRegisterFormInput } from 'features/me/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type MeServiceOperators = {
  isLoading: boolean
  isLogin: boolean
  sendCode: (data: SendCodeFormInput) => void
  loginOrRegister: (data: LoginOrRegisterFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useMeService = (): Readonly<MeServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    isLogin: useAppSelector(selectIsLogin),
    sendCode: useCallback(
      (form: SendCodeFormInput) => {
        dispatch(meActions.sendCodeRequest(form))
      },
      [dispatch],
    ),
    loginOrRegister: useCallback(
      (form: LoginOrRegisterFormInput) => {
        dispatch(meActions.loginOrRegisterRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useMeService
