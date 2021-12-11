import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrder } from "../../../slide/order";
import { IProduct } from "../../../model/product";

const OrderDetail = () => {
    const { id } = useParams();
    const order = useSelector((state:any) => state.order.order[0]);
    // const [product] = order.products;
    console.log(order)
    const dispatch = useDispatch();
    useEffect(() => {
        const orderId:any = id;
        dispatch(getOrder(orderId))
    },[])
    return (
        <div className="table-responsive">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">Tên</th>
                        <th scope="col">ảnh</th>
                        <th scope="">số lượng</th>
                        <th scope="col">Giá</th>
                    </tr>
                </thead>
                {(order) ? (
                    <tbody>
                        {order.products.map((item:IProduct, index:number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td><img src={item.img} className="shop-img" /></td>
                                <td>{item.cartQuantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody></tbody>
                )}
            </table>
        </div>
    )
}
export default OrderDetail;