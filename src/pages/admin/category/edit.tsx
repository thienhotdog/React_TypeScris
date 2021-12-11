import { useEffect, useState } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { get } from "../../../api/category";
import { Category } from "../../../model/category";
import { editCategory, getAll } from "../../../slide/categorySlide";
import { ToastContainer, toast } from 'react-toastify';
type FormValues = {
    name: string
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

const EditCategory: React.FC = () => {
    const { slug } = useParams();
    const categories = useSelector((state: any) => state.category.category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAll())
    }, [])
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({ resolver });

    useEffect(() => {
        const getCategory = async (slug: any) => {
            const { data } = await get(slug)
            reset(data[0])
        };
        getCategory(slug)
    },[])
    const navigate = useNavigate();
    const onSubmit = (data: Category) => {
        var check = 0;
        categories.forEach((element:any) => {
            if (data.name == element.name) {
                check += 1
            }
        });
        if (check == 0) {
            dispatch(editCategory(data));
            toast("Cập nhập danh mục thành công",{
                onClose: () =>navigate("/admin/Category")
            });
        } else {
            alert("tên danh mục đã tồn tại")
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">cập nhật sản phẩm</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Tên danh mục</label>
                    <input type="text" className="form-control" {...register("name", { required: true })} />
                </div>
                {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
                <button type="submit" className="btn btn-primary">
                    Cập nhật
                </button>
            </form>
        </div>
    )
}

export default EditCategory;