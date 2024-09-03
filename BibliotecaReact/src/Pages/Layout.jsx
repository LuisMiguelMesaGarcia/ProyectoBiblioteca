import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout(){
    const {user,token,setUser, setToken} = useContext(AppContext)
    const navigate = useNavigate();

    async function handleLogout(e){
        e.preventDefault();
        
        const res = await fetch('/api/logout',{
            method:'post',
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json;
        console.log(data);

        if(res.ok){
            setUser(null)
            setToken(null)
            localStorage.removeItem("Token");
            navigate('/')
        }
    }

    return(
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    {user?(
                        <div className="flex items-center space-x-4">
                            <div className="text-slate-400 text-s">Hola {user.name}</div>
                            <Link to="/book/create" className="nav-link">
                                Nuevo Libro
                            </Link>
                            <Link to="/book/index" className="nav-link">
                                Libros
                            </Link>
                            <Link to="/loan/index" className="nav-link">
                                Mis prestamos
                            </Link>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">Cerrar sesion</button>
                            </form>
                        </div>
                        
                    ):(
                        <div className="space-x-4">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Registro</Link>
                            <Link to="/book/index" className="nav-link">
                                Libros
                            </Link>
                        </div>
                    )}
                    
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    )
}