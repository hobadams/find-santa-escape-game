import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Step = {
  key: number;
  completed: boolean;
};

export interface GameState {
  currentStep?: number;
  startTime?: string; // Store as ISO string for serialization
  steps: Step[];
}

const initialState: GameState = {
  steps: Array.from({ length: 20 }, (_, index) => ({
    key: index + 1,
    completed: false,
  })),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepCompleted: (state, action: PayloadAction<number>) => {
      const step = state.steps.find(step => step.key === action.payload);
      if (step) {
        step.completed = true;
      }
    },
    setStartTime: (state, action: PayloadAction<Date>) => {
      state.startTime = action.payload.toISOString(); // Store as ISO string
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentStep, setStepCompleted, setStartTime } = gameSlice.actions;

export const selectStartTime = (state: { game: GameState }) => state.game.startTime;

export default gameSlice.reducer;
