import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function IndexBook(){

    const[book, setBook] = useState([])
    const{user,token}=useContext(AppContext);
    

    const navigate = useNavigate();
    
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const day = String(today.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    async function getBooks(){
        const res= await fetch(`/api/book`)
        const data = await res.json();

        if(res.ok){
            setBook(data);
        }
    }


    /////////////////////////////prestamo///////////////////////////////////////
    async function handleCreateLoan(idBook, e) {
        e.preventDefault();

        const loanData = {
            book_id: idBook,
            loanDate: getTodayDate()
        }

        console.log(loanData);
        

        const res = await fetch(`/api/loan`,{
            method:'post',
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(loanData)
        })

        const data = await res.json();

        console.log(data);
        
        if(data.errors){
            console.log(data.errors);
            
        }else{
            navigate("/");
            alert("se realizo el prestamo exitosamente")
        }
    }



    async function handleDelete(id, e) {
        e.preventDefault();

        await fetch(`/api/book/${id}`,{
            method:'delete',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        navigate("/");
        alert("El libro fue borrado con exito")


    }

    useEffect(()=>{
        getBooks()
    },[])

    return (
        <table className="custom-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Categoria</th>
                    <th>Libro</th>
                    <th>Autor</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {user && <th>Acción</th>}
                </tr>
            </thead>
            <tbody>
                {book.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.category.name}</td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.created_at}</td>
                        <td>{item.updated_at}</td>
                        {user && <td className="flex items-start">
                            <Link to={`/book/update/${item.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Update</Link>

                            <form onSubmit={(e)=>handleCreateLoan(item.id, e)}>
                                <button className="bg-green-500 text-white text-sm rounded-lg px-3 py-1 mx-1">Prestamo</button>
                            </form>
                            <form onSubmit={(e)=>handleDelete(item.id, e)}>
                                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                            </form>
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}