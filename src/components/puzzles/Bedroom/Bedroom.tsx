import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { addItem } from "@/state/bagSlice";
import { setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const Bedroom = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    dispatch(addItem('fur'))
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the default form submission behavior
    setHasError(false);

    const form = event.currentTarget
    const input = form.elements.namedItem('answer') as HTMLInputElement // Explicitly cast to HTMLInputElement
    const answer = input?.value

    if (answer && answer.toLowerCase() === 'incubate') {
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
          <DialogTitle className="font-bold text-xl">HO HO HO....you're smart! 🤓</DialogTitle>
          <p>You hear a deep laugh from the next room....could it be Santa??</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Go to the next room</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/bedroom.png" alt="Bedroom" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>As you walk through the door you notice a tuft of <strong>fur</strong> caught on the handle. It looks suspicious so you put it in your bag.</p>
          <SidebarTrigger className="mx-auto mt-4" />
        </div>

        <div className="bg-white p-8 rounded text-center text-black w-full">
          <p>They left the TV on....<strong>the 1% Club</strong>....</p>
          <p>Better solve this before you keep exploring.</p>
          <form className="flex items-center gap-4 mt-4" onSubmit={handleSubmit}>
            <Input name="answer" placeholder="Whats the answer?" />
            <Button type="submit">Shout answer out</Button>
          </form>

          {hasError ? (
            <p className="text-red-500 mt-4">Nothing happened, must have got it wrong.</p>
          ) : null}

        </div>


      </div>
    </div>

  )
}
