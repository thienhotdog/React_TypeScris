import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Category } from "../../../model/category";
import { getAll, removeCategory } from "../../../slide/categorySlide";
const ListCategory: React.FC = () => {
    const category = useSelector((state:any) => state.category.category);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getAll())
    },[])
    const handRemove = (slug:string) =>{
        const isConfirm = window.confirm("bạn có muốn xóa không ?");
        if(isConfirm){
          dispatch(removeCategory(slug))
        }
      }
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">Quản lý danh mục</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to="/admin/addcategory" className="btn btn-sm btn-outline-primary">
                        Thêm danh mục
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item:Category, index:number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={() => handRemove(item.slug)} className="btn btn-danger" >delete </button>
                                    <Link to={`/admin/category/${item.slug}`} className="btn btn-primary">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListCategory;