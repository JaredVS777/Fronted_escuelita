import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal";
import Search from "../Search";
import AddRecordButton from "../AddRecordButton";

const Tablaconferencistas = () => {
    const [conferencistas, setconferencistas] = useState([]);
    const [originalconferencistas, setOriginalconferencistas] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [conferencistasPerPage] = useState(6);

    useEffect(() => {
        const obtenerconferencistas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas`);
                setconferencistas(response.data);
                setOriginalconferencistas(response.data); // Almacenar los conferencistas originales
            } catch (error) {
                console.log("Error al obtener conferencistas", error);
            }
        };
        obtenerconferencistas();
    }, []);

    const eliminarconferencista = async (conferencistaId) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas/eliminar/${conferencistaId}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas`);
            setconferencistas(response.data);
            setOriginalconferencistas(response.data); // Actualizar los conferencistas originales después de eliminar un conferencista
        }catch(error){
            console.log(error)
        }
    }

    const buscador = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        if (searchTerm === "") {
            setconferencistas(originalconferencistas); // Restaurar los conferencistas originales cuando el término de búsqueda está vacío
        } else {
            const filteredconferencistas = originalconferencistas.filter((conferencista) => {
                return (
                    conferencista.nombre.toLowerCase().includes(searchTerm) ||
                    conferencista.apellido.toLowerCase().includes(searchTerm) ||
                    conferencista.ciudad.toLowerCase().includes(searchTerm) ||
                    conferencista.direccion.toLowerCase().includes(searchTerm) ||
                    conferencista.email.toLowerCase().includes(searchTerm) ||
                    conferencista.telefono.toString().includes(searchTerm) ||
                    conferencista.cedula.toString().includes(searchTerm)
                );
            });
            setconferencistas(filteredconferencistas);
        }
    }

    // Paginación
    const indexOfLastconferencista = currentPage * conferencistasPerPage;
    const indexOfFirstconferencista = indexOfLastconferencista - conferencistasPerPage;
    const currentconferencistas = conferencistas.slice(indexOfFirstconferencista, indexOfLastconferencista);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="flex flex-row justify-between">
                <div className="flex-grow">
                    <Search searchValue={search} onSearch={buscador} />
                </div>
                    <AddRecordButton text="conferencistas" to="/dashboard/conferencistas/agregar-conferencista" />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre del conferencista</th>
                            <th scope="col" className="px-6 py-3">Apellido</th>
                            <th scope="col" className="px-6 py-3">Cédula</th>
                            <th scope="col" className="px-6 py-3">Ciudad</th>
                            <th scope="col" className="px-6 py-3">Dirección</th>
                            <th scope="col" className="px-6 py-3">Correo electrónico</th>
                            <th scope="col" className="px-6 py-3">Teléfono</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentconferencistas && currentconferencistas.length > 0 ? (
                            currentconferencistas.map((conferencista) => (
                                <tr key={conferencista._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{conferencista.nombre}</td>
                                    <td className="px-6 py-4">{conferencista.apellido}</td>
                                    <td className="px-6 py-4">{conferencista.cedula}</td>
                                    <td className="px-6 py-4">{conferencista.ciudad}</td>
                                    <td className="px-6 py-4">{conferencista.direccion}</td>
                                    <td className="px-6 py-4">{conferencista.email}</td>
                                    <td className="px-6 py-4">{conferencista.telefono}</td>
                                    <td className="flex items-center px-6 py-4">
                                        <Link to={`/dashboard/conferencistas/actualizar-conferencista/${conferencista._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Editar
                                        </Link>
                                        <DeleteModal
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                            text={"conferencista"}
                                            deleteFunction={() => eliminarconferencista(conferencista._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de conferencistas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Paginación */}
            <div className="mt-3 flex justify-center">
                {conferencistas.length > conferencistasPerPage && (
                    <ul className="flex list-none">
                        {Array.from({ length: Math.ceil(conferencistas.length / conferencistasPerPage) }).map((_, index) => (
                            <li key={index} className="px-2 ">
                                <button
                                    className={`bg-gray-200 rounded-md w-6 text-gray-500 hover:underline focus:outline-none ${currentPage === index + 1 ? 'font-semibold text-blue-500' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Tablaconferencistas;
