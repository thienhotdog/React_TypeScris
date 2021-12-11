import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, edit, get, getAll, getProductCate, remove, filterProduct, sortProduct } from "../api/product";
import { IProduct } from "../model/product";

interface ProductState {
    product: [],
    loading: boolean,
    min:number,
    max:number
}

const initialState ={
    product: [],
    loading: false,
    min:0,
    max: 0,
} as ProductState

export const fetchProducts = createAsyncThunk(
    "product/fetchProduct",
    async () =>{
        const {data} = await getAll();
        return data
    }
)


export const removeFetchProduct = createAsyncThunk(
    "product/removeProduct",
    async (_id:any) =>{
       const {data} = await remove(_id);
        return data
    }
)

export const addFetchProduct = createAsyncThunk(
    "product/addFetchProduct",
    async (item:IProduct) =>{
        try{
            const {data} = await add(item);
            return data
        }catch(error){
            console.log(error)
        }
    }
)

export const editProduct = createAsyncThunk(
    "product/editProduct",
    async (item:IProduct) =>{
        const {data} = await edit(item);
        return data
    }
) 

export const getCateProduct = createAsyncThunk(
    'product/getCategory',
    async (id:any) =>{
        try{
            const {data} = await getProductCate(id);
            return data
        }catch(error){
            console.log(error)
        }
    }
)

export const fillterProduct = createAsyncThunk(
    'product/filterProduct',
    async (value:string) =>{
        try{
          const {data} = await filterProduct(value);
          return data
        }catch(error){
            console.log(error)
        }
    }
)

export const getProduct = createAsyncThunk(
    '/product',
    async (id:any) =>{
        try{
            const {data} = await get(id);
            return data[0]
        }catch(error){
            console.log(error)
        }
    }
)

export const sortProducts = createAsyncThunk(
    '/product/sortProduct',
    async (sortData:any) =>{
        try{
            const {data} = await sortProduct(sortData);
            return data
        }catch(error){
            console.log(error)
        }
    }
)




const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.product = action.payload;
          });
          builder.addCase(removeFetchProduct.fulfilled, (state, action) =>{
              const newProducts:any = state.product.filter((item:any) => item._id !== action.payload._id);
              state.product = newProducts;
          });
          builder.addCase(addFetchProduct.fulfilled, (state:any, action) =>{       
              state.product = [...state.product, action.payload]
          });
          builder.addCase(editProduct.fulfilled, (state:any,action) =>{
            const newProducts = state.product.map((product:IProduct) =>
                product._id === action.payload._id ? action.payload : product
                ) 
                state.product = newProducts;
          });
    
          builder.addCase(getProduct.fulfilled, (state,action) =>{
              state.product = action.payload;
            //   console.log(action.payload[0]);
            //   state.loading = false;
          });
    
          builder.addCase(fillterProduct.fulfilled,(state,action)=>{
              state.product = action.payload
          });
          builder.addCase(getCateProduct.fulfilled, (state,action) =>{
              state.product = action.payload
          });
          builder.addCase(sortProducts.fulfilled, (state,action) =>{
              state.product = action.payload
          })

    }
  })

export default  productSlide;