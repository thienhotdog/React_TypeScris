import { useForm, Resolver } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { get } from "../../../api/order";
import { getOrder, updateOrder } from "../../../slide/order";
type FormValues = {
  status: string
};
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.status ? values : {},
    errors: !values.status
      ? {
        status: {
          type: "required",
          message: "This is required."
        }
      }
      : {}
  };
};

const UpdateOrder: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormValues>({ resolver });
  const [product, setProduct] = useState<any>();
  useEffect(() => {
    const getProduct = async (id: any) => {
      try {
        const { data } = await get(id);
        setProduct(data[0])
        reset(data[0])

      } catch (error) {
        console.log(error)
      }
    }
    getProduct(id);
  }, []);
  const order = useSelector((state:any) => state.order.order);
  useEffect(() =>{
    dispatch(getOrder({id}))
  },[])
  const onSubmit = (data: any) => {
    dispatch(updateOrder(data));
    toast("Cập nhập trạng thái thành công",{
        onClose: () => navigate("/admin/listorder")
    });
  }
  return (
    <div>
      <ToastContainer />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">Cập Nhập Trạng Thái</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label className="form-label">Status</label>
          {
            (product) ?
              (
                (product.status === "Chưa Duyệt") ? (
                  <select {...register("status", { required: true })} className="form-control">
                    <option value="Chưa Duyệt" >Chưa Duyệt</option>
                    <option value="Đã Duyệt" >Đã Duyệt</option>
                  </select>
                ) : (product.status === "Đã Duyệt") ? (
                  <select {...register("status", { required: true })} className="form-control">
                    <option value="Đã Duyệt" >Đã Duyệt</option>
                    <option value="Đã Giao" >Đã Giao</option>
                  </select>
                ) : (
                  <select {...register("status", { required: true })} className="form-control">
                    <option value="Đã Giao" >Đã Giao</option>
                  </select>
                )
              ) : (
                <div>
                  loading
                </div>
              )

          }

        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;

   