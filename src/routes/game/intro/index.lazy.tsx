import { RootState } from '@/state/store';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Route = createLazyFileRoute('/game/intro/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Intro />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 10, duration: 0.2 }}>
        <Link href="/game/step/1" className={cn(buttonVariants())}>Help Eddie!</Link>
      </motion.div>
    </div>
  );
}

type Message = {
  sender: string;
  text: string;
  time: string;
  type: 'sender' | 'receiver';
};
const Intro = () => {
  const { name = 'User' } = useSelector((state: RootState) => state.config);
  const formatDate = (date: Date) =>
    `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

  const now = new Date();
  const initialMessages: Message[] = [
    { sender: 'Eddy the Elf', text: `🌲 Hey ${name}, want to hear a secret about elves? We're always up to something!`, time: formatDate(new Date(now.setDate(now.getDate() - 1))), type: 'sender' },
    { sender: name, text: "😄 That's too funny, Eddy! Do elves have a favorite type of music?", time: formatDate(new Date(now.setDate(now.getDate()))), type: 'receiver' },
    { sender: 'Eddy the Elf', text: "🎵 Absolutely! We're big fans of wrap music.", time: formatDate(new Date(now.setDate(now.getDate()))), type: 'sender' },
    { sender: name, text: "🎁 Wrap music? That's hilarious! Thanks for the chuckle, Eddy.", time: formatDate(new Date(now.setDate(now.getDate()))), type: 'receiver' },
  ];

  const finalMessages: Message[] = [
    { sender: 'Eddy the Elf', text: "🚨 HELP NEEDED! 🚨", time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: "Santa is missing!", time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: "We last saw him on his present delivery route, but he's vanished without a trace.", time: formatDate(new Date()), type: 'sender' },
    { sender: 'Eddy the Elf', text: "The last known location was at number 666 Nightmare Street. We desperately need your help to find him before Christmas is ruined. Are you ready to save Christmas?", time: formatDate(new Date()), type: 'sender' },
  ];



  return (
    <div className="mt-8 mb-4 w-[450px] h-[650px] max-h-screen rounded-lg p-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
      <div className="h-[650px] overflow-hidden">
        <div
          className="relative z-20 max-w-full bg-green-100 p-4 rounded-lg overflow-auto h-full shadow-inner"
        >
          <div className="mb-2 text-sm text-gray-600 text-center">Yesterday</div>

          {initialMessages.map((msg, index) => (
            <MessageComponent key={index} {...msg} />
          ))}
          <div className="mt-5 mb-2 text-sm text-gray-600 text-center">Today</div>

          <FinalMessages messages={finalMessages} />
        </div>
      </div>
    </div>
  );
};


const MessageComponent = ({ sender, text, time, type }: Message) => (

  <div className={`max-w-sm my-2 rounded-lg shadow-md ${type === 'sender' ? 'bg-gray-600' : 'bg-green-500 text-white ml-auto'}`}>
    <div className="px-4 py-2">
      <div className="font-bold text-xs">{sender}</div>

      <p>{text}</p>
      <div className="text-xs opacity-100 text-right">{time}</div>
    </div>
  </div>

);

const FinalMessages = ({ messages }: { messages: Message[] }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5, // Delay between children
        delayChildren: 1.5, // Start delay
      },
    },
  };

  const item = {
    hidden: { opacity: 0, display: 'none' },
    show: { opacity: 1, display: 'block' },
  };

  return (
    <div className="mb-10">
      <motion.div variants={container} initial="hidden" animate="show">
        {messages.map((msg, index) => (
          <motion.div key={index} variants={item}>
            <MessageComponent {...msg} />
          </motion.div>
        ))}
      </motion.div>
    </div>

  );
};