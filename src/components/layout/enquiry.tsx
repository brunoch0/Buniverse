import { createContext, useContext } from 'react'

/** Opens the global enquiry modal from anywhere in the tree. */
export const EnquiryContext = createContext<() => void>(() => {})

// eslint-disable-next-line react-refresh/only-export-components
export function useEnquiry(): () => void {
  return useContext(EnquiryContext)
}
