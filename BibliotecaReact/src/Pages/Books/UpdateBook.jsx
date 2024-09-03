import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook(){
    const navigate = useNavigate();
    const {id} = useParams();
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

    async function getBooks(){
        const res= await fetch(`/api/book/${id}`)
        const data = await res.json();

        if(res.ok){
            setFormData({
                category_id: data.book.category_id,
                name: data.book.name,
                author: data.book.author,
            })
        }
    }

    async function handleUpdate(e){
        e.preventDefault();
        const res = await fetch(`/api/book/${id}`,{
            method:'put',
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();

        console.log(data);
        

        if(data.errors){
            setErrors(data.errors);
        }else{
            navigate("/");
        }
    }

    useEffect(()=>{
        getCategories();
        getBooks();
    },[])

    return(
        <>
            <h1 className="title">Actualizar Libro</h1>

            <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
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

                    <button className="primary-btn">Actualizar</button>
            </form>
        </>
    );
}