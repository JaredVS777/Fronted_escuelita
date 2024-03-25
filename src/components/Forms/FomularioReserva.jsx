import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FomularioReserva = ({reservaID, textBtn}) => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombreauditorio: "",
        conferencista: ""
    })

    const [auditorios, setauditorios] = useState([])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(()=>{
        const obtenerauditorios = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auditorios/listar`)
                setauditorios(response.data)
            }catch(error){
                console.log(error)
            }
        }
        obtenerauditorios()   
    }, [])

    useEffect(() => {
        const obtenerreserva = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reservas/mostrar/${reservaID}`)
                const reserva = response.data
                setForm({
                    conferencista: reserva.conferencista ?? "",
                    nombreauditorio: reserva.nombreauditorio ?? ""
                })
            }catch(error){
                console.log(error)
            }
        }
        if(reservaID){
            obtenerreserva()
        }
    },[reservaID])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            let response
            if(reservaID){
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/reservas/actualizar/${reservaID}`, form)
                console.log("actualizion exitosa")
            }else{
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reservas/register`, form)
                console.log("registro exitoso")
            }
            if(response.status == 201 || response.status == 200){
                navigate('/dashboard/reservas')
            }
        }catch(error){
            console.log(form)
            console.log(error.data)
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4">
        <form onSubmit={handleSubmit} className="col-span-3">
            <div className="flex flex-col space-y-4">
                <label htmlFor="conferencista" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre del conferencista</label>
                <input
                    type="text"
                    id="conferencista"
                    className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingrese el nombre completo del conferencista"
                    required
                    name="conferencista"
                    onChange={handleChange}
                    value={form.conferencista}
                />
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                    <label htmlFor="auditorios" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una auditorio</label>
                        <select
                            id="nombreauditorio"
                            className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="nombreauditorio" 
                            onChange={handleChange} 
                            value={form.nombreauditorio}
                        >
                            <option>auditorios Disponibles</option>
                            {auditorios && auditorios.length > 0 ? (
                                auditorios.map((auditorio) => (
                                    <option key={auditorio._id} value={auditorio.nombreauditorio}>
                                        {auditorio.nombreauditorio}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No existen auditorios registradas</option>
                            )}
                        </select>

                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm sm:w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {textBtn}
            </button>
        </form>
    </div>
    )
}

export default FomularioReserva