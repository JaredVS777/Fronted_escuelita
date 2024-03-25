import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './layout/Dashboard'

import Listarconferencista from './pages/conferencistas/ListarConferencistas'
import AgregarConferencista from './pages/conferencistas/AgregarConferencista'
import ActualizarConferencista from './pages/conferencistas/ActualizarConferencista'

import Listarauditorios from './pages/auditorios/ListarAuditorios'
import AgregarAuditorio from './pages/auditorios/AgregarAuditorio'
import ActualizarAuditorio from './pages/auditorios/ActualizarAuditorio'

import Listarreservas from './pages/reservas/ListarReservas'
import AgregarReserva from './pages/reservas/AgregarReserva'
import ActualizarReserva from './pages/reservas/ActualizarReserva'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard/" element={<Dashboard />} >
          <Route path='conferencista/' element={<Listarconferencista/>}/>

          <Route path='conferencista/agregar-conferencista' element={<AgregarConferencista/>}/>
          <Route path='conferencista/actualizar-conferencista/:id' element={<ActualizarConferencista/>}/>

          <Route path='auditorios' element={<Listarauditorios/>}/>
          <Route path='auditorios/agregar-auditorio' element={<AgregarAuditorio/>}/>
          <Route path='auditorios/actualizar-auditorio/:id' element={<ActualizarAuditorio/>}/>

          <Route path='reservas' element={<Listarreservas/>}/>
          <Route path='reservas/agregar-reserva' element={<AgregarReserva/>}/>
          <Route path='reservas/actualizar-reserva/:id' element={<ActualizarReserva/>}/>
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
