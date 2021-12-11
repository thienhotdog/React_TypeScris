import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, edit, get, getAll } from "../api/order"
import { Order } from "../model/order";
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
    async (_id:any) => {
        const { data } = await get(_id);
        return data
    }
)


export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async (item:Order) =>{
        const {data} = await edit(item);
        console.log(data);
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
        });
        builder.addCase(updateOrder.fulfilled, (state,action) =>{
            const newOrder:any = state.order.map((order:Order) =>
            order._id === action.payload._id ? action.payload : order
            ) 
           state.order = newOrder
        })
    }
})


export default orderSlide;