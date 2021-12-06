import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "../../api/auth";
import { User } from "../../model/user";




const Signup: React.FC = () => {
    const { register, handleSubmit, reset ,formState:{errors}  } = useForm();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const onSubmit = async (user:User) => {
      try {                               
        await signup(user);
        setSuccess(true);
        reset(user);
      } catch (error:any) {
        setError("đã tồn tại tài khoản ");
      }
    };
    return (
      <div className="col-6 mx-auto container">
        <h2 className="mt-2">Đăng ký tài khoản</h2>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Bạn đã đăng ký thành công. Click <Link to="/signin">vào đây</Link> để
            login
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
          <input type="text" className="form-control" {...register("name", {required : true})} />
          <label>Name</label>
        </div>
          <br/>
        {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
          <br/>
        <div className="form-floating">
          <input type="email" className="form-control" {...register("email", {required : true})} />
          <label>Email</label>
        </div>
        <br />
        {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
        <br/>
        <div className="form-floating">
          <input type="password" className="form-control" {...register("password", {required : true})} />
          <label >Password</label>
        </div>
          <br/>
        {errors.password && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
        <div>
          <label>
            <input type="checkbox"  /> Remember 
          </label>
        </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">Đăng ký</button>
      <Link className="w-100 btn btn-lg btn-primary mt-3" to="/signin">Về Đăng Nhập</Link>
      <Link className="w-100 btn btn-lg btn-primary mt-3" to="/" >Về Trang chủ</Link>
    </form>
      </div>
    );
  };
  
  export default Signup;