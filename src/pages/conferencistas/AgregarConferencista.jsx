import FormularioConferencista from "../../components/Forms/FormularioConferencista"
const AgregarConferencista = () => {
    return(
        <>
            <div className="p-5 flex flex-col h-screnn">
                <h1 className=" text-2xl font-bold mb-4">Agregar conferencistas</h1>
                <span className="font-medium text-gray-500 mb-8">Agrega un conferencista más a la lista</span>
                <FormularioConferencista textBtn={'Registrar conferencista'}/>
            </div>
        </>
    )
}

export default AgregarConferencista