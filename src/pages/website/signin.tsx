import React from "react";
import { useForm } from "react-hook-form";
import { isAuthenticated } from "../../auth/util";
import { Navigate } from "react-router-dom";
import { User } from "../../model/user";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { signins } from "../../slide/authSlide";





const Signin: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (user: User) => {
    const response:any =  await dispatch(signins(user));
      if(response.payload.msg ){
        toast(response.payload.msg)
      }
  };
  const {user} = isAuthenticated();
  const redirectUser = () => {
      if (user && user.role === 1) {
        return <Navigate to="/admin" />;
      }
      if (user !== undefined) {
        return <Navigate to="/" />;
      } 
  };
  return (
    <div className="wrapper fadeInDown" style={{"paddingTop":"80px"}}>
    <ToastContainer />
    <div id="formContent">
      {redirectUser()}
      <h2> Đăng nhập</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label >Email</label>
            <br/>
            <input type="email" className="input" {...register("email", {required : true})} />
          </div>
          <br/>
          {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
          <div>
            <label >Password</label>
            <br/>
            <input type="password" className="input" {...register("password", {required : true})} />
           
          </div>
            <br/>
          {errors.password && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
          <br/>
          <button type="submit" className="fadeIn fourth btn btn-primary" style={{"marginBottom":"20px"}}>Đăng Nhập</button>
      </form>
    </div>
  </div>
  );
};

export default Signin;