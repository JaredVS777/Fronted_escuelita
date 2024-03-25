import React from 'react'
import FomularioReserva from '../../components/Forms/FomularioReserva'


const AgregarReserva = () => {
  return (
    <div className="p-5 flex flex-col h-screnn">
        <h1 className=" text-2xl font-bold mb-4">Registar reservas</h1>
        <span className="font-medium text-gray-500 mb-8">Registra una reserva</span>
        <FomularioReserva textBtn={"Registrar reserva"}/>
    </div>
  )
}

export default AgregarReserva