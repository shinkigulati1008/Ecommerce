import React, {useState, useEffect} from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = () => {
  const [data_products, setDataProducts] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
    .then((res) => res.json())
    .then((data) => setDataProducts(data))
  }, [])
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr/>
        <div className="popular-items">
            {data_products.map((item,i) => {
                return <Item key={i} {...item}/>
            })}
        </div>
    </div>
  )
}

export default Popular
