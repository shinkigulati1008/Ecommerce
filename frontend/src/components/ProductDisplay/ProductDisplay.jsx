import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addtoCart} = useContext(ShopContext)
  return (
    <div className='product-display'>
        <div className="productdiplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-img-main" src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className='productdisplay-rating'>
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull} alt="" />
            </div>
            <p>(122)</p>
            <div className="productdisplay-right-prices">
                <div className="productdiplay-right-price-old">
                    ${product.old_price}
                </div>
                <div className="productdiplay-right-price-new">
                    ${product.new_price}
                </div>
            </div>
            <div className="productdisplay-right-decsription">
                Lorem Ipsum Dummy Description
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={() => addtoCart(product.id)}>Add To Cart</button>
            <p className='productdisplay-right-category'><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className='productdisplay-right-tags'><span>Tags : </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay
