import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Properties } from './pages/Properties'
import { PropertyDetail } from './pages/PropertyDetail'
import { Projects } from './pages/Projects'
import { MarketData } from './pages/MarketData'
import { AiCenter } from './pages/AiCenter'
import { Membership } from './pages/Membership'
import { ContentCenter } from './pages/ContentCenter'
import { Community } from './pages/Community'
import { Admin } from './pages/Admin'
import { About } from './pages/About'
import { Tour } from './pages/Tour'
import { TourApply } from './pages/TourApply'
import { Investment } from './pages/Investment'
import { Premium } from './pages/Premium'
import { Partner } from './pages/Partner'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {/* Explore */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/market-data" element={<MarketData />} />
            <Route path="/ai-center" element={<AiCenter />} />
            {/* Membership & content */}
            <Route path="/membership" element={<Membership />} />
            <Route path="/content" element={<ContentCenter />} />
            <Route path="/community" element={<Community />} />
            {/* Ops */}
            <Route path="/admin" element={<Admin />} />
            {/* Supporting */}
            <Route path="/about" element={<About />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/tour/apply" element={<TourApply />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/partner" element={<Partner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
