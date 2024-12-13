import { RootState } from "@/state/store"
import { useDispatch, useSelector } from "react-redux"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { formatDate, Message, Phone } from "../Phone/Phone"
import { useClue } from "@/state/gameSlice"


export const Clue = () => {
  const { currentStep } = useSelector((state: RootState) => state.game)
  const { name } = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()
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
    { sender: 'Eddy the Elf', text: `Hey ${name}, need a hand?`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `Hi ${name}, can I help you out?`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `Hello ${name}, do you want some assistance?`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `${name}, let me lend you a hand!`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `Hey ${name}, looks like you could use some help.`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `${name}, how about a little elf magic to assist you?`, time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: `Need a hand, ${name}? I'm here to help!`, time: formatDate(new Date()), type: 'sender' },
  ];

  const replies: Message[] = [
    { sender: `${name}`, text: `Yes, please, Eddy! You're a lifesaver!`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `Thanks, Eddy, I really need the help!`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `I'd appreciate it, Eddy. Thank you!`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `Yes, Eddy, I could definitely use a hand.`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `Sure thing, Eddy. That'd be amazing!`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `Absolutely, Eddy. I owe you big time!`, time: formatDate(new Date()), type: 'receiver' },
    { sender: `${name}`, text: `Thanks, Eddy! I don't know what I'd do without you!`, time: formatDate(new Date()), type: 'receiver' },
  ];

  function getRandomMessage(messages: Message[]): Message {
    return messages[Math.floor(Math.random() * messages.length)] as Message;
  }

  const messages = getMessageFromStep(currentStep, name as string)

  let finalMessages: Message[] = []

  if (messages) {
    finalMessages = [
      getRandomMessage(replies),
      ...messages,
    ];
  } else {
    finalMessages = [
      getRandomMessage(replies),
      {
        sender: 'Eddy the Elf', text: `🤔 Hmmm, I'm stumped. Sorry I can't help 😔`, time: formatDate(new Date()), type: 'sender'
      },
    ];
  }




  return (
    <Dialog>
      <DialogTrigger>
        <img src="/images/eddy.webp" alt="Eddy" className="w-[50px] h-[50px] rounded-full" />
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-800 flex justify-center flex-col items-center">

        <DialogTitle className="sr-only">Eddy the Elf</DialogTitle>
        <Phone initialMessages={[getRandomMessage(initialMessages)]} finalMessages={finalMessages} start={getHelp} />
        {!getHelp ? <Button onClick={() => { setGetHelp(true); dispatch(useClue()) }} className="mt-4">Get Help</Button> : null}
      </DialogContent>
    </Dialog>
  )
}


const getMessageFromStep = (step: number, name: string): Message[] | null => {

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
    case 2:
      return [
        {
          sender: 'Eddy the Elf', text: 'I think you should just go to the pantry...time is not on your side! ⏰', time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 3:
      return [
        {
          sender: 'Eddy the Elf', text: 'Ewwww, this place is gross!!!', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'SUCKS to be you!', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'The contents of those shelves are super odd! Whoever lives here should try a vegan diet!', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `I don't even know what I'm LOOKING at but maybe if you work TOP DOWN it might help?!?`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `Peace ${name}`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 4:
      return [
        {
          sender: 'Eddy the Elf', text: `Seriously ${name}...you're cleaning right now!`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `....looks like I can't change your mind. Your Grandma 👵 taught you well.`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `If only you had something else that reminded you of her... 🤔🤔`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `That might jog your memory`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 5:
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
    case 6:
      return [
        {
          sender: 'Eddy the Elf', text: 'Wow that ghost is SCARY 👻 😨', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `We picked up a map of the first floor....`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `Maybe we can retrace our steps? 👣 Did the ghost say they were the ghost of past steps....sounds like a lame ghost 😝.`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 7:
      return [
        {
          sender: 'Eddy the Elf', text: 'What are you waiting for....the jingling came from the room on the right! It could be Santa', time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 8:
      return [
        {
          sender: 'Eddy the Elf', text: '🎵🎵 hmmm hmmm hmmm 🎵🎵', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `I can’t help you right now, ${name}. I've got a song in my head and I'm feeling festive.`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: '🎵 On the first day of Christmas: a partridge in a pear tree. 🎵', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: '🎵 Two turtle doves, three French hens, four calling birds. 🎵', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: '🎵 Five golden rings, six geese a-laying, seven swans a-swimming. 🎵', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: '🎵 Eight maids a-milking, nine ladies dancing, ten lords a-leaping. 🎵', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: '🎵 Eleven pipers piping, twelve drummers drumming, and a partridge in a pear tree! 🎵', time: formatDate(new Date()), type: 'sender'
        },
      ];
    case 9:
      return [
        {
          sender: 'Eddy the Elf', text: 'Damn, I hate this show....my husband always shouts the answers out before I can think.', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'I saw this one last week though...so you are in luck!!', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `I'll give you some clues...`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `Where do babies go if they're born a little too early?`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `What's it called when a hen sits on an egg...`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `C'mon ${name}... you gotta get it now....`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 10:
      return [
        {
          sender: 'Eddy the Elf', text: '🤣🤣🤣🤣', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'Voodoo boo boo...what kind of name is that?!?', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'They are WAY too cute to be dangerous!', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `Let's humour them anyway...`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 11:
      return [
        {
          sender: 'Eddy the Elf', text: `hmmmmm ${name} ${name} ${name}`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'That kind of looks like a word search', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'But what word is Voodoo Boo Boo after?', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `All I know is people use my name when they want me..."Eddy this, Eddy that"`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 12:
      return [
        {
          sender: 'Eddy the Elf', text: `This is awkward....text me in front of Santa so he can see too!`, time: formatDate(new Date()), type: 'sender'
        },
      ]
    case 13:
      return [
        {
          sender: 'Eddy the Elf', text: `This curse is strong ${name}`, time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'Did we pick up any clues or things that looked out of place?', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: 'Maybe check your bag', time: formatDate(new Date()), type: 'sender'
        },
        {
          sender: 'Eddy the Elf', text: `Also....why does it smell like Hay in this basement?`, time: formatDate(new Date()), type: 'sender'
        },
      ]

    default:
      return null
  }
}