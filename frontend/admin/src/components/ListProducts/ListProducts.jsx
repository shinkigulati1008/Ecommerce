import React, { useEffect, useState } from 'react'
import './ListProducts.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProducts = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async() => {
    await fetch('http://localhost:4000/allproducts')
      .then(res => res.json())
      .then(data => setAllProducts(data));
  }

  useEffect(() => {
    fetchInfo();
  },[])

  const removeProduct = async(id) => {
    await fetch('http://localhost:4000/deleteproduct', {
      method:"post",
      headers:{
        Accept : 'application/json',
        'Content-Type' : 'application/json'

      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  return (
    <div className='list-products'>
        <h1>All Products List</h1>
        <div className="listproducts-formatmain">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
           <hr/>
           {allproducts.length === 0 ? <p>No Products</p> : allproducts.map((product) => (
          <div className="listproducts-formatmain listproducts-format" key={product.id}>
            <img src={product.image} alt="" className='listproduct-product-image' />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} className="listproduct-remove-icon" src={cross_icon} alt="" />
          </div>
        ))}
        </div>
    </div>
  )
}

export default ListProducts
