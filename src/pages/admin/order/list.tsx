import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../../slide/order";
import { Link } from "react-router-dom";
import { IProduct } from "../../../model/product";


const ListOrder: React.FC = () => {
    const order = useSelector((state: any) => state.order.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">Quản Lý Đơn Hàng</h2>
            </div>
            <div className="table-responsive">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"> #</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Tổng Giá</th>
                            <th scope="col">Ngày Đặt</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">chi tiết</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {
                        (order) ? (
                            <tbody>
                                {order.map((item: IProduct, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.createdAt}</td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>
                                                <Link to={`/admin/order/${item._id}`}><i className="fas fa-info-circle" style={{"paddingLeft": "20px"}}></i></Link>
                                            </td>
                                            <td>
                                                <Link to={`/admin/order/${item._id}`}>update</Link>
                                            </td>
                                        </tr>
                                    )
                                    // }
                                })}
                            </tbody>
                        ) : (
                            <div>
                                loading
                            </div>
                        )
                    }
                </table>

            </div>
        </div>
    )
}

export default ListOrder;


