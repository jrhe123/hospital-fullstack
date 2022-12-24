/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import {
  Department,
  DepartmentPageUtil,
  DeptSubPageUtil,
  CreateDeptResponse,
  SearchDeptFormInput,
  CreateDeptFormInput,
  FetchDeptFormInput,
  UpdateDeptFormInput,
  DeleteDeptFormInput,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const DEPARTMENT_BASE_URL = `/medical/dept`

export const searchDepartments = (form: SearchDeptFormInput): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchDeptByPage`, form)

export const searchDeptSubs = (form: SearchDeptFormInput): Promise<DeptSubPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchByPage`, form)

export const createDept = (form: CreateDeptFormInput): Promise<CreateDeptResponse> =>
  api.post(`${DEPARTMENT_BASE_URL}/insert`, form)

export const fetchDept = (form: FetchDeptFormInput): Promise<Department> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchById`, form)

export const updateDept = (form: UpdateDeptFormInput): Promise<any> =>
  api.patch(`${DEPARTMENT_BASE_URL}/update`, form)

export const deleteDept = (form: DeleteDeptFormInput): Promise<any> =>
  api.post(`${DEPARTMENT_BASE_URL}/deleteByIds`, form)
