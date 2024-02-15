import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='related-products'>
       <h1>Related Products</h1>
       <hr/>
       <div className="relatedproducts-item">
          {/* {data_product.map((item,i) => {
             return <Item key={i} {...item}/>
          })} */}
       </div>
    </div>
  )
}

export default RelatedProducts
