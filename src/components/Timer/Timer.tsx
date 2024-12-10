import { selectStartTime, setStartTime } from '@/state/gameSlice';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useResetApp } from '@/hooks/useResetApp';
import { Button } from '../ui/button';
import { RootState } from '@/state/store';


const Timer = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.config)
  const startTime = useSelector(selectStartTime);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const { resetApp } = useResetApp()

  useEffect(() => {
    if (!startTime) {
      // If no start time, set it when the game starts
      dispatch(setStartTime(new Date()));
      return;
    }

    const calculateRemainingTime = () => {
      const start = new Date(startTime);
      const now = new Date();
      const elapsedTime = (now.getTime() - start.getTime()) / (1000 * 60); // Elapsed time in minutes
      const remaining = Math.max(0, Math.floor(60 - elapsedTime)); // 1 hour = 60 minutes
      setRemainingTime(remaining);
    };

    // Calculate remaining time immediately and then set an interval
    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch, startTime]);

  if (remainingTime !== null && remainingTime === 0) {
    return (
      <Dialog open>

        <DialogContent className="text-center">
          <DialogTitle className="sr-only">Game ended</DialogTitle>
          <h3 className="font-bold text-xl">You ran out of time</h3>

          <div className="flex gap-4 items-center">
            <img src="/images/eddy.webp" alt="Phone" className="w-[60px] h-[60px] rounded-full" />
            <p>{name}!!! You failed. You've made a lot of kids sad this Christmas. I hope you're happy!</p>
          </div>

          <Button onClick={() => resetApp()} className="mt-4">Start again</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="text-white">
      {remainingTime !== null ? (
        <p className="text-lg flex items-center gap-2"><Clock />{remainingTime} minutes left</p>
      ) : (
        null
      )}
    </div>
  );
};

export default Timer;