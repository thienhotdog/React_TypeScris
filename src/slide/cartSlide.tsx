import { createSlice } from "@reduxjs/toolkit";


const cartSlide = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "")  : [],
        cartQuantity: 0,
        cartAmout: 0,
    },
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item:any) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const itemProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(itemProduct);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeCartItem(state, action) {
            const newCartItems = state.cartItems.filter(
                (cartItem:any) => cartItem._id !== action.payload._id
            )
            state.cartItems = newCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart(state, action) {
            const itemIdex = state.cartItems.findIndex(
                (cartItem:any) => cartItem._id === action.payload._id
            )
            if (state.cartItems[itemIdex].cartQuantity > 1) {
                state.cartItems[itemIdex].cartQuantity -= 1
            } else {
                state.cartItems[itemIdex].cartQuantity = 1 
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state, action) {
            state.cartItems =  [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state:any, action) {
            let { total, quantity } = state.cartItems.reduce((cartTotal:any, cartItem:any) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });
            state.cartQuantity = quantity;
            state.cartAmout = total;
        },
        clearCartQuantity(state, action){
            state.cartQuantity = 0;
            localStorage.removeItem('cartItems')
        }
    }

})

export const { addToCart, removeCartItem, decreaseCart, clearCart, getTotals, clearCartQuantity } = cartSlide.actions;

export default cartSlide