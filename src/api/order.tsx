import { Order } from "../model/order";
import instance from "./instance";

export const add = (item:Order)  =>{
    const url = "/order";
    return instance.post(url,item)
}

export const getAll = () =>{
    const url = "/orders";
    return instance.get(url)
}

export const get = (_id:number) =>{
    const url = `/order/${_id}`;
    return instance.get(url)
}