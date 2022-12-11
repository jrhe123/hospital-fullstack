export type SearchDoctorFormInput = {
  page: number
  length: number
  status: number
  // search fields
  name?: string | null
  deptId?: number | null
  degree?: string | null
  job?: string | null
  recommended?: boolean | null
  // sort fields
  order?: string | null
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
