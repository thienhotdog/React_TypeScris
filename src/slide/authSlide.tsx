import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../api/auth";
import {  authenticate } from "../auth/util";
import { User } from "../model/user";


interface Cart {
    user: [],
    loading: boolean
}
const initialState = {
    user: [],
    loading: false
} as Cart




export const signins = createAsyncThunk(
    'auth/signin',
    async (user: User) => {
        try {
            const { data } = await signin(user);
            authenticate(data);
            return data
        } catch (error: any) {
        //    alert(error.response.data.msg);
            return error
        }
    }
)


const authSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signins.pending, (state, action) => {

        });
        builder.addCase(signins.rejected, (state, action) => {

        });
        builder.addCase(signins.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })


    }
})


export default authSlide;