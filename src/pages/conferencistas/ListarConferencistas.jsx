import Tablaconferencistas from "../../components/Tablas/TablaConferencistas"
import Search from "../../components/Search"
import AddRecordButton from "../../components/AddRecordButton"
import { useState } from "react"

const Listarconferencistas = () => {

    const [conferencista, setconferencistas] = useState([])

    

    return(
        <>
            <div className="p-5 flex flex-col">
                <h1 className=" text-2xl font-bold mb-4">Módulo de conferencistas</h1>
                <span className="font-medium text-gray-500 mb-8">Revisa los conferencistas .. no tengo ideas xD</span>

                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="lg:w-full sm:w-1/2">
                        <Tablaconferencistas />         
                    </div>
                </div>
            </div>
        </>
    )
}

export default Listarconferencistas