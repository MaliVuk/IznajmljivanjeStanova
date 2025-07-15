import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import NajmodavacPregled from './pages/Najmodavac/NajmodavacPregled'


function App() {
  

  return (
    <Container>
      <NavBarEdunova />

      <Container className="app">
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />

          <Route path={RouteNames.NAJMODAVAC_PREGLED} element={<NajmodavacPregled />} />
          
        </Routes>
      </Container>
      
      <hr />
      &copy; IznajmljivanjeStanova
    </Container>
  )
}

export default App