import Search from "../../components/Search"
import AddRecordButton from "../../components/AddRecordButton"
import TablaReservas from "../../components/Tablas/TablaReservas"

const ListarReservas = () => {
    return (
        <div className="p-5 flex flex-col">
        <h1 className=" text-2xl font-bold mb-4">Módulo de Matículas</h1>
        <span className="font-medium text-gray-500 mb-8">Revisa las matrículas .. no tengo ideas xD</span>
        <div className="flex flex-row justify-between">
            <div className="flex-grow">
                <Search/>
            </div>
            <AddRecordButton text="matrícula" to="/dashboard/reservas/agregar-reserva" />
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="lg:w-full sm:w-1/2">
                <TablaReservas/>
            </div>
        </div>
    </div>
    );
};

export default ListarReservas;
