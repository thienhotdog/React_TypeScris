import { useForm, Resolver } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import { User } from "../../model/user";
import { get } from "../../api/user";
import { updateUser } from "../../slide/userSlide";
type FormValues = {
    name: string,
    img: string
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                name: {
                    type: "required",
                    message: "This is required."
                },
                img: {
                    type: "required",
                    message: "This is required."
                }
            }
            : {}
    };
};


const UpdateUser: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({ resolver });
    useEffect(() => {
        const getUser = async (_id: any) => {
            const { data } = await get(_id);
            reset(data[0])
        };
        getUser(id)
    }, [])

    const onSubmit = (data: User) => {

        if (typeof data.img === "object") {
            const storage = getStorage();
            const img = data.img;
            const file: any = img[0];
            const storageRef = ref(storage, `images/${file.name}`);
            const UploadTask = uploadBytesResumable(storageRef, file);
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(UploadTask.snapshot.ref).then((url) => {
                    data.img = url;
                    dispatch(updateUser(data));
                    toast("c???p nh???p th??ng tin th??nh c??ng", {
                        onClose: () => navigate(`/user/${id}`)
                    });
                })
            })
        } else {
            dispatch(updateUser(data));
            toast("c???p nh???p th??ng tin th??nh c??ng", {
                onClose: () => navigate(`/user/${id}`)
            });
        }
    };
    return (
        <div>
            <ToastContainer />
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 className="h2">C???p Nh???p Th??ng Tin User</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">T??n s???n ph???m</label>
                    <input type="text" {...register("name", { required: true })} className="form-control" />
                </div>
                {errors.name && <span>b???t bu???c ph???i nh???p tr?????ng h???p n??y</span>}
                <div className="mb-3">
                    <label className="form-label">T??n s???n ph???m</label>
                    <br />
                    <input type="file" {...register("img", { required: true })} />
                </div>
                {errors.img && <span>b???t bu???c ph???i nh???p tr?????ng h???p n??y</span>}
                <button className="btn btn-primary">
                    C???p nh???t
                </button>
            </form>
        </div>
    )
}

export default UpdateUser;