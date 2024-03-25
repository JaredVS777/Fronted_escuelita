import React from 'react'
import { useParams } from 'react-router-dom'
import FomularioReserva from '../../components/Forms/FomularioReserva'

const ActualizarReserva = () => {
    const {id} = useParams()

    return (
        <div className="p-5 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-4">Actualizar auditorios</h1>
            <span className="font-medium text-gray-500 mb-8">Actualiza la información de una auditorio</span>
            <FomularioReserva reservaID={id} textBtn={"Actualizar reserva"}/>
        </div>
    )
}

export default ActualizarReserva