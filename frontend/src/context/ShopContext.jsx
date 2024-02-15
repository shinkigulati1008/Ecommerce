import React, { useEffect, createContext, useState, useContext  } from "react";

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < 300+ 1; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = ({children}) => {  
    const [all_products, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart()) 
    const [sortBy, setSortBy] = useState('default'); 
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch("http://localhost:4000/allproducts");
              const data = await response.json();
              setAllProducts(data);
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };

          const fetchCart = async () => {
            try {
                const auth_token = localStorage.getItem("auth-token");
                if(auth_token) {
                const response = await fetch("http://localhost:4000/getcart", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "auth-token": auth_token,
                  },
                  body: JSON.stringify({}),
                });
                const data = await response.json();
                setCartItems(data);
              }
            } catch (error) {
              console.error("Error fetching cart:", error);
            }
          };
      
          const initializeData = async () => {
            await fetchProducts();
            await fetchCart();
          };
      
          initializeData();
    },[]);

    const sortProducts = (products) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return [...products].sort((a, b) => a.new_price - b.new_price);
        case 'priceHighToLow':
          return [...products].sort((a, b) => b.new_price - a.new_price);
        case 'nameAsc':
          return [...products].sort((a, b) => a.name.localeCompare(b.name));
        case 'nameDesc':
          return [...products].sort((a, b) => b.name.localeCompare(a.name));
        default:
          return products;
      }
    };


    const setSortOrder = (order) => {
      setSortBy(order);
    };

    const addtoCart = async (itemId) => {
        try {
          setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            return updatedCart;
          });
    
          if (localStorage.getItem("auth-token")) {
            const response = await fetch("http://localhost:4000/addtocart", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
              body: JSON.stringify({
                id: itemId,
              }),
            });
    
            const data = await response.json();
            console.log("saved cart data", data);
            console.log(data.message);
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      };

      const removeFromCart = async (itemId) => {
        try {
          setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
            return updatedCart;
          });
    
          if (localStorage.getItem("auth-token")) {
            const response = await fetch("http://localhost:4000/removefromcart", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
              body: JSON.stringify({
                id: itemId,
              }),
            });
    
            const data = await response.json();
            console.log(data.message);
          }
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      };

      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_products.find(
              (product) => product.id === Number(item)
            );
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            totalItems += cartItems[item];
          }
        }
        return totalItems;
      };
    

    const contextValue = {
        all_products, 
        cartItems, 
        addtoCart, 
        removeFromCart,
        getTotalCartAmount, 
        getTotalCartItems,
        sortProducts,
        setSortOrder,
        sortBy,
    }
    return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

export default ShopContextProvider;