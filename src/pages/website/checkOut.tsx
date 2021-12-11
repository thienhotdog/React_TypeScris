import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../auth/util";
import { clearCart, getTotals } from "../../slide/cartSlide";
import { addOrder } from "../../slide/order";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { IProduct } from "../../model/product";

const CheckOut = () => {
    const cart = useSelector((state:any) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotals({}))
    }, [])
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data:IProduct) =>{
        const newProduct = {
            name: data.name,
            email: data.email,
            products: cart.cartItems,
            amount: cart.cartAmout,
            address: data.address,
            userId: user._id,
            status: "Chưa Duyệt"
        }
        console.log(newProduct);
        dispatch(addOrder(newProduct));
        dispatch(clearCart({}));
        toast("đặt hàng thành công",{
            onClose: () =>navigate("/")
        });

    }
    const {user} = isAuthenticated();
    return (
        <div className="container">
            <ToastContainer />
            <main>
                <div className="py-5 text-center">
                    <h2>Đặt Hàng</h2>
                </div>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Giỏ Hàng Của Bạn </span>
                            <span className="badge bg-primary rounded-pill">{cart.cartQuantity}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cart.cartItems.map((item:IProduct, index:number) => (
                                <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                    <div>
                                        <h6 className="my-0">
                                            {item.name}
                                            <span className="badge bg-primary rounded-pill">{item.cartQuantity}</span>
                                        </h6>
                                    </div>
                                    <span className="text-muted">{item.price * item.cartQuantity}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (VNĐ)</span>
                                <strong>{cart.cartAmout}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Địa chỉ thanh toán</h4>
                        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)} >
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" {...register("name", {required: true})} value={user.name} />
                                </div>
                                {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
                                <div className="col-12">
                                    <label  className="form-label">Email</label>
                                        <input type="text" className="form-control" {...register("email", {required: true})} value={user.email} />
                                </div>
                                {errors.email && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
                                <div className="col-12">
                                    <label  className="form-label">Address</label>
                                    <input type="text" className="form-control"  placeholder="1234 Main St" {...register("address", {required: true})} />
                                </div>
                                {errors.address && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
                            </div>
                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Đặt Hàng</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CheckOut;