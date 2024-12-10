import { addItem } from "@/state/bagSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const LivingRoom = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addItem('naughty'));
    dispatch(addItem('nice'));
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/images/living-room.webp" alt="Living room" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>You enter the <strong>living room</strong>.</p>
          <p>You notice 2 lists on the floor. They appear to be Santa's nice and naughty lists...but they're smudged. You put them in your bag.</p>
          <p>You then notice a 4 digit padlock on the door...</p>
        </div>

        <img src="/images/living-room-door.webp" alt="Padlock" className="w-[300px] h-[300px] mx-auto" />



      </div>
    </div>

  )
}
