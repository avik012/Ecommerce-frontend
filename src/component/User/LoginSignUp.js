import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./LoginSignUp.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from "@mui/icons-material/Face"
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, login,register} from '../../actions/userAction'
import { useAlert } from 'react-alert';
import { Loader } from '../layout/Loader/Loader';

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const {error,loading, isAuthenticated} = useSelector(state => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name, email,password} = user;

    const [avtar, setAvtar] = useState();
    const [avtarPreview, setAvtarPreview] = useState("./Profile.png")

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }

    const registerSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avtar",avtar);
        dispatch(register(myForm));
    }

    const registerDataChange = (e)=>{
        // console.log('e entered',e.target.name)
        if(e.target.name === "avtar"){
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2 ){
                    // console.log('avtar', e.target.files)
                    setAvtarPreview(reader.result)
                    setAvtar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user,[e.target.name]: e.target.value})
        }
    }

    // console.log('location', location)
    const redirect = location.search? location.search.split("=")[1] : "/account";

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isAuthenticated){
        navigate(redirect)
    }
    }, [dispatch,error,alert,navigate,isAuthenticated,redirect])
    

    const switchTabs = (e, tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==="register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }


  return (
    <Fragment>
        {loading? <Loader />:
        <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
            <div>
                <div className='login_signUp_toggle'>
                    <p onClick={(e)=> switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=> switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
            </div>

            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                    <MailOutlineIcon />
                    <input
                    type='email'
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e)=>setLoginEmail(e.target.value)}
                    />
                </div>
                <div className='loginPassword'>
                    <LockOpenIcon />
                    <input
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                    />
                </div>
                <Link to="/password/forgot" >Forgot Password</Link>
                <input type='submit' value="Login" className='loginBtn' />
            </form>

            <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
            <div className='signUpName'>
                    <FaceIcon />
                    <input
                    type='text'
                    placeholder='Name'
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    />
                </div>
                <div className='signUpEmail'>
                    <MailOutlineIcon />
                    <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={registerDataChange}
                    />
                </div>
                <div className='signUpPassword'>
                    <LockOpenIcon />
                    <input
                    type='password'
                    placeholder='Password'
                    required
                    name='password'
                    value={password}
                    onChange={registerDataChange}
                    />
                </div>
                <div id='registerImage'>
                    <img src={avtarPreview} alt='Avtar Preview' />
                    <input 
                    type='file'
                    name='avtar'
                    required ={avtar? false : true}
                    // disabled = {avtar? true: false}
                    // value= 'c:/hlo/truels.png'
                    accept='image/*'
                    onChange={registerDataChange}
                    />

                </div>
                <input type='submit' value="Register" className='signUpBtn' />
            </form>
        </div>
    </div>
        }
    </Fragment>
  )
}

export default LoginSignUp