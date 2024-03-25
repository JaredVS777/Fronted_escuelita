import Formularioauditorio from "../../components/Forms/FormularioAuditorio"

const AgregarAuditorio = () => {
    return(
        <>
            <div className="p-5 flex flex-col h-screnn">
                <h1 className=" text-2xl font-bold mb-4">Agregar auditorios</h1>
                <span className="font-medium text-gray-500 mb-8">Agrega una auditorio más a la lista</span>
                <Formularioauditorio textBtn={"Registrar auditorio"}/>
            </div>
        </>
    )
}
export default AgregarAuditorio