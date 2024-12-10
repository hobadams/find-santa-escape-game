import { RESET_GAME_ACTION } from '@/state/store';
import { clearLocalStorage } from '@/util/stateToLocalStorage';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';

export const useResetApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetApp = () => {
    // Clear local storage
    clearLocalStorage();

    // Reset Redux state
    dispatch({ type: RESET_GAME_ACTION });

    navigate({ to: '/' });
  };

  return { resetApp };
};
