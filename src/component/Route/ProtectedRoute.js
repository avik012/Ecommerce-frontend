import React from 'react'
import { useSelector } from 'react-redux'
import {  Outlet ,Navigate} from 'react-router-dom'

// const ProtectedRoute = ({ component:Component, ...rest }) => {
// const { loading, isAuthenticated,} =useSelector(state=>state.user)
// const Redirect=redirect();
//   return (
//     <>
//     {!loading && (
//         <Route 
//         {...rest}
//         render={(props)=>{
//             if(isAuthenticated === false){
//                 return <Redirect to="/login" />
//             }
//             return <Component {...props} />
//         }}
//         />
//     )}
//     </>
//   )
// }


const ProtectedRoute = ({isAuthenticated, isAdmin}) => {
  const {user, loading} = useSelector((state)=>state.user)
  // console.log('isAuthenticated', isAuthenticated)
  if(loading === false){
    if(isAuthenticated === false){ 
      return < Navigate to={"/login"} />
    }
    if(isAdmin === true && user.role !== "admin"){
      return < Navigate to={"/login"} />
    }
  }
  return <Outlet />;
  
}

export default ProtectedRoute
