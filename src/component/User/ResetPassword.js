import React, { Fragment, useEffect,  useState } from 'react'
import "./ResetPassword.css"
import {  useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors,  resetPassword} from '../../actions/userAction'
import { useAlert } from 'react-alert';
import {  useParams } from 'react-router-dom';
import { Loader } from '../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen'; 
import LockIcon from "@mui/icons-material/Lock";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

    const {error,loading, success } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const resetPasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password ",password);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(resetPassword(token,myForm));
    }

    useEffect(() => {
        
      if(error){
        alert.error(error);
        dispatch(clearErrors()); 
    }
    if(success){
        alert.success("Password Updated Successfully")
        navigate("/login")
        
        dispatch({type:UPDATE_PASSWORD_RESET})
    }
    }, [dispatch,error,alert,navigate,success])
    
  return (
    <>
    {loading ? <Loader /> :
    <Fragment>
    <MetaData title="Change Password" />
    <div className='resetPasswordContainer'>
    <div className='resetPasswordBox'>
        <h2 className='resetPasswordHeading'>Update Profile</h2>
    <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
   
                <div >
                    <LockOpenIcon />
                    <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div >
                    <LockIcon />
                    <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>    
            
            <input type='submit' value="Change" className='resetPasswordBtn' />
        </form>

    </div>
    </div>
    </Fragment>}
    </>
  )
}

export default ResetPassword