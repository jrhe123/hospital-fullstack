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
  //
  CreateDeptSubResponse,
  SearchDeptSubFormInput,
  CreateDeptSubFormInput,
  FetchDeptSubFormInput,
  UpdateDeptSubFormInput,
  DeleteDeptSubFormInput,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const DEPARTMENT_BASE_URL = `/medical/dept`
const DEPT_SUB_BASE_URL = `/medical/dept/sub`

export const searchDepartments = (form: SearchDeptFormInput): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchDeptByPage`, form)

export const createDept = (form: CreateDeptFormInput): Promise<CreateDeptResponse> =>
  api.post(`${DEPARTMENT_BASE_URL}/insert`, form)

export const fetchDept = (form: FetchDeptFormInput): Promise<Department> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchById`, form)

export const updateDept = (form: UpdateDeptFormInput): Promise<any> =>
  api.patch(`${DEPARTMENT_BASE_URL}/update`, form)

export const deleteDept = (form: DeleteDeptFormInput): Promise<any> =>
  api.post(`${DEPARTMENT_BASE_URL}/deleteByIds`, form)

// Dept Sub
export const searchDeptSubs = (form: SearchDeptSubFormInput): Promise<DeptSubPageUtil> =>
  api.post(`${DEPT_SUB_BASE_URL}/searchByPage`, form)

export const createDeptSub = (form: CreateDeptSubFormInput): Promise<CreateDeptSubResponse> =>
  api.post(`${DEPT_SUB_BASE_URL}/insert`, form)

export const fetchDeptSub = (form: FetchDeptSubFormInput): Promise<Department> =>
  api.post(`${DEPT_SUB_BASE_URL}/searchById`, form)

export const updateDeptSub = (form: UpdateDeptSubFormInput): Promise<any> =>
  api.patch(`${DEPT_SUB_BASE_URL}/update`, form)

export const deleteDeptSub = (form: DeleteDeptSubFormInput): Promise<any> =>
  api.post(`${DEPT_SUB_BASE_URL}/deleteByIds`, form)
