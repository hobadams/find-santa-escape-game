import { RootState } from "@/state/store"
import { useSelector } from "react-redux"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { formatDate, Message, Phone } from "../Phone/Phone"


export const Clue = () => {
  const { currentStep } = useSelector((state: RootState) => state.game)
  const { name } = useSelector((state: RootState) => state.config)
  const [getHelp, setGetHelp] = useState(false)

  useEffect(() => {
    if (getHelp) {
      setGetHelp(false)
    }
  }, [currentStep])


  if (!currentStep) {
    return null
  }

  const initialMessages: Message[] = [
    {
      sender: 'Eddy the Elf', text: `Hey ${name}, do you want a hand?`, time: formatDate(new Date()), type: 'sender'
    },
  ];

  const messages = getMessageFromStep(currentStep)

  let finalMessages: Message[] = []

  if (messages) {
    finalMessages = [
      {
        sender: `${name}`, text: `Yes please Eddy....I owe you!`, time: formatDate(new Date()), type: 'receiver'
      },
      ...messages,
    ];
  } else {
    finalMessages = [
      {
        sender: `${name}`, text: `Yes please Eddy....I owe you!`, time: formatDate(new Date()), type: 'receiver'
      },
      {
        sender: 'Eddy the Elf', text: `🤔 Hmmm, I'm stumped. Sorry I can't help 😔`, time: formatDate(new Date()), type: 'sender'
      },
    ];
  }




  return (
    <Dialog>
      <DialogTrigger>
        <img src="/images/eddy.webp" alt="Eddy" className="w-[60px] h-[60px] rounded-full" />
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-800 flex justify-center flex-col items-center">
        <Phone initialMessages={initialMessages} finalMessages={finalMessages} start={getHelp} />
        {!getHelp ? <Button onClick={() => setGetHelp(true)} className="mt-4">Get Help</Button> : null}
      </DialogContent>
    </Dialog>
  )
}


const getMessageFromStep = (step: number): Message[] | null => {

  switch (step) {
    case 1:
      return [
        {
          sender: 'Eddy the Elf', text: 'Hmmm, maybe these tiles make up the name of who lives here? They could spell Santa but he lives in he North Pole. 🤔', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `I hope that helps ⭐⭐`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 3:
      return [
        {
          sender: 'Eddy the Elf', text: 'I guess only nice kids are allowed through this door...if only we could work out which list is which.', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `One more thought...`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `It's not like Santa to number his lists, I wonder why he did?`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    default:
      return null
  }
}