import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      state[itemId] = quantity;
    },
    incrementQuantity: (state, action) => {
      const { itemId, maxQuantity } = action.payload;
      if (!state[itemId]) {
        state[itemId] = 1;
      } else if (state[itemId] < maxQuantity) {
        state[itemId] += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      if (state[itemId] > 1) {
        state[itemId] -= 1;
      }
    },
    removeQuantity: (state, action) => {
      const itemId = action.payload;
      delete state[itemId];
    },
    clearQuantities: (state) => {
      Object.keys(state).forEach((key) => delete state[key]);
    },
  },
});

export const {
  setQuantity,
  incrementQuantity,
  decrementQuantity,
  removeQuantity,
  clearQuantities,
} = quantitySlice.actions;

export default quantitySlice.reducer;
