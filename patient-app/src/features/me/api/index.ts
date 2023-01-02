/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi, makeApiForm } from 'libs/core/configureAxios'

import { SendCodeFormInput, LoginOrRegisterFormInput } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const apiForm = makeApiForm(`${Env.API_BASE_URL}`)
const USER_BASE_URL = `/user`

export const sendCode = (form: SendCodeFormInput): Promise<any> =>
  api.post(`${USER_BASE_URL}/sendCode`, form)

export const loginOrRegister = (form: LoginOrRegisterFormInput): Promise<any> =>
  api.post(`${USER_BASE_URL}/loginOrRegister`, form)

export const uploadPatientPhoto = (form: FormData): Promise<string> =>
  apiForm.post(`${USER_BASE_URL}/updatePhoto`, form)

export const validate = (): Promise<any> => api.get(`${USER_BASE_URL}/validate`)
