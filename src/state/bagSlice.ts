import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type BagItem = 'snow-globe' | 'gnome' | 'carrot' | 'map' | 'nice' | 'naughty' | 'fur' | 'note';

export interface BagState {
  items: BagItem[];
}

const initialState: BagState = {
  items: ['snow-globe'],
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BagItem>) => {
      if (state.items.includes(action.payload)) return;
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = bagSlice.actions;

export default bagSlice.reducer;
