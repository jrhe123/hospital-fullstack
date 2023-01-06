import { useCallback } from 'react'

import { diagnosisActions, selectIsLoading, selectWorkPlanDeptList } from 'features/diagnosis/store'
import { SearchWorkPlanFormInput, DiagnosisDept } from 'features/diagnosis/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type DiagnosisServiceOperators = {
  isLoading: boolean
  workPlanDeptList: DiagnosisDept[]
  //
  fetchWorkPlanDepts: (form: SearchWorkPlanFormInput) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useDiagnosisService = (): Readonly<DiagnosisServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    workPlanDeptList: useAppSelector(selectWorkPlanDeptList),
    //
    fetchWorkPlanDepts: useCallback(
      (from: SearchWorkPlanFormInput) => {
        dispatch(diagnosisActions.fetchWorkPlanDeptRequest(from))
      },
      [dispatch],
    ),
  }
}

export default useDiagnosisService
