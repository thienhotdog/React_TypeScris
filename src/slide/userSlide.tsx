import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { edit, get, getAll, remove } from "../api/user";
import { User } from "../model/user";


export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async () =>{
        try{
            const {data} = await getAll();
            return data
        }catch(error){
            console.log(error)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_id:number) =>{
        const {data} = await get(_id);
        return data
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (item:User) =>{
        const {data} = await edit(item);
        return  data
    }
)

export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (_id:number) =>{
        const {data} = await remove(_id);
        return data
    }
)



const userSlide = createSlice({
    name: 'user',
    initialState:{user:[]},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state,action) =>{
            state.user = action.payload
        });
        builder.addCase(removeUser.fulfilled, (state, action) =>{
            const newProducts:any = state.user.filter((item:any) => item._id !== action.payload._id);
            state.user = newProducts;
        });
        builder.addCase(getUser.fulfilled,(state,action) =>{
            state.user = action.payload
        });
        builder.addCase(updateUser.fulfilled, (state:any,action) =>{
            const newUser = state.user.map((user:User) =>
                user._id === action.payload._id ? action.payload : user
                ) 
                state.user = newUser;
          });
    

    }
})


export default userSlide;