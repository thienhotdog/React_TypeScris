import { useForm, Resolver } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../../../api/product";
import { IProduct } from "../../../model/product";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../../slide/productSlide";
import { getAll } from "../../../slide/categorySlide";
import { Category } from "../../../model/category";
import "../../../firebase/firebase";
import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable  } from '@firebase/storage';
import { ToastContainer, toast } from 'react-toastify';

type FormValues = {
    name: string,
    price: number,
    img: string,
    cateId: string
  };  
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.name ? values : {},
      errors: !values.name
        ? {
            name: {
              type: "required",
              message: "This is required."
            }
          }
        : {}
    };
  };
  
  const EditProduct: React.FC = () => {
    //Sử dụng hook useParams để lấy ID từ url
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<FormValues>({ resolver });
    const category = useSelector((state:any) => state.category.category);
    useEffect(() =>{
      dispatch(getAll())
    },[])
    useEffect(() => {
        const getProduct = async (id:any) =>{
            try{
                const {data} = await get(id);
                console.log(data[0])
                reset(data[0])
            }catch(error){
                console.log(error)
            }
        }
        getProduct(id);
      }, []);

      const onSubmit = (data: IProduct) => {

        if(typeof data.img === "object"){
          const storage = getStorage();
          const img = data.img;
          const file:any = img[0];
          const storageRef = ref(storage, `images/${file.name}`);
          const UploadTask = uploadBytesResumable(storageRef, file);
          uploadBytes(storageRef, file).then(() => {
            getDownloadURL(UploadTask.snapshot.ref).then((url) => {
              data.img = url;
              dispatch(editProduct(data));
             toast("cập nhập sản phẩm thành công",{
                    onClose: () =>navigate("/admin/product")
                });
            })
          })
        }else{
          dispatch(editProduct(data));
          toast("cập nhập sản phẩm thành công",{
            onClose: () =>navigate("/admin/product")
        });
        }
      };
      return (
        <div>
          <ToastContainer />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">cập nhật sản phẩm</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                <label className="form-label">Tên sản phẩm</label>
                <input type="text" {...register("name", { required: true })} className="form-control"  />
                        {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
                        <br />
                </div>

                <div className="mb-3">
                <label className="form-label">Giá sản phẩm</label>
                <input type="number" {...register("price", {required: true})} className="form-control"  />
                    {errors.price && <span>bắt buộc phải nhập trường hợp này</span>}
                </div>

                <div className="mb-3">
                <label className="form-label">Ảnh</label>
                <br/>
                <input type="file" {...register("img", { required: true })}  />
                    {errors.img && <span>bắt buộc phải nhập trường hợp này</span>}
                </div>

                <div className="mb-3">
                <label className="form-label">CateId</label>
                <select className="form-control" {...register("cateId")}>
                    {category.map((item:Category,index:number) =>(
                      <option value={item._id} key={index}>{item.name}</option>
                    ))}
                </select>
                {errors.name && <span className="d-block mt-2 text-danger">
                Bắt buộc phải ấy link nhập trường này</span>}
                </div>
                <button type="submit" className="btn btn-primary">
                Cập nhật
                </button>
            </form>
        </div>
      );
    };
    
    export default EditProduct;