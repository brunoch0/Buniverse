import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'
import { EnquiryModal } from '../../sections/EnquiryModal'
import { EnquiryContext } from './enquiry'

export function Layout() {
  const [modal, setModal] = useState(false)
  const { pathname } = useLocation()

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <EnquiryContext.Provider value={() => setModal(true)}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <EnquiryModal open={modal} onClose={() => setModal(false)} />
    </EnquiryContext.Provider>
  )
}
