import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const SewingRoom = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStepCompleted(step))
  }, [])


  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/images/christmas-ghost.webp" alt="sewing room" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You walk into a sewing room that looks more like an attic. Right in front of you is the cutest looking ghost...</p>
          <p><strong>"Ho Ho Ho"</strong></p>
          <p>"I am Voodoo boo boo.....the baddest ghost in town"</p>
          <p>"Solve my puzzle or be trapped here forever!!!!"</p>
        </div>

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You struggle to take them seriously but decide you might as well solve the puzzle!</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants(), 'mt-4')}>"Ok Voodoo Boo Boo...hit me with it"</Link>
        </div>

      </div>
    </div>

  )
}
