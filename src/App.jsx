import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ChampionsPage from './pages/ChampionsPage'
import ChampionDetailPage from './pages/ChampionDetailPage'
import BuildsPage from './pages/BuildsPage'
import ProfilePage from './pages/ProfilePage'
import PWABadge from './components/PWABadge'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="champions" element={<ChampionsPage />} />
          <Route path="champions/:id" element={<ChampionDetailPage />} />
          <Route path="builds" element={<BuildsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <PWABadge />
    </BrowserRouter>
  )
}

export default App
