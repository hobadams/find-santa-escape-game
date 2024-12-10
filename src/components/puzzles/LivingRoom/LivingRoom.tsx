import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { addItem } from "@/state/bagSlice";
import { setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const LivingRoom = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);


  useEffect(() => {
    dispatch(addItem('naughty'));
    dispatch(addItem('nice'));
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    setHasError(false);

    const form = event.currentTarget
    const input = form.elements.namedItem('answer') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer = input?.value

    if (answer && answer.toLowerCase() === 'star') {
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
          <DialogTitle className="font-bold text-xl">CLICK!!!</DialogTitle>
          <p>You unlocked the door and can see it leads back to the <strong>entrance hallway</strong>.</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Go to the hallway</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/living-room.webp" alt="Living room" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You enter the <strong>living room</strong>.</p>
          <p>You notice 2 lists on the floor. They appear to be Santa's nice and naughty lists...but they're smudged. You put them in your bag.</p>
          <p>You then notice a 4 digit padlock on the door...</p>
        </div>

        <img src="/images/living-room-door.webp" alt="Padlock" className="w-[300px] h-[300px] mx-auto mb-8" />

        <div className="bg-white p-8 rounded text-center text-black w-full">

          <form className="flex items-center gap-4" onSubmit={handleSubmit}>
            <Input name="answer" placeholder="Enter the 4 digit code" maxLength={4} minLength={4} />
            <Button type="submit">Enter the code</Button>
          </form>

          {hasError ? (
            <p className="text-red-500 mt-4">Nothing happened, try again.</p>
          ) : null}

        </div>

      </div>
    </div>

  )
}
