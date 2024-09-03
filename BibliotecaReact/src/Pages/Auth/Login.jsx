import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login(){
    
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const[errors, setErrors] = useState({})

    async function handleLogin(e){
        e.preventDefault();
        const res = await fetch('/api/login',{
            method:"post",
            body: JSON.stringify(formData),//convert from object to json
        });

        const data = await res.json();//convertimo de json a object

        if(data.errors){
            setErrors(data.errors)
        }else{
            localStorage.setItem('Token',data.token);
            setToken(data.token);
            navigate("/");
        }
    }

    return(
        <>
            <h1 className="title">Inicia sesión con tu cuenta</h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">

                <input type="text" placeholder="Correo electronico" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                {errors.email && <p className="error">{errors.email[0]}</p>}

                <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                {errors.password && <p className="error">{errors.password[0]}</p>}

                <button className="primary-btn">Iniciar sesion</button>
            </form>
        </>
    )
}