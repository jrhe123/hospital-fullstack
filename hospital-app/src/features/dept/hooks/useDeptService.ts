import { useCallback } from 'react'

import {
  deptActions,
  selectIsLoading,
  selectTotalCount,
  selectTotalPage,
  selectDepartmentList,
  selectDeptSubList,
} from 'features/dept/store'
import { Department, DeptSub, SearchDeptFormInput } from 'features/dept/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type DeptServiceOperators = {
  isLoading: boolean
  //
  departmentList: Department[]
  deptSubList: DeptSub[]
  totalCount: number
  totalPage: number
  fetchDepartments: (form: SearchDeptFormInput) => void
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
    departmentList: useAppSelector(selectDepartmentList),
    deptSubList: useAppSelector(selectDeptSubList),
    totalCount: useAppSelector(selectTotalCount),
    totalPage: useAppSelector(selectTotalPage),
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
  }
}

export default useDeptService
