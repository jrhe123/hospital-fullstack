import { useCallback } from 'react'

import {
  staffActions,
  selectIsLoading,
  selectDepartmentList,
  selectDoctorList,
  selectTotalCount,
  selectTotalPage,
  selectDoctor,
} from 'features/staff/store'
import {
  SearchDoctorFormInput,
  Doctor,
  Department,
  DoctorDetail,
  FetchDoctorDetailFormInput,
  UploadDoctorPhotoFormInput,
} from 'features/staff/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type StaffServiceOperators = {
  isLoading: boolean
  departmentList: Department[]
  doctorList: Doctor[]
  totalCount: number
  totalPage: number
  doctor: DoctorDetail | null
  fetchDepartments: () => void
  fetchDoctors: (form: SearchDoctorFormInput) => void
  fetchDoctorDetail: (form: FetchDoctorDetailFormInput) => void
  uploadDoctorPhoto: (form: UploadDoctorPhotoFormInput) => void
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
    doctor: useAppSelector(selectDoctor),
    fetchDepartments: useCallback(() => {
      dispatch(staffActions.fetchDepartmentRequest())
    }, [dispatch]),
    fetchDoctors: useCallback(
      (form: SearchDoctorFormInput) => {
        dispatch(staffActions.fetchDoctorRequest(form))
      },
      [dispatch],
    ),
    fetchDoctorDetail: useCallback(
      (form: FetchDoctorDetailFormInput) => {
        dispatch(staffActions.fetchDoctorDetailRequest(form))
      },
      [dispatch],
    ),
    uploadDoctorPhoto: useCallback(
      (form: UploadDoctorPhotoFormInput) => {
        dispatch(staffActions.uploadDoctorPhotoRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useStaffService
