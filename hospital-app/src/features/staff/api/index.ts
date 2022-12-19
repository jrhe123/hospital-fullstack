/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi, makeApiForm } from 'libs/core/configureAxios'

import {
  SearchDoctorFormInput,
  FetchDoctorDetailFormInput,
  FetchDoctorFullDetailFormInput,
  CreateDoctorFormInput,
  UpdateDoctorFormInput,
  DeleteDoctorFormInput,
  DepartmentPageUtil,
  DoctorPageUtil,
  DoctorDetail,
  DoctorFullDetail,
  CreateDoctorResponse,
  SearchDeptAndSubResponse,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const apiForm = makeApiForm(`${Env.API_BASE_URL}`)
const DOCTOR_BASE_URL = `/doctor`
const DEPARTMENT_BASE_URL = `/medical/dept`

export const searchDepartments = (): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchAll`)

export const searchDepAndSub = (): Promise<SearchDeptAndSubResponse> =>
  api.get(`${DEPARTMENT_BASE_URL}/searchDeptAndSub`)

export const searchDoctors = (form: SearchDoctorFormInput): Promise<DoctorPageUtil> =>
  api.post(`${DOCTOR_BASE_URL}/searchByPage`, form)

export const fetchDoctorDetail = (form: FetchDoctorDetailFormInput): Promise<DoctorDetail> =>
  api.post(`${DOCTOR_BASE_URL}/searchContent`, form)

export const uploadDoctorPhoto = (form: FormData): Promise<string> =>
  apiForm.post(`${DOCTOR_BASE_URL}/updatePhoto`, form)

export const createDoctor = (form: CreateDoctorFormInput): Promise<CreateDoctorResponse> =>
  api.post(`${DOCTOR_BASE_URL}/insert`, form)

export const fetchDoctorFullDetail = (
  form: FetchDoctorFullDetailFormInput,
): Promise<DoctorFullDetail> => api.post(`${DOCTOR_BASE_URL}/searchById`, form)

export const updateDoctor = (form: UpdateDoctorFormInput): Promise<any> =>
  api.patch(`${DOCTOR_BASE_URL}/update`, form)

export const deleteDoctor = (form: DeleteDoctorFormInput): Promise<any> =>
  api.patch(`${DOCTOR_BASE_URL}/deleteByIds`, form)
