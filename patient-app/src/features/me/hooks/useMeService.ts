import { useCallback } from 'react'

import {
  meActions,
  selectIsLoading,
  selectIsLoaded,
  selectIsLogin,
  selectUser,
} from 'features/me/store'
import {
  SendCodeFormInput,
  LoginOrRegisterFormInput,
  UserInfo,
  UploadPatientPhotoFormInput,
  HealthcardFormInput,
} from 'features/me/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type MeServiceOperators = {
  isLoading: boolean
  isLoaded: boolean
  isLogin: boolean
  user: UserInfo | null
  sendCode: (data: SendCodeFormInput) => void
  loginOrRegister: (data: LoginOrRegisterFormInput) => void
  uploadPatientPhoto: (form: UploadPatientPhotoFormInput) => void
  validate: () => void
  updatePatient: (form: HealthcardFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useMeService = (): Readonly<MeServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    isLoaded: useAppSelector(selectIsLoaded),
    isLogin: useAppSelector(selectIsLogin),
    user: useAppSelector(selectUser),
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
    uploadPatientPhoto: useCallback(
      (form: UploadPatientPhotoFormInput) => {
        dispatch(meActions.uploadPatientPhotoRequest(form))
      },
      [dispatch],
    ),
    validate: useCallback(() => {
      dispatch(meActions.validateRequest())
    }, [dispatch]),
    updatePatient: useCallback(
      (form: HealthcardFormInput) => {
        dispatch(meActions.updatePatientRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useMeService
