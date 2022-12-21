/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import { DepartmentPageUtil, DeptSubPageUtil, SearchDeptFormInput } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const DEPARTMENT_BASE_URL = `/medical/dept`

export const searchDepartments = (form: SearchDeptFormInput): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchDeptByPage`, form)

export const searchDeptSubs = (form: SearchDeptFormInput): Promise<DeptSubPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchByPage`, form)
