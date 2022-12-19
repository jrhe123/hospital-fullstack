export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
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

export type FetchDoctorFullDetailFormInput = {
  id: number
}

export type UploadDoctorPhotoFormInput = {
  doctorId: string
  file: File
}

export type CreateDoctorFormInput = {
  name: string
  pid: string
  sex: Sex | string
  sexId?: number | string
  birthday: Date | string
  school: string
  degree: Degree | string
  degreeId?: number | string
  tel: string
  address: string
  email: string
  job: Occupation | string
  jobId?: number | string
  remark: string
  description: string
  hiredate: Date | string
  tag: string[]
  tagStr?: string
  recommended: boolean
  recommendedId?: number | string
  status: number
  subId: number | string
}

export type UpdateDoctorFormInput = {
  id: number
} & CreateDoctorFormInput

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

export type DoctorFullDetail = {
  birthday: Date
  deptName: string
  address: string
  sex: Sex
  degree: Degree
  description: string
  pid: string
  remark: string
  uuid: string
  hiredate: Date
  recommended: true
  deptSubId: number
  school: string
  subName: string
  name: string
  tel: string
  id: number
  tag: string[]
  job: Occupation
  email: string
  status: number
}

export type CreateDoctorResponse = {
  result: boolean
  data: Doctor
}

type DeptAndSub = {
  subId: number
  subName: string
}
export type SearchDeptAndSubResponse = Record<string, DeptAndSub[]>
