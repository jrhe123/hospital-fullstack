/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import { SendCodeFormInput, LoginOrRegisterFormInput } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const USER_BASE_URL = `/user`

export const sendCode = (form: SendCodeFormInput): Promise<any> =>
  api.post(`${USER_BASE_URL}/sendCode`, form)

export const loginOrRegister = (form: LoginOrRegisterFormInput): Promise<any> =>
  api.post(`${USER_BASE_URL}/loginOrRegister`, form)
