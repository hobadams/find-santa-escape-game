import { configureStore, combineReducers } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import bagReducer from "./bagSlice";
import stepReducer from "./stepSlice";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "@/util/stateToLocalStorage";

export const RESET_GAME_ACTION = "RESET_GAME";

// Combine all slice reducers
const appReducer = combineReducers({
  config: configReducer,
  bag: bagReducer,
  step: stepReducer,
});

// Create a root reducer that listens for the RESET_STATE action
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === RESET_GAME_ACTION) {
    state = undefined; // Reset the entire state
  }
  return appReducer(state, action);
};

// Load initial state from local storage
const preloadedState = loadStateFromLocalStorage();

// Configure the store with the root reducer and preloaded state
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Save Redux state to local storage whenever it changes
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
