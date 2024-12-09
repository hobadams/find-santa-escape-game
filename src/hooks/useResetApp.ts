import { RESET_GAME_ACTION } from "@/state/store";
import { clearLocalStorage } from "@/util/stateToLocalStorage";
import { useDispatch } from "react-redux";

export const useResetApp = () => {
  const dispatch = useDispatch();
  const resetApp = () => {
    // Clear local storage
    clearLocalStorage();

    // Reset Redux state
    dispatch({ type: RESET_GAME_ACTION });
  };

  return { resetApp };
};
