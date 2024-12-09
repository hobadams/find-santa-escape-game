import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Item = "card" | "morse-code";

export interface BagState {
  items: Item[];
}

const initialState: BagState = {
  items: ["card"],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = bagSlice.actions;

export default bagSlice.reducer;
