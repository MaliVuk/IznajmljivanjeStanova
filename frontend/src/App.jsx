import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import NajmodavacPregled from './pages/Najmodavac/NajmodavacPregled'
import NajmodavacDodaj from './pages/Najmodavac/NajmodavacDodaj' // ✅ OVAJ import
import NajmodavacPromjena from './pages/Najmodavac/NajmodavacPromjena'
import ERA from './pages/ERA'

function App() {
  return (
    <Container>
      <NavBarEdunova />

      <Container className="app">
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.NAJMODAVAC_PREGLED} element={<NajmodavacPregled />} />
          <Route path={RouteNames.NAJMODAVAC_NOVI} element={<NajmodavacDodaj />} /> {/* ✅ OVA ruta MORA biti ovdje */}
          <Route path={RouteNames.NAJMODAVAC_PROMJENA} element={<NajmodavacPromjena />} /> {/* ✅ OVA ruta MORA biti ovdje */}
          
          <Route path={RouteNames.ERA} element={<ERA />} />
        </Routes>
      </Container>

      <hr />
      &copy; IznajmljivanjeStanova
    </Container>
  )
}

export default App