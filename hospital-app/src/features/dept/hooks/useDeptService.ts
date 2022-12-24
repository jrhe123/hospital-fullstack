import { useCallback } from 'react'

import {
  deptActions,
  selectIsLoading,
  selectTotalCount,
  selectTotalPage,
  selectDepartmentList,
  selectDeptSubList,
  selectDepartment,
} from 'features/dept/store'
import {
  Department,
  DeptSub,
  SearchDeptFormInput,
  CreateDeptFormInput,
  FetchDeptFormInput,
  UpdateDeptFormInput,
  DeleteDeptFormInput,
} from 'features/dept/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type DeptServiceOperators = {
  isLoading: boolean
  //
  departmentList: Department[]
  deptSubList: DeptSub[]
  totalCount: number
  totalPage: number
  department: Department | null
  fetchDepartments: (form: SearchDeptFormInput) => void
  fetchDeptSubs: (form: SearchDeptFormInput) => void
  createDept: (form: CreateDeptFormInput) => void
  fetchDept: (form: FetchDeptFormInput) => void
  updateDept: (form: UpdateDeptFormInput) => void
  deleteDept: (form: DeleteDeptFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useDeptService = (): Readonly<DeptServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    departmentList: useAppSelector(selectDepartmentList),
    deptSubList: useAppSelector(selectDeptSubList),
    totalCount: useAppSelector(selectTotalCount),
    totalPage: useAppSelector(selectTotalPage),
    department: useAppSelector(selectDepartment),
    //
    fetchDepartments: useCallback(
      (form: SearchDeptFormInput) => {
        dispatch(deptActions.fetchDepartmentRequest(form))
      },
      [dispatch],
    ),
    fetchDeptSubs: useCallback(
      (form: SearchDeptFormInput) => {
        dispatch(deptActions.fetchDeptSubRequest(form))
      },
      [dispatch],
    ),
    createDept: useCallback(
      (form: CreateDeptFormInput) => {
        dispatch(deptActions.createDeptRequest(form))
      },
      [dispatch],
    ),
    fetchDept: useCallback(
      (form: FetchDeptFormInput) => {
        dispatch(deptActions.fetchDeptRequest(form))
      },
      [dispatch],
    ),
    updateDept: useCallback(
      (form: UpdateDeptFormInput) => {
        dispatch(deptActions.updateDeptRequest(form))
      },
      [dispatch],
    ),
    deleteDept: useCallback(
      (form: DeleteDeptFormInput) => {
        dispatch(deptActions.deleteDeptRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useDeptService
