import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function ShowBook(){
    const {id} = useParams();
    const {user,token} = useContext(AppContext);
    const navigate = useNavigate();
    
    const [book, setBook] = useState([]); 
    async function getBooks(){
        const res= await fetch(`/api/book/${id}`)
        const data = await res.json();


        if(res.ok){
            setBook(data.book)
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        if(user){
            await fetch(`/api/book/${id}`,{
                method:'delete',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            navigate("/");
            alert("El libro fue borrado con exito")
        }else{
            navigate("/");
            alert("Tienes que iniciar sesion para borrar")
        }
    }

    useEffect(()=>{
        getBooks()
    },[])

    return(
    <>
            {book ?
                <div key={book.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400  bg-blue-100">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2x1">Libro: {book.name}</h2>
                            <small className="text-xs text-slate-800">Autor: {book.author}</small>
                            {/* {new Date(book.created_at).toLocaleDateString()} */}
                        </div>
                    </div>

                    <p className="font-bold text-blue-700 text-ce">Reseña:</p>
                    <p>Los trece relatos de Donde la vida nos lleva están divididos, por colores, en tres partes. El primero (de “Azul”) es “Un nudo en la garganta”. En un día incómodo, irritante (cielo nublado, llovizna) el muy formal Juan va hasta Callao y Quintana, y espera en un bar. Cuando entra su hermano Ángel, menor y casual, jovial, hablan y discuten. Elementos como una mujer o unos padres accidentados agregan tensión. Pero el estilo es económico, con uso de bastardilla para el pasado. El lector inevitablemente se pregunta si será el tono del libro en general.</p>

                    <div className="flex items-center justify-end gap-4">
                        <Link to={`/book/update/${book.id}`} className="bg-green-500 text-white text-sm rounded-lg px-3 py-1">Modificar</Link>
                        <form onSubmit={handleDelete}>
                            <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                        </form>
                    </div>
                </div>
                

             :
                <p className="title">Libro no encontrado</p>}

    </>)
}