import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemCount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    addToCart: (state, {payload}) => {        
        const item = state.cartItems.findIndex(item => item.id === payload.id)
        if(item > -1){
            state.cartItems[item]["amount"] = state.cartItems[item]["amount"] + 1
        }
        else {
            state.cartItems.push({...payload, amount: 1})
        }
    },
    calculateTotal: (state) => {
      let itemCount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {        
        itemCount += item.amount;
        total += item.amount * item.price;
      });

      state.itemCount = itemCount;
      state.total = total.toFixed(2);
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal,addToCart } = cartSlice.actions

export default cartSlice.reducer
