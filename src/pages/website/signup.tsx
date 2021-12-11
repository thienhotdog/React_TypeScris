import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "../../api/auth";
import { User } from "../../model/user";
import { ToastContainer, toast } from 'react-toastify';



const Signup: React.FC = () => {
    const { register, handleSubmit, reset ,formState:{errors}  } = useForm();
    const [success, setSuccess] = useState(false);
    const onSubmit = async (user:User) => {
      try {                               
        await signup(user);
        setSuccess(true);
        reset(user);
      } catch (error:any) {
        toast("email đã có người sử dụng")
      }
    };
    return (
      <div className="wrapper fadeInDown" style={{"paddingTop":"80px"}}>
      <ToastContainer />
   <div id="formContent">
     {/* Tabs Titles */}
     {/* Icon */}
     <div className="fadeIn first">
         <h2>Đăng ký</h2>
     </div>
     {success && (
         <div className="input">
           Bạn đã đăng ký thành công. Click <Link to="/signin">vào đây</Link> để
           login
         </div>
       )}
     {/* Login Form */}
     <form onSubmit={handleSubmit(onSubmit)}> 
     <div>
         <label className="form-label">Name</label>
         <br/>
         <input type="text"  className="input" {...register("name", {required : true})} />
       </div>
       {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
       <div>
         <label className="form-label">Email</label>
         <br/>
         <input type="email"  className="fadeIn second input" {...register("email", {required : true})} />
       </div>
       {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
       <div>
         <label className="form-label">Mật khẩu</label>
         <br/>
         <input type="password"  className="fadeIn third input" {...register("password", {required : true})} />
       </div>
       {errors.password && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
       <br />
       <button type="submit" className="fadeIn fourth btn btn-primary" style={{"marginBottom":"20px"}}>Đăng Ký</button>
     </form>  
   </div>
 </div>
    );
  };
  
  export default Signup;