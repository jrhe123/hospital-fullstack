import { useCallback } from 'react'

import {
  staffActions,
  selectIsLoading,
  selectDepartmentList,
  selectDoctorList,
  selectTotalCount,
  selectTotalPage,
} from 'features/staff/store'
import { SearchDoctorFormInput, Doctor, Department } from 'features/staff/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type StaffServiceOperators = {
  isLoading: boolean
  departmentList: Department[]
  doctorList: Doctor[]
  totalCount: number
  totalPage: number
  fetchDepartments: () => void
  fetchDoctors: (form: SearchDoctorFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useStaffService = (): Readonly<StaffServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    departmentList: useAppSelector(selectDepartmentList),
    doctorList: useAppSelector(selectDoctorList),
    totalCount: useAppSelector(selectTotalCount),
    totalPage: useAppSelector(selectTotalPage),
    fetchDepartments: useCallback(() => {
      dispatch(staffActions.fetchDepartmentRequest())
    }, [dispatch]),
    fetchDoctors: useCallback(
      (form: SearchDoctorFormInput) => {
        dispatch(staffActions.fetchDoctorRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useStaffService
