import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Step = {
  key: number;
  completed: boolean;
};

export interface StepState {
  currentStep?: number;
  steps: Step[];
}

const initialState: StepState = {
  steps: Array.from({ length: 20 }, (_, index) => ({
    key: index + 1,
    completed: false,
  })),
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepCompleted: (state, action: PayloadAction<number>) => {
      const step = state.steps.find((step) => step.key === action.payload);
      if (step) {
        step.completed = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentStep, setStepCompleted } = stepSlice.actions;

export default stepSlice.reducer;
