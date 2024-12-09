import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addItem } from "@/state/bagSlice";
import { setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Entrance = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addItem('map'));
    dispatch(setStepCompleted(2));
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/images/entrance.webp" alt="Entrance Hall" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You find yourself in a grand entrance hall.</p>
          <p>You look down and notice a <strong>map</strong> of the first floor. You decide it might be useful so you put it in your bag.</p>
          <img src="/images/bag.webp" className="w-12 h-12 rounded-full mx-auto my-2" />
        </div>


        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You also notice footsteps heading right in front of you towards what looks like a pantry...</p>
        </div>


        <Link href="/game/step/3" className={cn(buttonVariants(), 'w-full')}>Go to the pantry</Link>

      </div>
    </div>

  )
}
