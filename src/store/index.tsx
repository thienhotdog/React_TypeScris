import { configureStore } from '@reduxjs/toolkit';
import authSlide from '../slide/authSlide';
import cartSlide from '../slide/cartSlide';
import categorySlide from '../slide/categorySlide';
import orderSlide from '../slide/order';
import productSlide from '../slide/productSlide';
import userSlide from '../slide/userSlide';
const store = configureStore({
  reducer: {
    product: productSlide.reducer,
    category: categorySlide.reducer,
    user: authSlide.reducer,
    cart: cartSlide.reducer,
    order: orderSlide.reducer,
    users: userSlide.reducer
  },
})

export default store;