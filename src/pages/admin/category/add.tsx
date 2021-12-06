import { useEffect } from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Category } from "../../../model/category";
import { addCategory, getAll } from "../../../slide/categorySlide";
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
const AddCategory: React.FC = () => {
    const category = useSelector((state:any) => state.category.category);
    useEffect(() =>{
        dispatch(getAll())
    },[])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({ resolver });
    const onSubmit = (data: Category) => {
        var check = 0;
        category.forEach((element  : any) => {
            if(data.name == element.name ){
                check += 1
            }
        });
        if(check == 0){
            dispatch(addCategory(data));
            toast("thêm thành công",{
                onClose: () =>navigate("/admin/Category")
            });
        }else{
            toast("tên danh mục đã tồn tại")
        }
    }
    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                    <label className="form-label">Tên Danh Mục</label>
                    <input type="text" className="form-control" {...register("name", { required: true })} />
                    {errors.name && <span className="text-danger">bắt buộc phải nhập trường hợp này</span>}
                    <br />
                </div>
                <button className="btn btn-primary" >Thêm</button>
            </form>
        </div>
    )
}

export default AddCategory;