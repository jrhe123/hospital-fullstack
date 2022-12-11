import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'

import { selectIsLoading, selectQuickSections, mainActions } from './main.slice'

export type StaffServiceOperators = {
  isLoading: boolean
  quickSections: string[]
  fetchQuickSection: () => void
  openQuickSectionRequest: (val: string) => void
  closeQuickSectionRequest: (val: string) => void
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
      (val: string) => {
        dispatch(mainActions.openQuickSectionRequest(val))
      },
      [dispatch],
    ),
    closeQuickSectionRequest: useCallback(
      (val: string) => {
        dispatch(mainActions.closeQuickSectionRequest(val))
      },
      [dispatch],
    ),
  }
}

export default useMainService
