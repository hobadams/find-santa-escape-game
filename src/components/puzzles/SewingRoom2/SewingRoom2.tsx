import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import WordSearch from "@/components/WordSearch/WordSearch";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { addItem } from "@/state/bagSlice";
import { setStepCompleted } from "@/state/gameSlice";
import { RootState } from "@/state/store";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SewingRoom2 = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const { name = 'User' } = useSelector((state: RootState) => state.config)
  const [completed, setCompleted] = useState(false)
  const [conversationStep, setConversationStep] = useState(1);


  const handleSubmit = () => {
    dispatch(addItem('note'))
    dispatch(setStepCompleted(step))
    setCompleted(true);
  }

  return (
    <div className="flex h-screen">
      <Dialog open={completed}>
        <DialogContent className="text-center">
          <DialogTitle className="font-bold text-xl sr-only">Thank you!</DialogTitle>
          {conversationStep === 1 ? (
            <>
              <p>"You are a lot smarter than the last idiot who came through here," said Voodoo Boo Boo</p>
              <p>"The last guy left this on the floor, can you bin it for me? I just tidied"</p>
              <p>Voodoo Boo Boo hands you a small piece of paper....it looks like jiberish but you put it in your bag anyway.</p>
              <SidebarTrigger className="mx-auto mt-4" />
              <Button onClick={() => setConversationStep(2)}>Next</Button>
            </>
          ) : (
            <>
              <p>"Can you check out the basement for me?"</p>
              <p>"It has the strange smell of mince pies, whisky and yellow snow!"</p>
              <p>"This laundry shoot will lead you right there."</p>
              <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Jump down the shoot</Link>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/christmas-ghost.webp" alt="sewing room" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>"I'm something you've known since you were small,"</p>
          <p>"I'm what people use to give you a call."</p>
          <p>"I'm not a secret, I'm easy to proclaim,"</p>
          <p>"What am I?"</p>
        </div>
        <WordSearch word={name.toUpperCase()} onComplete={handleSubmit} />
      </div>
    </div>

  )
}
