import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { edit, getAllCategory, remove, add } from "../api/category";
import { Category } from "../model/category";


interface CategoryState {
    category: [],
    product:[],
    loading: boolean
}
const initialState ={
    category: [],
    product: [],
    loading: false
} as CategoryState


export const getAll = createAsyncThunk(
    'category/getAll',
    async () =>{
        try{
            const {data} = await getAllCategory();
            return data
        }catch(error){
            console.log(error)
        }
    }
)

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (item:Category) =>{
    try{
      const {data} = await add(item);
      return data
    }catch(error){
      console.log(error)
   
    }
  }
)

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async (item:Category) =>{
    try{
      const{data} = await edit(item);
      return data
    }catch(error){
      console.log(error)
    }
  }
)


export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (slug:string) =>{
    try{
      const {data} = await remove(slug)
      return data
    }catch(error){
      console.log(error)
    }
  }
)




const categorySlide = createSlice({
    name: 'category',
    initialState,
    reducers: {
      // fill in primary logic here
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state,action) =>{
            state.category = action.payload
        });
        builder.addCase(addCategory.fulfilled, (state:any,action) =>{
          state.category = [...state.category, action.payload]
        });
        builder.addCase(editCategory.fulfilled,(state:any,action) =>{
          const newCategory = state.category.map((category:Category) =>
              category._id === action.payload._id ? action.payload : category
              ) 
              state.category = newCategory;
        });
        builder.addCase(removeCategory.fulfilled,(state:any,action) =>{
          const newProducts = state.category.filter((item:Category) => item.slug !== action.payload.slug)
          state.category = newProducts;
        })
       
    }
})


export default categorySlide;

