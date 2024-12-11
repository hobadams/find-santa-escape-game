import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setCompleteTime, setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const Basement2 = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    setHasError(false);

    const form = event.currentTarget
    const input = form.elements.namedItem('answer') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer = input?.value

    if (answer && answer.toLowerCase() === 'rudolph') {
      dispatch(setStepCompleted(step))
      dispatch(setCompleteTime(new Date().toISOString()))
      setCompleted(true);
    } else {
      setHasError(true);
    }
  }


  return (
    <div className="flex h-screen">
      <Dialog open={completed}>
        <DialogContent className="text-center">
          <DialogTitle className="font-bold text-xl">✨✨ POOF ✨✨</DialogTitle>
          <p>You and Santa are both magically teleported out of the house.</p>
          <p>You look back and see your childhood house not the mansion....were you there the whole time?!?</p>
          <p>Seems like that was a pretty powerful curse!!</p>
          <Link href={`/complete`} className={cn(buttonVariants())}>Finish</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/santa.webp" alt="Basement" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>Time is running out...</p>
          <p>Who would want to do this?</p>
          <p>What clues do I have??</p>
        </div>

        <div className="bg-white p-8 rounded text-center text-black w-full">

          <form className="flex items-center gap-4" onSubmit={handleSubmit}>
            <Input name="answer" placeholder="Who cursed Santa?" maxLength={20} minLength={1} />
            <Button type="submit">Shout the name</Button>
          </form>

          {hasError ? (
            <p className="text-red-500 mt-4">Nothing happened, now you look silly!!</p>
          ) : null}

        </div>

      </div>
    </div>

  )
}
