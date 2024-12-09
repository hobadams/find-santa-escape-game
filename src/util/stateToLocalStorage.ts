import { RootState } from "@/state/store";

const STATE_KEY = "appState";

// localStorageUtils.ts
export const saveStateToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (e) {
    console.error("Failed to save state:", e);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined; // Let Redux initialize state
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Failed to load state:", e);
    return undefined;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STATE_KEY);
  } catch (e) {
    console.error("Failed to clear local storage:", e);
  }
};
