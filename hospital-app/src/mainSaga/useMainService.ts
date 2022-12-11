import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { selectIsLoading, selectQuickSections, mainActions } from './main.slice'
import { QuickSection } from './types'

export type StaffServiceOperators = {
  isLoading: boolean
  quickSections: QuickSection[]
  fetchQuickSection: () => void
  openQuickSectionRequest: (val: QuickSection) => void
  closeQuickSectionRequest: (val: QuickSection) => void
}

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useMainService = (): Readonly<StaffServiceOperators> => {
  const dispatch = useAppDispatch()
  return {
    isLoading: useAppSelector(selectIsLoading),
    quickSections: useAppSelector(selectQuickSections),
    fetchQuickSection: useCallback(() => {
      dispatch(mainActions.fetchQuickSectionRequest())
    }, [dispatch]),
    openQuickSectionRequest: useCallback(
      (qs: QuickSection) => {
        dispatch(mainActions.openQuickSectionRequest(qs))
      },
      [dispatch],
    ),
    closeQuickSectionRequest: useCallback(
      (qs: QuickSection) => {
        dispatch(mainActions.closeQuickSectionRequest(qs))
      },
      [dispatch],
    ),
  }
}

export default useMainService
