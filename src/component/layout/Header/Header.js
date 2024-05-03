import React, { useState } from 'react'
import './Header.css'
import logo from "../../../images/logom.png";
import search from "../../../images/search.png";
import signUplogo from "../../../images/signlogo.png";
import Cart from "../../../images/cart.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuToggleHandler = ()=>{
        if (window.innerWidth <= 600) {
            menuOpen ? setMenuOpen(false):setMenuOpen(true)
        }
        console.log('menutogle',menuOpen,window.innerWidth)
    }
  return (
    <div className='header'>
        <div className='menu-bar'>
            <div className='menu-icon' onClick={menuToggleHandler}
            style={menuOpen ? {display:'none'} : {display:"block"}}
            >
            <MenuIcon  fontSize='large'  />
            </div>
            <div className='close-icon' onClick={menuToggleHandler} 
             style={menuOpen ? {display:'block'} : {display:"none"}}
             >
            <CloseIcon fontSize='large'  />
            </div>
        </div>
        <nav className="navbar" style={menuOpen ? {display: 'flex'}: {display: 'none'}} role="navigation" aria-label="main navigation">
            
            <div className='logo'>
                <Link onClick={menuToggleHandler}  to='/'>
                    <img src={logo} alt='Ecommerce logo' />
                </Link>
            </div>
            <div className='nav-menu'>
                <Link onClick={menuToggleHandler} to='/'>Home</Link>
                <Link onClick={menuToggleHandler} to='/products'>Products</Link>
                <Link onClick={menuToggleHandler} to='/about'>About</Link>
                <Link onClick={menuToggleHandler} to='/contact'>Contact</Link>
            </div>

            <div className='loginNav'> 
                 <Link onClick={menuToggleHandler}  to='/search' title='Search'>
                    <img src={search} alt='Search logo' />
                </Link>
                <Link onClick={menuToggleHandler}  to='/cart' title='Cart'>
                    <img src={Cart} alt='Cart logo' />
                </Link>
                <Link onClick={menuToggleHandler}  to='/login' title='Login'>
                    <img src={signUplogo} alt='Profile logo' />
                </Link>
            </div>
  
</nav>
    </div>
  )
}


export default Header;