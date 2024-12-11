import { formatDate, Message, Phone } from "@/components/Phone/Phone";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";
import { RootState } from "@/state/store";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Basement = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const { name = 'User' } = useSelector((state: RootState) => state.config)
  const [open, setOpen] = useState(false);


  const initialMessages: Message[] = [
    {
      sender: name, text: `EDDDDDDDYYYYY 😎😎😎`, time: formatDate(new Date()), type: 'receiver'
    },
    {
      sender: name, text: `I found Santa...`, time: formatDate(new Date()), type: 'receiver'
    },
    {
      sender: name, text: `But he's been cursed....he said you'd know how to lift the curse...`, time: formatDate(new Date()), type: 'receiver'
    },
  ]

  const finalMessages: Message[] = [
    {
      sender: 'Eddy the Elf', text: `Yooooooooooooo ${name}`, time: formatDate(new Date()), type: 'sender'
    },
    {
      sender: 'Eddy the Elf', text: `This is terrible news`, time: formatDate(new Date()), type: 'sender'
    },
    {
      sender: 'Eddy the Elf', text: `The only way to lift the curse is to say the name of who the person who cast it.`, time: formatDate(new Date()), type: 'sender'
    },
    {
      sender: 'Eddy the Elf', text: `I have no idea who would want to do this?`, time: formatDate(new Date()), type: 'sender'
    },
    {
      sender: name, text: `I'll get thinking Eddy....`, time: formatDate(new Date()), type: 'receiver'
    },
  ]

  return (
    <div className="flex h-screen">

      <Dialog open={open}>
        <DialogTrigger>
          <img src="/images/eddy.webp" alt="Eddy" className="w-[50px] h-[50px] rounded-full" />
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-800 flex justify-center flex-col items-center">

          <DialogTitle className="sr-only">Eddy the Elf</DialogTitle>
          <Phone initialMessages={initialMessages} finalMessages={finalMessages} start />

          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Next</Link>
        </DialogContent>
      </Dialog>

      <div className="flex-1">
        <img src="/images/santa.webp" alt="Entrance Hall" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p><strong>Santa....I know him</strong>.</p>
          <p>"{name}, you found me!! Me and this house have been <strong>CURSED</strong> and I cannot leave"</p>
          <p>"Please help me save Christmas and lift this curse"</p>
          <p>"Eddy will know how to lift this curse, he's a wizard....he was able to get rid of my beard rash....this will be nothing."</p>
        </div>

        <Button onClick={() => { setOpen(true); dispatch(setStepCompleted(step)); }} className="w-full">Text Eddy</Button>

      </div>
    </div>

  )
}
