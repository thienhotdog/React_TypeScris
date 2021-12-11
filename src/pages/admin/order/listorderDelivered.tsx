import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../slide/order";
import { Link } from "react-router-dom";
import { IProduct } from "../../../model/product";

const ListOrderDelivered = () => {
    const order = useSelector((state:any) => state.order.order);
    console.log(order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])
    return (
        <div className="table-responsive">
            <h2>chưa duyệt</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Tổng Giá</th>
                        <th scope="col">Ngày Đặt</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">chi tiết</th>
                    </tr>
                </thead>
              
                    {
                        (order) ? (
                      <tbody>
                            {order.map((item: IProduct, index:number) => {
                                if(item.status === "Đã Giao"){
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.updatedAt}</td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>
                                                <Link to={`/admin/order/${item._id}`}><i className="fas fa-info-circle"></i></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                                
                            })}
                            
                        </tbody>
                        ):(
                            <div>

                            </div>
                        )
                    }
            </table>
        </div>
    )
}

export default ListOrderDelivered;