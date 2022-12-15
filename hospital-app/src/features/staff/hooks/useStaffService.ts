import { useCallback } from 'react'

import {
  staffActions,
  selectIsLoading,
  selectDepartmentList,
  selectDeptAndSubMap,
  //
  selectDoctorList,
  selectTotalCount,
  selectTotalPage,
  selectDoctor,
} from 'features/staff/store'
import {
  SearchDoctorFormInput,
  Doctor,
  Department,
  SearchDeptAndSubResponse,
  DoctorDetail,
  FetchDoctorDetailFormInput,
  UploadDoctorPhotoFormInput,
  CreateDoctorFormInput,
} from 'features/staff/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type StaffServiceOperators = {
  isLoading: boolean
  departmentList: Department[]
  deptAndSubMap: SearchDeptAndSubResponse
  //
  doctorList: Doctor[]
  totalCount: number
  totalPage: number
  doctor: DoctorDetail | null
  fetchDepartments: () => void
  fetchDeptAndSub: () => void
  fetchDoctors: (form: SearchDoctorFormInput) => void
  fetchDoctorDetail: (form: FetchDoctorDetailFormInput) => void
  uploadDoctorPhoto: (form: UploadDoctorPhotoFormInput) => void
  createDoctor: (form: CreateDoctorFormInput) => void
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
    deptAndSubMap: useAppSelector(selectDeptAndSubMap),
    //
    doctorList: useAppSelector(selectDoctorList),
    totalCount: useAppSelector(selectTotalCount),
    totalPage: useAppSelector(selectTotalPage),
    doctor: useAppSelector(selectDoctor),
    fetchDepartments: useCallback(() => {
      dispatch(staffActions.fetchDepartmentRequest())
    }, [dispatch]),
    fetchDeptAndSub: useCallback(() => {
      dispatch(staffActions.fetchDeptAndSubRequest())
    }, [dispatch]),
    //
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
    createDoctor: useCallback(
      (form: CreateDoctorFormInput) => {
        dispatch(staffActions.createDoctorRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useStaffService
