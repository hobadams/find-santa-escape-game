import { RootState } from '@/state/store'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useResetApp } from '@/hooks/useResetApp'

export const Route = createLazyFileRoute('/_index/intro copy/')({
  component: RouteComponent,
})


const getCompletedTime = (start: string, end: string): string => {
  // Convert ISO timestamp strings to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Debugging logs to check the parsed dates
  console.log("Start Date Object:", startDate);
  console.log("End Date Object:", endDate);

  // Validate the created Date objects
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error(`Invalid ISO timestamp provided. Start: ${start}, End: ${end}`);
  }

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());

  // Convert to total seconds
  const totalSeconds = Math.floor(differenceInMilliseconds / 1000);

  // Extract minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Return the formatted time difference
  return `${minutes} minutes and ${seconds} seconds`;
};
function RouteComponent() {

  const { resetApp } = useResetApp()
  const { name = 'User' } = useSelector((state: RootState) => state.config)
  const { clueCount, startTime, completeTime } = useSelector((state: RootState) => state.game)

  console.log({ startTime, completeTime })
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Dialog open>
        <DialogContent className="text-center">
          <DialogTitle className="sr-only">Complete</DialogTitle>
          <h3 className="font-bold text-xl">YOU SAVED CHRISTMAS!!</h3>

          <img src="/images/logo.webp" alt="Escape Room" className="w-[300px] h-[300px] mx-auto mb-8 rounded-full" />

          <p>Well done {name}</p>

          <p>You used <strong>{clueCount}</strong> {clueCount === 1 ? 'clue' : 'clues'}</p>

          {startTime && completeTime && (<p>You saved Santa in <strong>{getCompletedTime(startTime, completeTime)}</strong></p>)}

          <Button onClick={() => resetApp()} className="mt-4">
            Play again.
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
