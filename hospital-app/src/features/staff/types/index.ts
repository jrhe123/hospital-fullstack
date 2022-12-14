export enum Sex {
  MALE = 'male',
  FEMALE = 'femal',
  UNISEX = 'unisex',
}

export enum Degree {
  BACHELOR = 'bachelor',
  MASTER = 'master',
  PHD = 'phd',
}

export enum Occupation {
  SPECIALIST = 'specialist',
  VICE_SPECIALIST = 'vice-specialist',
  DIRECTOR = 'director',
  VICE_DIRECTOR = 'vice-director',
}

type Order = 'asc' | 'desc'

// ========ENUM========

export type SearchDoctorFormInput = {
  page: number
  length: number
  status: number
  // search fields
  name?: string
  deptId?: number | string
  degreeId?: number | string
  degree?: Degree | string
  jobId?: number | string
  job?: Occupation | string
  recommendedId?: number | string
  recommended?: boolean | string
  // sort fields
  order?: Order
}

export type FetchDoctorDetailFormInput = {
  id: number
}

export type UploadDoctorPhotoFormInput = {
  doctorId: string
  file: File
}

export type CreateDoctorFormInput = {
  name: string
  pid: string
  sex: Sex
  birthday: Date
  school: string
  degree: Degree
  tel: string
  address: string
  email: string
  job: Occupation
  remark: string
  description: string
  hiredate: Date
  tag: string[]
  recommended: boolean
  status: number
  subId: number
}

export type Doctor = {
  deptName: string
  school: string
  subName: string
  sex: string
  name: string
  degree: string
  tel: string
  id: number
  job: string
  recommended: boolean
  status: number
  action?: string
}

export type Department = {
  id: number
  name: string
}

export type DepartmentPageUtil = {
  result: boolean
  list: Department[]
}

export type DoctorPageUtil = {
  result: boolean
  pageUtil: {
    totalCount: number
    pageSize: number
    totalPage: number
    pageIndex: number
    list: Doctor[]
  }
}

export type DoctorDetail = {
  birthday: Date
  address: string
  photo: string
  description: string
  pid: string
  remark: string
  tag: string[]
  uuid: string
  hiredate: Date
  email: string
}

export type CreateDoctorResponse = {
  result: boolean
  data: Doctor
}
