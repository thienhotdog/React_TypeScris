import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../../model/product";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFetchProduct, fetchProducts } from "../../../slide/productSlide";
import { useEffect } from "react";
import { getAll } from "../../../slide/categorySlide";
import { Category } from "../../../model/category";
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
const Addproduct: React.FC = () => {
    const dispatch = useDispatch();
    const product: any = useSelector((state: any) => state.product.product);
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    const category:any = useSelector((state: any) => state.category.category);
    useEffect(() =>{
        dispatch(getAll())
    },[])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({ resolver });
    const navigate = useNavigate();
    const onSubmit = (data: IProduct) => {
        const storage = getStorage();
        const img: any = data.img[0];
        const storageRef = ref(storage, `images/${img.name}`);
        const UploadTask = uploadBytesResumable(storageRef, img);
        uploadBytes(storageRef, img).then(() => {
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL);
                const newProducts: any = {
                    name: data.name,
                    price: data.price,
                    img: downloadURL,
                    cateId: data.cateId
                }
                var check = 0;

                product.forEach((element: any) => {
                    if (newProducts.name == element.name) {
                        check += 1
                    }
                });

                console.log(newProducts)
                if (check == 0) {
                    dispatch(addFetchProduct(newProducts));
                    toast("thêm thành công",{
                        onClose: () =>navigate("/admin/product")
                    });
                } else {
                    toast("sản phẩm đã tồn tại")
                }
            })
        })
    }
    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="form-control" {...register("name", { required: true })} placeholder="tên sản phẩm" />
                {errors.name && <span>bắt buộc phải nhập trường hợp này</span>}
                <br />
                <input type="number" className="form-control"  {...register("price", { required: true })} placeholder="giá" />
                {errors.price && <span>bắt buộc phải nhập trường hợp này</span>}
                <br />
                <input type="file" {...register("img", { required: true })} placeholder="ảnh" />
                {errors.img && <span>bắt buộc phải nhập trường hợp này</span>}
                <br />
                <div className="mb-3">
                    <label className="form-label">CateId</label>
                    <select className="form-control" {...register("cateId")}>
                        {category.map((item: Category, index: number) => (
                            <option value={item._id} key={index}>{item.name}</option>
                        ))}
                    </select>
                    {errors.name && <span className="d-block mt-2 text-danger">
                        Bắt buộc phải ấy link nhập trường này</span>}

                </div>
                <button >Thêm</button>
            </form>
        </div>
    )
}

export default Addproduct;