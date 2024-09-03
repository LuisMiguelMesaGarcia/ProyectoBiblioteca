import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register(){
    
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })

    const[errors, setErrors] = useState({

    })

    async function handleRegister(e){
        e.preventDefault();
        const res = await fetch('/api/register',{
            method:"post",
            body: JSON.stringify(formData),//convert from object to json
        });

        const data = await res.json();

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
            <h1 className="title">Registrar una nueva cuenta</h1>

            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <input type="text" placeholder="Nombre" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                {errors.name && <p className="error">{errors.name[0]}</p>}

                <input type="text" placeholder="Correo electronico" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                {errors.email && <p className="error">{errors.email[0]}</p>}

                <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                {errors.password && <p className="error">{errors.password[0]}</p>}

                <input type="password" placeholder="Confirmar contraseña" value={formData.password_confirmation} onChange={(e)=>setFormData({...formData, password_confirmation:e.target.value})}/>

                <button className="primary-btn">Registrarse</button>
            </form>
        </>
    )
}