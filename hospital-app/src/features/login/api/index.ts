/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import { LoginFormInput, User } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const USER_BASE_URL = `/mis_user`

export const login = (form: LoginFormInput): Promise<User> =>
  api.post(`${USER_BASE_URL}/login`, form)

export const logout = (): Promise<any> => api.get(`${USER_BASE_URL}/logout`)

export const validate = (): Promise<any> => api.get(`${USER_BASE_URL}/validate`)
