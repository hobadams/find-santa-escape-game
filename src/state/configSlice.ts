import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  name?: string;
}

const initialState: ConfigState = {};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = configSlice.actions;

export default configSlice.reducer;
