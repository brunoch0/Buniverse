import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Membership } from './pages/Membership'
import { Tour } from './pages/Tour'
import { Investment } from './pages/Investment'
import { Premium } from './pages/Premium'
import { Partner } from './pages/Partner'
import { Community } from './pages/Community'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/community" element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
