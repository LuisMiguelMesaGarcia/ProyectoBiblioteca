import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function IndexLoan(){

    const[loan, setLoan] = useState([])
    const{token}=useContext(AppContext);

    // const navigate = useNavigate();
    
    // function getTodayDate() {
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    //     const day = String(today.getDate()).padStart(2, '0');
    
    //     return `${year}-${month}-${day}`;
    // }

    async function getLoans(){
        const res= await fetch(`/api/loan`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json();

        if(res.ok){
            setLoan(data);
        }
    }


    /////////////////////////////prestamo///////////////////////////////////////
    // async function handleCreateLoan(idBook, e) {
    //     e.preventDefault();

    //     const loanData = {
    //         book_id: idBook,
    //         loanDate: getTodayDate()
    //     }

    //     console.log(loanData);
        

    //     const res = await fetch(`/api/loan`,{
    //         method:'post',
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         },
    //         body: JSON.stringify(loanData)
    //     })

    //     const data = await res.json();

    //     console.log(data);
        
    //     if(data.errors){
    //         console.log(data.errors);
            
    //     }else{
    //         navigate("/");
    //         alert("se realizo el prestamo exitosamente")
    //     }
    // }



    // async function handleDelete(id, e) {
    //     e.preventDefault();

    //     await fetch(`/api/book/${id}`,{
    //         method:'delete',
    //         headers:{
    //             Authorization: `Bearer ${token}`
    //         }
    //     })

    //     navigate("/");
    //     alert("El libro fue borrado con exito")


    // }

    useEffect(()=>{
        getLoans()
    },[])

    return (
        <div>
            {loan.length > 0 ? (
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Libro</th>
                            <th>Fecha de prestamo</th>
                            <th>Fecha devolucion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loan.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.user.email}</td>
                                <td>{item.user.name}</td>
                                <td>{item.book.name}</td>
                                <td>{item.loanDate}</td>
                                <td>{item.returnDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="title">No tienes libros prestados</p>
            )}
        </div>
    );
}