import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){

    const[popularBooks, setPopularBooks] = useState([]);
    const[activeUsers, setActiveUsers] = useState([]);


    async function getStats(){
        const res= await fetch('/api/stats')
        const data = await res.json();
        
        if(res.ok){
            setPopularBooks(data.popularBooks)
            setActiveUsers(data.activeUsers)
        }
    }

    useEffect(()=>{
        getStats();
    },[])

    return(
        <>
            <h1 className="title">Ranking de libros</h1>
            {popularBooks.length > 0?
                popularBooks.map(book=>(
                    <div key={book.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400  bg-blue-100">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2x1">Libro: {book.name}</h2>
                                <small className="text-xs text-slate-800">Autor: {book.author}</small>
                                {/* {new Date(book.created_at).toLocaleDateString()} */}
                            </div>
                            <Link to={`/book/${book.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read More</Link>
                        </div>
                            <p className="font-bold text-blue-700 text-ce">Prestamos: {book.loans_count}</p>
                    </div>
                ))
             :
                <p className="title">No hay libros prestados</p>}
            
            <h1 className="title">Ranking de usuarios</h1>
            {activeUsers.length > 0?
                activeUsers.map(user=>(
                    <div key={user.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400  bg-amber-100">
                        <div className="mb-2 flex items-start justify-between">
                            <div>
                                <h2 className="font-bold text-2x1">Usuario: {user.name}</h2>
                                {/* {new Date(book.created_at).toLocaleDateString()} */}
                            </div>
                            <p className="font-bold text-amber-700">Prestamos: {user.loans_count}</p>
                        </div>
                    </div>
                ))
             :
                <p className="title">No hay libros prestados</p>}
        </>
    )
}