import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";



export const Entrance2 = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    setHasError(false);

    const form = event.currentTarget
    const input = form.elements.namedItem('answer') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer = input?.value

    if (answer && Number(answer) === 9) {
      dispatch(setStepCompleted(step))
      setCompleted(true);
    } else {
      setHasError(true);
    }
  }

  return (

    <div className="flex h-screen">

      <Dialog open={completed}>
        <DialogContent className="text-center">
          <DialogTitle className="font-bold text-xl">POOF!</DialogTitle>
          <p>The ghost disappeared in an instant and you hear a faint laughing.</p>
          <p>With a HUGE bang a set of stairs appears in the hallway....</p>
          <img src="/images/entrance-with-stairs.webp" alt="Entrance Hall" className="w-[450px] h-[450px] mx-auto mb-8" />
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Go upstairs</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/entrance-with-ghost.webp" alt="Entrance Hall" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You are back in the <strong>entrance hall</strong>.</p>
          <p>You see a ghostly apparition in from of you....</p>
        </div>

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>"ohhhhhhhhhh.....I am the ghost of past steps"</p>
          <p>"Only those who know my favourite number can access upstairsssssss."</p>
        </div>

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <form className="flex items-center gap-4" onSubmit={handleSubmit}>
            <Input name="answer" type="number" step="1" placeholder="Enter the ghosts favourite number" max={10} min={0} />
            <Button type="submit">Answer the ghost</Button>
          </form>

          {hasError ? (
            <p className="text-red-500 mt-4">The ghost screams at you..... that is NOT my favourite number!</p>
          ) : null}
        </div>

      </div>
    </div>

  )
}
