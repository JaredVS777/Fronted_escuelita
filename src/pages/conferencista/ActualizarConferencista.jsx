import { useParams } from "react-router-dom";
import FormularioConferencista from "../../components/Forms/FormularioConferencista";

const Actualizarconferencista = () => {
    const { id } = useParams();
    console.log("ID del conferencista:", id); 

    return(
        <>
            <div className="p-5 flex flex-col h-screen">
                <h1 className="text-2xl font-bold mb-4">Actualizar conferencistas</h1>
                <span className="font-medium text-gray-500 mb-8">Actualiza la información de un conferencista</span>
                <FormularioConferencista conferencistaId={id} textBtn={'Actualizar datos del conferencista'}/>
            </div>
        </>
    );
};

export default Actualizarconferencista;
