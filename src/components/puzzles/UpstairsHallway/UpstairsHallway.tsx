import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { addItem } from "@/state/bagSlice";
import { setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const UpstairsHallway = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addItem('carrot'))
    dispatch(setStepCompleted(step));
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/images/upstairs-hallway.webp" alt="Upstairs Hall" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>After walking up the stairs you find yourself in a long hallway.</p>
          <p>That's odd... there is a <strong>carrot</strong> on the floor. Seems odd, you decide to put it in your bag.</p>
          <SidebarTrigger className="mx-auto mt-4" />
        </div>


        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You hear jingling in the room to the right.....could it be Santa?</p>
        </div>


        <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants(), 'w-full')}>Go to the room on the right</Link>

      </div>
    </div>

  )
}
