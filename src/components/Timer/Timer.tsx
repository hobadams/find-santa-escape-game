import { selectStartTime, setStartTime } from '@/state/gameSlice';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Timer = () => {
  const dispatch = useDispatch();
  const startTime = useSelector(selectStartTime);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

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