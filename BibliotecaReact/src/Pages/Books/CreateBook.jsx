import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateBook(){
    const navigate = useNavigate();
    const {token} = useContext(AppContext);
    const [formData, setFormData] = useState({
        category_id:"",
        name:"",
        author:""
    });

    const[errors, setErrors]= useState({});

    const[categories, setCategories] = useState([])
    async function getCategories(){
        const res= await fetch(`/api/category`)
        const data = await res.json();

        if(res.ok){
            setCategories(data);
        }
    }

    async function handleCreate(e){
        e.preventDefault();
        const res = await fetch('/api/book',{
            method:'post',
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if(data.errors){
            setErrors(data.errors);
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return(
        <>
            <h1 className="title">Registrar nuevo Libro</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                     <div>
                        <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}>
                            <option value="" disabled>Seleccione una categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.category_id && <p className="error"> {errors.category_id}</p>}

                    <div>
                        <input type="text" placeholder="Nombre del libro" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                    </div>
                    {errors.name && <p className="error"> {errors.name}</p>}

                    <div>
                        <input type="text" placeholder="Autor del libro" value={formData.author} onChange={(e)=>setFormData({...formData, author:e.target.value})}/>
                    </div>
                    {errors.author && <p className="error"> {errors.author}</p>}
                    
                    {/* 'category_id',
                    'name',
                    'author', */}

                    <button className="primary-btn">Registrar</button>
            </form>
        </>
    );
}