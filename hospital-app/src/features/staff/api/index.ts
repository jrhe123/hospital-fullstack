/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi, makeApiForm } from 'libs/core/configureAxios'

import {
  SearchDoctorFormInput,
  FetchDoctorDetailFormInput,
  CreateDoctorFormInput,
  DepartmentPageUtil,
  DoctorPageUtil,
  DoctorDetail,
  CreateDoctorResponse,
} from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const apiForm = makeApiForm(`${Env.API_BASE_URL}`)
const DOCTOR_BASE_URL = `/doctor`
const DEPARTMENT_BASE_URL = `/medical/dept`

export const searchDepartments = (): Promise<DepartmentPageUtil> =>
  api.post(`${DEPARTMENT_BASE_URL}/searchAll`)

export const searchDoctors = (form: SearchDoctorFormInput): Promise<DoctorPageUtil> =>
  api.post(`${DOCTOR_BASE_URL}/searchByPage`, form)

export const fetchDoctorDetail = (form: FetchDoctorDetailFormInput): Promise<DoctorDetail> =>
  api.post(`${DOCTOR_BASE_URL}/searchContent`, form)

export const uploadDoctorPhoto = (form: FormData): Promise<string> =>
  apiForm.post(`${DOCTOR_BASE_URL}/updatePhoto`, form)

export const createDoctor = (form: CreateDoctorFormInput): Promise<CreateDoctorResponse> =>
  apiForm.post(`${DOCTOR_BASE_URL}/insert`, form)
