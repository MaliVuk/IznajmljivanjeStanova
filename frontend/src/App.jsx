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
import Zgrada from './pages/Zgrada'
import NajmoprimacPregled from './pages/Najmoprimac/NajmoprimacPregled'
import NajmoprimacDodaj from './pages/Najmoprimac/NajmoprimacDodaj'
import NajmoprimacPromjena from './pages/Najmoprimac/NajmoprimacPromjena'

function App() {
  return (
    <Container>
      <NavBarEdunova />

      <Container className="app">
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />

          <Route path={RouteNames.NAJMODAVAC_PREGLED} element={<NajmodavacPregled />} />
          <Route path={RouteNames.NAJMODAVAC_NOVI} element={<NajmodavacDodaj />} /> 
          <Route path={RouteNames.NAJMODAVAC_PROMJENA} element={<NajmodavacPromjena />} />


           <Route path={RouteNames.NAJMOPRIMAC_PREGLED} element={<NajmoprimacPregled />} />
          <Route path={RouteNames.NAJMOPRIMAC_NOVI} element={<NajmoprimacDodaj />} /> 
          <Route path={RouteNames.NAJMOPRIMAC_PROMJENA} element={<NajmoprimacPromjena />} />


          <Route path={RouteNames.ZGRADA} element={<Zgrada />} />
          <Route path={RouteNames.ERA} element={<ERA />} />
        </Routes>
      </Container>

      <hr />
      &copy; IznajmljivanjeStanova
    </Container>
  )
}

export default App