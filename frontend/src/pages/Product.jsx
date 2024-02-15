import React from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_products} = React.useContext(ShopContext)
  const {productId} = useParams()
  const product_item = all_products.find((item) => item.id === Number(productId))
  return (
    <div>
      <Breadcrumbs product={product_item}/>
      <ProductDisplay product={product_item}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
