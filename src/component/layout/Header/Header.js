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
    const [menuOpen, setMenuOpen] = useState("")
    const menuToggleHandler = ()=>{
        menuOpen ? setMenuOpen(false):setMenuOpen(true)
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
                <Link   to='/'>
                    <img src={logo} alt='Ecommerce logo' />
                </Link>
            </div>
            <div className='nav-menu'>
                <Link   to='/'>Home</Link>
                <Link   to='/products'>Products</Link>
                <Link   to='/about'>About</Link>
                <Link   to='/contact'>Contact</Link>
            </div>

            <div className='loginNav'> 
                 <Link   to='/search' title='Search'>
                    <img src={search} alt='Search logo' />
                </Link>
                <Link   to='/cart' title='Cart'>
                    <img src={Cart} alt='Cart logo' />
                </Link>
                <Link   to='/login' title='Login'>
                    <img src={signUplogo} alt='Profile logo' />
                </Link>
            </div>
  
</nav>
    </div>
  )
}


export default Header;