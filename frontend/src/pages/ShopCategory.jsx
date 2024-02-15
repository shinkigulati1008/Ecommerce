import React, {useState, useContext} from 'react'
import './Css/ShopCategory.css'
import {ShopContext} from '../context/ShopContext'
import Item from '../components/Item/Item'

const ShopCategory = (props) => {
  const {all_products, 
    sortProducts, 
    sortBy, 
    setSortOrder,
    } = useContext(ShopContext);
  const [displayedProducts, setDisplayedProducts] = useState(12);
    
  const sortedProducts = sortProducts(all_products);
  const filteredAndSortedProducts = sortedProducts
  .filter((item) => item.category === props.category)
  .slice(0, displayedProducts);

  const handleSortChange = (e) => {
    e.preventDefault();
    setSortOrder(e.target.value);
  };

  const handleLoadMore = () => {
    // Increase the number of displayed products
    setDisplayedProducts((prev) => prev + 12);
  };

  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexsort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
             Sort by 
                <select onChange={handleSortChange}>
                    <option value='default'>Default</option>
                    <option value='priceLowToHigh'>Price: Low to High</option>
                    <option value='priceHighToLow'>Price: High to Low</option>
                    <option value='nameAsc'>Name: A-Z</option>
                    <option value='nameDesc'>Name: Z-A</option>
                </select>
          </div>
        </div>
        <div className="shopcategory-products">
          {filteredAndSortedProducts.map((item,i) => {
            if(item.category === props.category){
              return <Item key={i} {...item}/>
            } else{
              return null
            }
          })}
        </div>
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Explore more
        </div>
    </div>
  )
}

export default ShopCategory
