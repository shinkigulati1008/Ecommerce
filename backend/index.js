const dotenv = require('dotenv');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// mongodb connection
mongoose.connect(process.env.DATABASE_URL);

//API
app.get('/', (req, res) => {
    res.send('Express App is running...');
})

//Image storage engine - Multer
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

//creating uploading endpoint for image
app.use('/images', express.static('uploads/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success:1, 
        image_url: `http://localhost:${port}/images/` + req.file.filename
     });
})

// Schema for products
const Product = mongoose.model('Product', {
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    available:{
        type: Boolean,
        default: true
    },    
})

app.post('/addproduct', async(req, res) => {
    let products = await Product.find({});
    let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;

    const {name, image, category, new_price, old_price} = req.body;
    const product = new Product({
        id,
        name,
        image,
        category,
        new_price,
        old_price
    });
    console.log(product)
    await product.save();
    res.json({
        success: 1,
        name: product.name,
        message: 'Product added successfully'
    })
})

//API for removing product
app.post('/deleteproduct', async(req, res) => {
    await Product.findOneAndDelete({id:req.body.id});
    res.json({
        success: 1,
        message: 'Product deleted successfully',
        name : req.body.name
    })
})


//API for getting all products
app.get('/allproducts', async(req, res) => {
    const products = await Product.find({});
    res.send(products)
})


//Schema creating for user model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now        
    }
})

// Creating endpoint for registering user
app.post('/signup', async(req, res) => {
    let check = await User.findOne({email: req.body.email});
    if(check) return res.status(400).json({success: false, error: 'User already exists'});
    let cart ={};
    // for(let i = 0; i < req.body.cartData.length; i++){
    //     cart[req.body.cartData[i].id] = req.body.cartData[i];
    // }
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password:req.body.password,
        cartData:cart
    });
    await user.save();
    const data = {
        user:{
            id: user.id
        }       
    }
    const token = jwt.sign(data, process.env.SECRET_KEY)
    res.json({
        success: 1,
        message: 'User registered successfully',
        token
    })
})

// Creating endpoint for login
app.post('/login', async(req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({success: false, error: 'User does not exist'});
    const passCompare = req.body.password === user.password;
    if(!passCompare) return res.status(400).json({success: false, error: 'Incorrect password'});
    const data = {
        user:{
            id: user.id
        }       
    }
    const token = jwt.sign(data, process.env.SECRET_KEY)
    res.json({
        success: true,
        message: 'User logged in successfully',
        token
    })
});

//creating endpoint for new collection
app.get('/newcollection', async(req, res) => {
    const products = await Product.find({}); 
    let newCollection = products.slice(1).slice(-8)
    res.send(newCollection);
})

//creating endpoint for popular in women category
app.get('/popularinwomen', async(req, res) => {
    const womenProducts = await Product.find({ category: 'women' });
    let popularInWomen = womenProducts.slice(0,4)
    res.send(popularInWomen);
});

//creating middleware to fetch user
const fetchUserMiddleware = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized user' });
    } else{
        try{
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.user = data.user;
            next();
        } catch(error){
            return res.status(401).json({ error: 'Unauthorized user' });
        }
    }    
};


//creating endpoint for saving products in cart
app.post('/addtocart', fetchUserMiddleware, async (req, res) => {
    try {
      let cart = {};
      let userData = await User.findById(req.user.id);
  
      if (!userData) {
        throw new Error('User not found');
      }
  
      userData.cartData[req.body.id] += 1;
      await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  
      res.json({
        success: 1,
        message: 'Product added to cart successfully',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({
        success: 0,
        message: 'Error adding product to cart',
      });
    }
  });

//creating endpoint for removing products from cart
app.post('/removefromcart', fetchUserMiddleware, async(req, res) => {
    let cart ={};
    let userData = await User.findById(req.user.id);
    if(userData.cartData[req.body.id] <= 0) return
    userData.cartData[req.body.id] -= 1;
    await User.findByIdAndUpdate(req.user.id, {cartData:userData.cartData});
    res.json({
            success: 1,
            message: 'Product removed from cart successfully'
        })
})

//creating endpoint to get cart
app.post('/getcart', fetchUserMiddleware, async(req, res) => {
    let userData = await User.findById(req.user.id);
    res.send(userData.cartData);
})


app.listen(port, (error) => {
    if(error) throw error;
    console.log('Server is running on port ' + port);
});