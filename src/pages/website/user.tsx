import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get } from "../../api/user";
const DetailUser: React.FC = () => {
    const { id } = useParams();
    console.log(id);
    const [user, setUser] = useState<any>();
    useEffect(() => {
        const getUser = async (_id: any) => {
            const { data } = await get(_id);
            setUser(data[0])
            console.log(data[0])
        };
        getUser(id)
    }, [])
    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">Thông Tin User</h2>
            </div>
            <div className="table-responsive">
                {
                    (user)?(
                       <div>
                           <div>
                               <ul>
                                   <li>Name: <span>{user.name}</span></li>
                                   <li>Email: <span>{user.email}</span></li>
                                   <li>Password: <span>{user.hashed_password}</span></li>
                                   <li>Ảnh:<span><img src={user.img} /></span></li>
                               </ul>
                           </div>
                       </div>
                    ):(
                        <div>
                            Loading
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DetailUser;