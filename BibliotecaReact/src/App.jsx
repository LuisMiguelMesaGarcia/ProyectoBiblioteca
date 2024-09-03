import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import CreateBook from './Pages/Books/CreateBook';
import ShowBook from './Pages/Books/ShowBook';
import UpdateBook from './Pages/Books/UpdateBook';
import IndexBook from './Pages/Books/indexBook';
import IndexLoan from './Pages/Loans/IndexLoan';

export default function App() {

  const {user} = useContext(AppContext);

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>

        <Route path='/book/index' element={<IndexBook/>}/>
        <Route path='/book/:id' element={<ShowBook/>}/>

        <Route path='/loan/index' element={user?<IndexLoan/>:<Login/>}/>

        <Route path='/book/update/:id' element={user? <UpdateBook/> : <Login/>}/>
        
        <Route path='/register' element={user? <Home/> : <Register/> }/>
        <Route path='/login' element={user? <Home/> : <Login/>}/>
        <Route path='/book/create' element={user? <CreateBook/> : <Login/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  
}


