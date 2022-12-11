/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import makeApi from 'libs/core/configureAxios'

import { SearchDoctorFormInput, DepartmentPageUtil, DoctorPageUtil } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const DOCTOR_BASE_URL = `/doctor`
const DEPARTMENT_BASE_URL = `/medical/dep`

export const searchDepartments = (): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchAll`)

export const searchDoctors = (form: SearchDoctorFormInput): Promise<DoctorPageUtil> =>
  api.post(`${DOCTOR_BASE_URL}/searchByPage`, form)
