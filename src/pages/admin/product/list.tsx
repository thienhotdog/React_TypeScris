import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IProduct } from "../../../model/product";
import { fetchProducts, removeFetchProduct } from "../../../slide/productSlide"
import { Table } from 'antd';
const ListProduct: React.FC = () => {
  const products = useSelector((state: any) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  console.log(products);
  const onHandleRemove = (item: number) => {
    const isConfirm = window.confirm("bạn có muốn xóa không ?");
    if (isConfirm) {
      dispatch(removeFetchProduct(item))
    }
  }

  const columns = [

    {
      title: "#",
      dataIndex: "#",
      key: "#"
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img: string) => <img className="img" src={img} />
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text: string, item: IProduct) => (
        <div>
          <Link to={`/admin/product/${item._id}`} className="btn btn-primary">Edit</Link>
          <button onClick={() => onHandleRemove(item._id)} className="btn btn-danger">Delete</button>
        </div>
      ),
    },

  ]

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">Quản lý sản phẩm</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/admin/addproduct" className="btn btn-sm btn-outline-primary">
            Thêm sản phẩm
          </Link>
        </div>
      </div>
      <div className="table-responsive">

        <Table
          pagination={false}
          dataSource={products}
          columns={columns}
          rowKey={products => products._id}
        />
      </div>
    </div>
  )
}

export default ListProduct;