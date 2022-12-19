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
  selectDoctorDetail,
} from 'features/staff/store'
import {
  SearchDoctorFormInput,
  Doctor,
  Department,
  SearchDeptAndSubResponse,
  DoctorDetail,
  DoctorFullDetail,
  FetchDoctorDetailFormInput,
  UploadDoctorPhotoFormInput,
  CreateDoctorFormInput,
  FetchDoctorFullDetailFormInput,
  UpdateDoctorFormInput,
  DeleteDoctorFormInput,
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
  doctorDetail: DoctorFullDetail | null
  fetchDepartments: () => void
  fetchDeptAndSub: () => void
  fetchDoctors: (form: SearchDoctorFormInput) => void
  fetchDoctorDetail: (form: FetchDoctorDetailFormInput) => void
  uploadDoctorPhoto: (form: UploadDoctorPhotoFormInput) => void
  createDoctor: (form: CreateDoctorFormInput) => void
  fetchDoctorFullDetail: (form: FetchDoctorFullDetailFormInput) => void
  updateDoctor: (form: UpdateDoctorFormInput) => void
  deleteDoctor: (form: DeleteDoctorFormInput) => void
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
    doctorDetail: useAppSelector(selectDoctorDetail),
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
    fetchDoctorFullDetail: useCallback(
      (form: FetchDoctorFullDetailFormInput) => {
        dispatch(staffActions.fetchDoctorFullDetailRequest(form))
      },
      [dispatch],
    ),
    updateDoctor: useCallback(
      (form: UpdateDoctorFormInput) => {
        dispatch(staffActions.updateDoctorRequest(form))
      },
      [dispatch],
    ),
    deleteDoctor: useCallback(
      (form: DeleteDoctorFormInput) => {
        dispatch(staffActions.deleteDoctorRequest(form))
      },
      [dispatch],
    ),
  }
}

export default useStaffService
