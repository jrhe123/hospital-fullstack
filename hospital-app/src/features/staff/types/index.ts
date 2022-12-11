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
  order?: string
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
  totalCount: number
  pageSize: number
  totalPage: number
  pageIndex: number
  list: Doctor[]
}
