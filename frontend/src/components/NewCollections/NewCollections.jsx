import React, {useState, useEffect} from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {
  const [newCollection, setNewcollection] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/newcollection')
    .then((res) => res.json())
    .then((data) => setNewcollection(data))
  }, [])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {newCollection.map((item,i) => {
               return <Item key={i} {...item}/> 
            })}
        </div>
    </div>
  )
}

export default NewCollections
