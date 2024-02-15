import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProducts from '../../components/ListProducts/ListProducts'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/listproduct' element={<ListProducts/>}/>
        </Routes>
    </div>
  )
}

export default Admin
