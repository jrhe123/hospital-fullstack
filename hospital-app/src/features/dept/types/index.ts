type Order = 'asc' | 'desc'

export type SearchDeptFormInput = {
  page: number
  length: number
  // search fields
  name?: string
  outpatientId?: number | string
  outpatient?: boolean | string
  recommendedId?: number | string
  recommended?: boolean | string
}

export type CreateDeptFormInput = {
  name: string
  description: string
  recommended: boolean
  recommendedId?: number | string
  outpatient: boolean
  outpatientId?: number | string
}

export type FetchDeptFormInput = {
  id: number
}

export type UpdateDeptFormInput = {
  id: number
} & CreateDeptFormInput

export type DeleteDeptFormInput = {
  ids: number[]
}

export type SearchDeptSubFormInput = {
  page: number
  length: number
  // search fields
  name?: string
  deptId?: number | string
  // sort fields
  order?: Order
}

export type CreateDeptSubFormInput = {
  name: string
  deptId: number | string
  location: string
}

export type FetchDeptSubFormInput = {
  id: number
}

export type UpdateDeptSubFormInput = {
  id: number
} & CreateDeptSubFormInput

export type DeleteDeptSubFormInput = {
  ids: number[]
}

export type Department = {
  name: string
  description: string
  id: number
  outpatient: boolean
  recommended: boolean
  action?: string
}

export type DepartmentPageUtil = {
  result: boolean
  pageUtil: {
    totalCount: number
    pageSize: number
    totalPage: number
    pageIndex: number
    list: Department[]
  }
}

export type DeptSub = {
  deptName?: string
  generalDoctors: number
  subName: string
  doctors: number
  location: string
  id: number
  uuid: string
  masterDoctors: number
  action?: string
}

export type DeptSubPageUtil = {
  result: boolean
  pageUtil: {
    totalCount: number
    pageSize: number
    totalPage: number
    pageIndex: number
    list: DeptSub[]
  }
}

export type CreateDeptResponse = {
  result: boolean
  data: Department
}

export type CreateDeptSubResponse = {
  result: boolean
  data: DeptSub
}
