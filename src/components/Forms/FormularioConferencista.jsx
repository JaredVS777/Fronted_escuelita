import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormularioConferencista = ({ conferencistaId, textBtn}) => {
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState('')

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        ciudad: "",
        direccion: "",
        email: "",
        telefono: "",
        genero: "",
        empresa: "",
    });



    useEffect(() => {
        const obtenerconferencista = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas/${conferencistaId}`);
                const conferencista = response.data;
                setForm({
                    nombre: conferencista.nombre ?? "",
                    apellido: conferencista.apellido ?? "",
                    cedula: conferencista.cedula ?? "",
                    ciudad: conferencista.ciudad ?? "",
                    direccion: conferencista.direccion ?? "",
                    email: conferencista.email ?? "",
                    telefono: conferencista.telefono ?? "",
                    genero: conferencista.genero ?? "",
                    empresa: conferencista.empresa ?? "",
                });
            } catch (error) {
                console.error("Error al obtener conferencista:", error);
            }
        };

        if (conferencistaId) {
            obtenerconferencista();
        }
    }, [conferencistaId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (conferencistaId) {
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas/actulizar/${conferencistaId}`, form);
                console.log("Actualizacion exitosa")
            } else {
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/conferencistas/registro`, form);
                console.log(response.data.message)

                if(response.data.message === "conferencista registrado"){
                    console.log("Registro exitoso")
                    navigate('/dashboard/conferencistas')
                }else{
                    setMensaje(response.data.message)
                    notify()
                }
                
            }
            if (response.status === 201 || response.status === 200) {
                console.log("conferencista guardado:", response.data);
                
            }
        } catch (error) {
            console.error("Error al guardar conferencista:", error);
        }
    };

    const notify = () => {
        toast.info(mensaje)
    }


    return (
        <div className="grid grid-cols-3 gap-4">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="col-span-3">
                <div className="flex flex-col space-y-4">    
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="nombre" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                className="w-full bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese nombre"
                                required
                                name="nombre"
                                onChange={handleChange}
                                value={form.nombre}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="apellido" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                className="w-full bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ingrese apellido"
                                required
                                name="apellido"
                                onChange={handleChange}
                                value={form.apellido}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-full"> {/* Clase w-full para que ocupe todo el ancho disponible */}
                            <label htmlFor="cedula" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Cédula</label>
                            <input
                            type="text"
                            id="cedula" 
                            className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingrese la cédula"
                            required
                            name="cedula"
                            onChange={handleChange}
                            value={form.cedula}
                            />            
                        </div>
                        <div className="w-full"> {/* Clase w-full para que ocupe todo el ancho disponible */}
                            <label htmlFor="ciudad" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                            <input
                            type="text"
                            id="ciudad"
                            className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingrese la ciudad"
                            required
                            name="ciudad"
                            onChange={handleChange}
                            value={form.ciudad}
                            />
                        </div>
                        </div>


                        <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="w-full"> {/* Clase w-full para que ocupe todo el ancho disponible */}
                            <label htmlFor="direccion" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                            <input
                            type="text"
                            id="direccion"
                            className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingrese la dirección"
                            required
                            name="direccion"
                            onChange={handleChange}
                            value={form.direccion}
                            />
                        </div>
                        <div className="w-full"> {/* Clase w-full para que ocupe todo el ancho disponible */}
                            <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                            <input
                            type="email"
                            id="email"
                            className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingrese el correo"
                            required
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            />
                        </div>
                        </div>

                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingrese el telefono"
                        required
                        name="telefono"
                        onChange={handleChange}
                        value={form.telefono}
                    />

                </div>
                <button
                    type="submit"
                    className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm sm:w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {textBtn}
                </button>
            </form>
        </div>
    );
}

export default FormularioConferencista;
