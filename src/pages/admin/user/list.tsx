import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, removeUser } from "../../../slide/userSlide";
import { Link } from "react-router-dom";
import { Table } from 'antd';
import { User } from "../../../model/user";
const ListUser: React.FC = () => {
    const users = useSelector((state: any) => state.users.user);
    console.log(users);
    const dispath = useDispatch();
    useEffect(() => {
        dispath(getAllUser())
    }, [])
    const onHandleRemove = (_id: number) => {
        const isConfirm = window.confirm("bạn có muốn xóa không ?");
        if (isConfirm) {
            dispath(removeUser(_id))
        }
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Ảnh",
            dataIndex: "img",
            key: "img",
            render: (img: string) => <img className="img" src={img} />
        },
        {
            title: "Chức",
            dataIndex: "Chức",
            key: "role",
            render: (text: string, item: User) => {
                if (item.role === 1) {
                    return (
                        <p>Quản Trị Viên</p>
                    )
                } else {
                    return (
                        <p>Người Dùng</p>
                    )
                }
            }
        },
        {
            title: "Action",
            dataIndex: "Chức",
            key: "role",
            render: (text: string, item: User) => (
                <div>
                    <button onClick={() => onHandleRemove(item._id)} className="btn btn-danger">Delete</button>
                </div>
            ),
        }
    ]
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">Quản lý User</h2>
            </div>
            <div className="table-responsive">

                <Table
                    pagination={false}
                    dataSource={users}
                    columns={columns}
                    rowKey={products => products._id}
                />
            </div>
        </div>
    )
}

export default ListUser;