import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, get, getAll } from "../api/order"
import { IProduct } from "../model/product";
export const addOrder = createAsyncThunk(
    'order/order',
    async (item:any) => {
        try {
            const { data } = await add(item);
            console.log(data);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)
export const getAllOrder = createAsyncThunk(
    'order/getAll0rders',
    async () => {
        try {
            const { data } = await getAll();
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (_id:number) => {
        const { data } = await get(_id);
        return data
    }
)

const orderSlide = createSlice({
    name: 'order',
    initialState: {
        error: "",
        loading: false,
        order: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.fulfilled, (state, action) => {
            state.order = action.payload
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.order = action.payload;
        });
        builder.addCase(getOrder.fulfilled, (state,action) =>{
            state.order = action.payload
        })
    }
})


export default orderSlide;