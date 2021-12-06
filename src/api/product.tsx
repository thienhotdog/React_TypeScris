import { IProduct } from "../model/product";
import instance from "./instance"

export const getAll = () =>{
    const url = "/products";
    return instance.get(url)
}

export const add= (item:IProduct) =>{
    const url = "/product";
    return  instance.post(url, item)
}

export const remove = (id:number) =>{
    const url = `/product/${id}`;
    return instance.delete(url)
};

export const edit = (item:IProduct) => {
    const url = `/product/${item._id}`;
    return instance.patch(url, item);
  };
  
export const get = (id:number) => {
    const url = `/product/${id}`;
    return instance.get(url);
};
export const sortProduct = ({min,max}:any) =>{
    const url = `/product?min=${min}&max=${max}`;
    return instance.get(url)
}

export const filterProduct = (value:string) =>{
    const url = `/productss?name=${value}`;
    return instance.get(url);
}
export const getProductCate = (id:number) =>{
    const url = `/category/${id}/products`;
    return instance.get(url)
}