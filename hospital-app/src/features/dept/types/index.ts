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
  subs: number
  doctors: number
  name: string
  description: string
  id: number
  outpatient: boolean
  recommended: boolean
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
