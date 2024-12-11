import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop";
import { addItem } from "@/state/bagSlice";



export const KidsRoom = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const correctOrder = ['pear', 'dove', 'chicken', 'bird', 'rings', 'egg', 'swan', 'milk', 'dancing', 'jump', 'flute', 'drum'];

  const items = correctOrder.slice().sort(() => Math.random() - 0.5);

  const handleSubmit = (items: string[]) => {

    const isCorrectOrder = items.every((item, index) => item === correctOrder[index]);

    if (isCorrectOrder) {
      dispatch(addItem('gnome'));
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
          <DialogTitle className="font-bold text-xl">CLICK!</DialogTitle>
          <p>The door in front unlocks</p>
          <p>You notice a sad looking <strong>gnome</strong> on the floor...why not take a souvenir...you put it in your bag.</p>
          <p>...let's get out of here....this rooms gives me the creeps.</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Go through the door</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/kids-room.webp" alt="kids-room" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You walk into a children's bedroom</p>
          <p>The jingling stops and you get a strange feeling the toys are watching you...👀</p>
          <p><strong>CLICK</strong> the doors lock....</p>
          <p className="mb-4">A child's voice whispers..</p>
          <p>"You must put the toys in the correct order to leave"</p>
        </div>

        <DragAndDrop onSubmit={handleSubmit} buttonText="Complete" items={items} />

        {hasError ? (
          <p className="text-red-500 mt-4">Hmmm, that doesn't seem right</p>
        ) : null}



      </div>
    </div>

  )
}