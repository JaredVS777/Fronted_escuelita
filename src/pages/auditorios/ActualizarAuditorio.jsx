import { useParams } from "react-router-dom"
import FormularioAuditorio from "../../components/Forms/FormularioAuditorio"

const ActualizarAuditorio = () =>{
    const {id} = useParams()

    return(
        <>
        <div className="p-5 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-4">Actualizar auditorios</h1>
            <span className="font-medium text-gray-500 mb-8">Actualiza la información de una auditorio</span>
            <FormularioAuditorio auditorioID={id} textBtn={'Actualizar datos de la auditorio'}/>
        </div>
    </>
    )
}
export default ActualizarAuditorio