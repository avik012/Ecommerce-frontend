import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import { updateUser, clearErrors, getUserDetails } from "../../actions/userAction";
import MailOutline from "@mui/icons-material/MailOutline";
import Person from "@mui/icons-material/Person";
import VerifiedUser from "@mui/icons-material/Person";
import { Loader } from "../layout/Loader/Loader";

const UpdateUser = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id:userId } = useParams();

  
  // dispatch(getUserDetails(userId));
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading:updateLoading, error:upadateError, isUpdated } = useSelector((state) => state.profile);
//  console.log('user', user,userId)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if(user && user._id !== userId){
        dispatch(getUserDetails(userId))
    }else{
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    } 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (upadateError) {
        alert.error(error);
        dispatch(clearErrors());
      }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated,user,userId,upadateError]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("role", role);
    myForm.set("email", email);

    dispatch(updateUser(userId,myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? <Loader/> :(
            <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <Person />
              <input
                type="text"
                placeholder=" Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUser />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                
              </select>
            </div>

           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false || role === "" ? true: false}
            >
              Update 
            </Button>
          </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser