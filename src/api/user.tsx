import instance from "./instance";
import {User} from "../model/user";
export const getAll = () =>{
    const url = "/users";
    return instance.get(url)
};

export const get = (_id:number)=>{
    const url = `/user/${_id}`;
    return instance.get(url)
}

export const edit = (item:User) =>{
    const url  = `/user/${item._id}`;
    return instance.patch(url,item)
}

export const remove = (_id:number)=>{
    const url = `/user/${_id}`;
    return instance.delete(url)
}