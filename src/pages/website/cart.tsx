import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IProduct } from "../../model/product";
import { addToCart, decreaseCart, removeCartItem, clearCart, getTotals } from "./../../slide/cartSlide";

const ShopCart:React.FC = () => {
    const cart = useSelector((state:any) => state.cart);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getTotals({}))
    },[cart])
    const handleRemoveCart = (item:IProduct) => {
        const isConfirm = window.confirm("bạn có muốn xóa không ?");
        if(isConfirm){
            dispatch(removeCartItem(item))
        }
    }
    const handleDecreaseCart = (item:IProduct) => {
        dispatch(decreaseCart(item))
    }
    const handlIncreaseCart = (item:IProduct) =>{
        dispatch(addToCart(item))
    }
    const handleClearCart = () =>{
        const isConfirm = window.confirm("bạn có muốn xóa không ?");
        if(isConfirm){
           dispatch(clearCart({}))
        }
    }
    return (
        <div className="cart-container container">
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Chưa có sản phẩm nào</p>
                    <div className="start-shopping">
                        <Link to="/">
                            <i className="fas fa-arrow-left"></i>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Sản Phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Tổng giá</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item:IProduct, index:number) => (
                                <tr key={index}>
                                    <td><img src={item.img} style={{ width: 160 }} /></td>
                                    <td style={{"paddingTop":"66px"}}>{item.price}</td>
                                    <td className="cart-product-quantity" style={{"paddingTop":"66px"}}>
                                        <button className="btn btn-danger" style={{ "padding": "0px 5px 0px 5px" }}
                                            onClick={() => handleDecreaseCart(item)}
                                        >-</button>
                                        <span>{item.cartQuantity}</span>
                                        <button className="btn btn-primary" style={{ "padding": "0px 5px 0px 5px" }}
                                            onClick={() => handlIncreaseCart(item)}
                                        >+</button>
                                    </td>
                                    <td style={{"paddingTop":"66px"}}>{item.price * item.cartQuantity} VNĐ</td>
                                    <td style={{"paddingTop":"66px"}}>
                                        <button className="btn btn-danger" onClick={() => handleRemoveCart(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <button className="btn btn-danger" onClick={() => handleClearCart()} >Clear Cart</button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Tổng tiền</span>
                                <span className="amount">{cart.cartAmout} VNĐ</span>
                            </div>
                                <Link to="/checkout" className="btn btn-primary">
                                    Check out
                                </Link>
                            <div className="start-shopping">
                                <Link to="/">
                                    <i className="fas fa-arrow-left"></i>
                                    <span>Tiếp tục Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShopCart;