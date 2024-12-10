import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";



export const Pantry = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    setHasError(false);

    const form = event.currentTarget
    const input1 = form.elements.namedItem('1') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer1 = input1?.value

    const input2 = form.elements.namedItem('2') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer2 = input2?.value

    const input3 = form.elements.namedItem('3') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer3 = input3?.value

    const input4 = form.elements.namedItem('4') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer4 = input4?.value

    if (answer1 === '0' && answer2 === '4' && answer3 === '1' && answer4 === '3') {
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
          <DialogTitle className="font-bold text-xl">DING!!!</DialogTitle>
          <p>The lock opens!</p>
          <p>And now you smell something worse.....the kitchen</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Enter the kitchen</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/pantry.webp" alt="Pantry" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You enter the <strong>pantry</strong>.</p>
          <p>It smells like 100 year old cheese between and old mans toes!! 🤢🤢🤢</p>
          <p>You notice an odd shrine like shelf and a note on the side.</p>
          <p>The door to the kitchen is locked with a heavy duty padlock...</p>
        </div>

        <img src="/images/pantry-note.webp" alt="note" className="w-[200px] h-[200px] mb-8" />

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Input name="1" type="number" step="1" max={9} min={0} className="w-[50px] h-[50px] bg-white" />
              <Input name="2" type="number" step="1" max={9} min={0} className="w-[50px] h-[50px] bg-white" />
              <Input name="3" type="number" step="1" max={9} min={0} className="w-[50px] h-[50px] bg-white" />
              <Input name="4" type="number" step="1" max={9} min={0} className="w-[50px] h-[50px] bg-white" />
            </div>

            <Button type="submit">Try the lock</Button>
          </form>

          {hasError ? (
            <p className="text-red-500 mt-4">click click! the lock doesn't budge</p>
          ) : null}
        </div>

      </div>
    </div>

  )
}
