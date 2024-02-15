import React, { useState, useContext, useRef} from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import hamburgurger_icon from '../Assets/hamburgur.png'
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();

    const menuItems = [
        { key: 'shop', label: 'Shop', path: '/' },
        { key: 'women', label: 'Women', path: '/women' },
        { key: 'men', label: 'Men', path: '/men' },
        { key: 'kid', label: 'Kids', path: '/kid' },
    ];

    const toggleMenu = (e) =>{
        menuRef.current.classList.toggle("nav-menu-visible")
        e.target.classList.toggle("open")        
    }
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
        </div>
        <img className="nav-dropdown" onClick={toggleMenu} src={hamburgurger_icon} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            {menuItems.map((item) => (
                    <li key={item.key} onClick={() => setMenu(item.key)}>
                        <Link to={item.path} style={{ textDecoration: 'none' }}>
                            {item.label}
                        </Link>
                        {menu === item.key && <hr />}
                    </li>
                ))}
        </ul>
        <div className='nav-login-cart'>
            {localStorage.getItem("auth-token") ? 
            ( <button onClick={() => {localStorage.removeItem("auth-token"); window.location.replace("/")}}>Logout</button>
             ) : (
               <Link to="/login"><button>Login</button></Link>
            )}
            <Link to="/cart">
                <img src={cart_icon} alt=""/>
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
