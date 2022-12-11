export type SearchDoctorFormInput = {
  page: number
  length: number
  status: number
  // search fields
  name?: string
  deptId?: number
  degree?: string
  job?: string
  recommended?: boolean
  // sort fields
  order?: string
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
