import {Link} from 'react-router-dom'
import DeleteModal from '../Modals/DeleteModal'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Tablaauditorios = () =>{

    const [auditorios, setauditorios] = useState([])
    
    useEffect(()=>{
        const obtenerauditorios = async() =>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auditorios/listar`)
                setauditorios(response.data)
            }catch(error){
                console.log(error)
            }
        }
        obtenerauditorios()
    }, [])

    const eliminarauditorios = async(auditorioID) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auditorios/eliminar/${auditorioID}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auditorios/listar`)
            setauditorios(response.data)
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Código</th>
                            <th scope="col" className="px-6 py-3">Nombre de la auditorio</th>
                            <th scope="col" className="px-6 py-3">Créditos</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditorios && auditorios.length > 0 ? (
                            auditorios.map((auditorio) => (
                                <tr key={auditorio.codigo} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{auditorio.codigo}</td>
                                    <td className="px-6 py-4">{auditorio.nombreauditorio}</td>
                                    <td className="px-6 py-4">{auditorio.creditos}</td>
                                    <td className="flex items-center px-6 py-4">
                                        <Link to={`/dashboard/auditorios/actualizar-auditorio/${auditorio._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Editar
                                        </Link>
                                        <DeleteModal
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                            text={"auditorio"}
                                            deleteFunction={()=> eliminarauditorios(auditorio._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de auditorios</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tablaauditorios