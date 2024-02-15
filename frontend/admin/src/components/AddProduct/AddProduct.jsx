import React, {useState}from 'react'
import './AddProduct.css'
import upload_area_icon from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetail, setProductDetail] = useState({
        name: '',
        old_price: '',
        new_price: '',
        category: 'women',
        image:'',
    });

    const imageHandler = (e) =>{
        setImage(e.target.files[0])
    }

    const changeHandler = (e) =>{
        setProductDetail({
            ...productDetail,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async() => {
        console.log(productDetail)
        let responseData;
        let product = productDetail;
        const formData = new FormData();
        formData.append('product', image);
        // formData.append('name', productDetail.name);
        // formData.append('old_price', productDetail.old_price);
        // formData.append('new_price', productDetail.new_price);
        // formData.append('category', productDetail.category);
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            responseData = data;
        })
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product)
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)                
            })
            .then(res => res.json())
            .then((data) => {
                data.success? alert(data.message) : alert('Product not added')
            })
        }
    }

  return (
    <div className='add-product'>
        <h1>Add Product</h1>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input onChange={changeHandler} value={productDetail.name} type="text"  name="name" placeholder='Product Title'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Product Price</p>
                <input onChange={changeHandler} value={productDetail.old_price} type="text" name="old_price" placeholder='Product Price'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input onChange={changeHandler} value={productDetail.new_price} type="text" name="new_price" placeholder='Product Price'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetail.category} onChange={changeHandler} name="category" className="addproduct-select" id="">
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>
                <img src={image? URL.createObjectURL(image) : upload_area_icon} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={()=>submitHandler()} className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct
