export type SearchWorkPlanFormInput = {
  startDate: string
  endDate: string
  // search fields
  doctorName?: string
  deptId?: number | string
}

export type DiagnosisDept = {
  deptSubId: number
  deptName: string
  deptSubName: string
  plan: Plan[]
  action?: string
}

export type Plan = {
  date: string
  doctor: string[]
}

export type DiagnosisDeptPageUtil = {
  result: boolean
  list: DiagnosisDept[]
}
