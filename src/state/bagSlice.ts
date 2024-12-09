import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BagItem = "snow-globe" | "card" | "morse-code";

export interface BagState {
  items: BagItem[];
}

const initialState: BagState = {
  items: ["snow-globe"],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BagItem>) => {
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = bagSlice.actions;

export default bagSlice.reducer;
