import { RootState } from '@/state/store'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatDate, Message, Phone } from '@/components/Phone/Phone'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export const Route = createLazyFileRoute('/_index/intro/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center p-8">

      <Dialog open={!open}>

        <DialogContent className="text-center">
          <DialogTitle className="sr-only">New message</DialogTitle>
          <h3 className="font-bold text-xl">BUZZ BUZZ BUZZ!!</h3>

          <div className="flex gap-4 items-center">
            <img src="/images/eddy.webp" alt="Phone" className="w-[60px] h-[60px] rounded-full" />
            <p>You have a new message from Eddy the Elf</p>
          </div>

          <Button onClick={() => setOpen(true)} className="mt-4">Read Message</Button>
        </DialogContent>
      </Dialog>

      {open ? (<><Intro />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7, duration: 0.2 }}
        >
          <Link href="/game/step/1" className={cn(buttonVariants())}>
            Help Eddy find Santa
          </Link>
        </motion.div>
      </>) : null}
    </div>
  )
}

const Intro = () => {
  const { name = 'User' } = useSelector((state: RootState) => state.config)

  const now = new Date()
  const initialMessages: Message[] = [
    {
      sender: 'Eddy the Elf',
      text: `🌲 Hey ${name}, how have you been?`,
      time: formatDate(new Date(now.setDate(now.getDate() - 1))),
      type: 'sender',
    },
    {
      sender: name,
      text: "😄 I'm good thanks Eddy. I was thinking the other day, do elves have a favorite type of music?",
      time: formatDate(new Date(now.setDate(now.getDate()))),
      type: 'receiver',
    },
    {
      sender: 'Eddy the Elf',
      text: "🎵 Absolutely! We're big fans of wrap music.",
      time: formatDate(new Date(now.setDate(now.getDate()))),
      type: 'sender',
    },
    {
      sender: name,
      text: "🎁 Wrap music? That's hilarious! Thanks for the chuckle, Eddy.",
      time: formatDate(new Date(now.setDate(now.getDate()))),
      type: 'receiver',
    },
  ]

  const finalMessages: Message[] = [
    {
      sender: 'Eddy the Elf',
      text: '🚨 HELP NEEDED! 🚨',
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: 'Santa is missing! 😱',
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: "We last saw him on his present delivery route 🎁, but he's vanished without a trace.",
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: 'The last known location was at number 666 Nightmare Street. I desperately need your help to find him before Christmas is ruined. 🎄💩',
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: '....',
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: '🦌🔴',
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: "I have Rudolph pestering me...If we don't get back on track in an hour Santa won't have time to deliver to everyone. Please help me.",
      time: formatDate(new Date()),
      type: 'sender',
    },
    {
      sender: 'Eddy the Elf',
      text: 'If you need a hand just text me....',
      time: formatDate(new Date()),
      type: 'sender',
    },
  ]

  return (
    <Phone
      initialMessages={initialMessages}
      finalMessages={finalMessages}
      start={true}
      sameDay={false}
    />
  )
}
