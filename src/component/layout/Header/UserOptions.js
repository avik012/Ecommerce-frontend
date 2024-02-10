import React, { Fragment, useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';


const UserOptions = ({ user }) => {
    const { cartItems } = useSelector(state => state.cart)
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        { icon:<ListAltIcon />, name:"Orders",func: orders},
        { icon:<PersonIcon />, name:"Profile",func: account},
        { icon:<RemoveShoppingCartIcon
            style={{color: cartItems.length >0 ? "tomato":"unset"}} />, name:`Cart(${cartItems.length})`,func: cart},
        { icon:<ExitToAppIcon />, name:"Logout",func: logoutUser},
    ];

    if(user.role === "admin"){
        options.unshift({
            icon:<DashboardIcon />, name:"Dashboard",func: dashboard
        })
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }
    function orders() {
        navigate("/orders");
    }
    function account() { 
        navigate("/account");
    }
    function cart() { 
        navigate("/cart");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully")
    }
    
  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex:"10"}} />
        <SpeedDial
        ariaLabel='SpeedDial Tool Tip example'
        className='speedDial'
        style={{ zIndex:"11"}}
        onOpen={()=>setOpen(true)}
        onClose={()=>setOpen(false)}
        open = {open}
        direction='down'
        icon={
            <img
            className='speedDialIcon'
            src={user.avtar.url ? user.avtar.url : "/Profile.png"}
            alt='Profile'
            />
        }
        >
            {options.map((item)=>(
                <SpeedDialAction icon={item.icon} tooltipTitle={item.name} 
                key={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth<600 ? true :false}
                 />
                
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions