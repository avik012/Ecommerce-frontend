import backendLink from "../constants/backendLink"
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAIL,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS,LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,LOGOUT_USER_FAIL, 
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERRORS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_FAIL,
} from "../constants/userConstant"
import axios from "axios"


export const login = (email,password)=> async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {headers: { "Content-Type":"application/json"}}

        // const {data}= await axios.post(`${backendLink}/api/v1/login`,   // Authentication with header, token store in localstorage
        // {email,password},
        // config
        // );
        const {data}= await axios.post(`${backendLink}/api/v1/login`,     // Authentication with cookie through axios
        {email,password},
        config,
        // {
        //     withCredentials: true // Include credentials (cookies) in the request
        // }
        );
        // const response = await fetch(`${backendLink}/api/v1/login`, {        //  Through fetch api to store or access to cookie by credentials
        //     method: 'POST',
        //     body: JSON.stringify({email,password}),
        //     headers: { "Content-Type":"application/json"},
        //     credentials: 'include', // Include cookies in the request
        //   });
        //   const data =await response.json();

        dispatch({type:LOGIN_SUCCESS,payload:data.user})
        // console.log(data)
        // localStorage.setItem("token",data.token);    its used when we used header for authentication

    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.message})
    }
}

export const register = (userData)=> async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}}

        const {data}= await axios.post(`${backendLink}/api/v1/register`, userData, config,
            {
                withCredentials: true // Include credentials (cookies) in the request
            }
        );
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
        
        // localStorage.setItem("token",data.token);
    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL, payload:error.response.data.message})
    }
}

export const loadUser = ()=> async(dispatch)=>{
  try {
      dispatch({type:LOAD_USER_REQUEST})
      
    //   const config = {headers: {"token":localStorage.getItem("token")}}
    //    const {data}= await axios.get(`${backendLink}/api/v1/me`,config);  // Authentication with header, token store in localstorage

    // const response = await fetch(`${backendLink}/api/v1/me`, {       // Through fetch api to store or access to cookie by credentials
    //     method: 'GET',
    //     headers: {"token":localStorage.getItem("token")},
    //     credentials: 'include', // Include cookies in the request
    //   });
    //   const data =await response.json();
    //   console.log(data)
    const {data}= await axios.get(`${backendLink}/api/v1/me`,           // Authentication with cookie through axios
        {
            withCredentials: true // Include credentials (cookies) in the request
          }
       );
      dispatch({type:LOAD_USER_SUCCESS,payload:data?.user})
  } catch (error) {
      dispatch({type:LOAD_USER_FAIL, payload:  error.response?.data?.message || error.message})
  }
}

export const logout = ()=> async(dispatch)=>{
  try {
    await axios.get(`${backendLink}/api/v1/logout`);
    dispatch({type:LOGOUT_USER_SUCCESS})
    
    // localStorage.removeItem("token");
  } catch (error) {
      dispatch({type:LOGOUT_USER_FAIL, payload:error.response.data.message})
  }
}

export const updateProfile = (userData)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST})

        // const config = {headers: { "Content-Type":"multipart/form-data","token":localStorage.getItem("token")}}
        const config = {headers: { "Content-Type":"multipart/form-data"}}

        const {data}= await axios.put(`${backendLink}/api/v1/me/update`, userData, config
        );
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_PROFILE_FAIL, payload:error.response.data.message})
    }
}

export const updatePassword = (passwords)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST})

        // const config = {headers: { "Content-Type":"application/json","token":localStorage.getItem("token")}}
        const config = {headers: { "Content-Type":"application/json"}}

        const {data}= await axios.put(`${backendLink}/api/v1/password/update`, passwords, config
        );
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL, payload:error.response.data.message})
    }
}

export const forgotPassword = (email)=> async(dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST})

        const config = {headers: { "Content-Type":"application/json"}}

        const {data}= await axios.post(`${backendLink}/api/v1/password/forgot`,
        email,
        config
        );

        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message})

    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL, payload:error.response.data.message})
    }
}

export const resetPassword = (token,passwords)=> async(dispatch)=>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST})

        const config = {headers: { "Content-Type":"application/json"}}

        const {data}= await axios.put(`${backendLink}/api/v1/password/reset/${token}`,
        passwords,
        config
        );

        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success})

    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL, payload:error.response.data.message})
    }
}

export const getAllUsers = ()=> async(dispatch)=>{
    try {
        dispatch({type:ALL_USERS_REQUEST})

        // const config = {headers: {"token":localStorage.getItem("token")}}
        //  const {data}= await axios.get(`${backendLink}/api/v1/admin/users`,config);
         const {data}= await axios.get(`${backendLink}/api/v1/admin/users`);
        dispatch({type:ALL_USERS_SUCCESS,payload:data.users})
    } catch (error) {
        dispatch({type:ALL_USERS_FAIL, payload:error.response.data.message})
    }
  }

  export const getUserDetails = (id)=> async(dispatch)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST})
        
        // const config = {headers: {"token":localStorage.getItem("token")}}
        //  const {data}= await axios.get(`${backendLink}/api/v1/admin/user/${id}`,config);
         const {data}= await axios.get(`${backendLink}/api/v1/admin/user/${id}`);
        //  console.log('data', data)
        dispatch({type:USER_DETAILS_SUCCESS,payload:data.user})
    } catch (error) {
        dispatch({type:USER_DETAILS_FAIL, payload:error.response.data.message})
    }
  }

  export const updateUser = (id,userData)=> async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USER_REQUEST})

        // const config = {headers: { "Content-Type":"application/json","token":localStorage.getItem("token")}}
        const config = {headers: { "Content-Type":"application/json"}}

        const {data}= await axios.put(`${backendLink}/api/v1/admin/user/${id}`, userData, config
        );
        dispatch({type:UPDATE_USER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL, payload:error.response.data.message})
    }
}

export const deleteUser = (id)=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_USER_REQUEST})

        // const config = {headers: {"token":localStorage.getItem("token")}}
        const {data}= await axios.delete(`${backendLink}/api/v1/admin/user/${id}`);
        dispatch({type:DELETE_USER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL, payload:error.response.data.message})
    }
}

export const clearErrors = ()=> async (dispatch) =>{
    dispatch({ type:CLEAR_ERRORS})
}