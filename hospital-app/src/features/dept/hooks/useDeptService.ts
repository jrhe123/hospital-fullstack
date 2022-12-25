import { useCallback } from 'react'

import {
  deptActions,
  selectIsLoading,
  selectTotalCount,
  selectTotalPage,
  selectDepartmentList,
  selectDepartment,
  //
  selectDeptSubList,
} from 'features/dept/store'
import {
  Department,
  SearchDeptFormInput,
  CreateDeptFormInput,
  FetchDeptFormInput,
  UpdateDeptFormInput,
  DeleteDeptFormInput,
  //
  DeptSub,
  SearchDeptSubFormInput,
} from 'features/dept/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type DeptServiceOperators = {
  isLoading: boolean
  //
  totalCount: number
  totalPage: number
  departmentList: Department[]
  department: Department | null
  //
  deptSubList: DeptSub[]
  //
  fetchDepartments: (form: SearchDeptFormInput) => void
  createDept: (form: CreateDeptFormInput) => void
  fetchDept: (form: FetchDeptFormInput) => void
  updateDept: (form: UpdateDeptFormInput) => void
  deleteDept: (form: DeleteDeptFormInput) => void
  //
  fetchDeptSubs: (form: SearchDeptFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useDeptService = (): Readonly<DeptServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    totalCount: useAppSelector(selectTotalCount),
    totalPage: useAppSelector(selectTotalPage),
    //
    departmentList: useAppSelector(selectDepartmentList),
    department: useAppSelector(selectDepartment),
    //
    deptSubList: useAppSelector(selectDeptSubList),
    //
    fetchDepartments: useCallback(
      (form: SearchDeptFormInput) => {
        dispatch(deptActions.fetchDepartmentRequest(form))
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
    //
    fetchDeptSubs: useCallback(
      (form: SearchDeptSubFormInput) => {
        dispatch(deptActions.fetchDeptSubRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useDeptService
