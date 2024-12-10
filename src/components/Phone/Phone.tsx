import { motion } from 'framer-motion';

type PhoneProps = {
  initialMessages: Message[];
  finalMessages: Message[];
  start: boolean;
  sameDay?: boolean;
}

export type Message = {
  sender: string;
  text: string;
  time: string;
  type: 'sender' | 'receiver';
};

export const formatDate = (date: Date) =>
  `${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

export const Phone = ({ initialMessages, finalMessages, start, sameDay = true }: PhoneProps) => {

  return (
    <div className="mt-8 mb-4 w-[400px] h-[550px] overflow-hidden max-h-screen rounded-lg p-4 bg-gradient-to-b from-white to-gray-100 shadow-lg">

      <div
        className="relative z-20 max-w-full bg-green-100/50 rounded-lg overflow-auto h-full shadow-inner"
      >
        <div className="sticky left-0 top-0 w-full bg-green-100/90 p-4 flex items-center">
          <img src="/images/eddy.webp" alt="Eddy the Elf" className="w-8 h-8 rounded-full mr-8" />
          <p className="text-sm text-gray-600 font-bold">Conversation with Eddy the Elf</p>
        </div>
        <div className="p-4">
          <div className="mb-2 text-sm text-gray-600 text-center">{sameDay ? 'Today' : 'Yesterday'}</div>

          {initialMessages.map((msg, index) => (
            <MessageComponent key={index} {...msg} />
          ))}
          {start ? (
            <>
              {!sameDay ? <div className="mt-5 mb-2 text-sm text-gray-600 text-center">Today</div> : null}

              <MessageConversation messages={finalMessages} hasDelay={!sameDay} />
            </>
          ) : null}

        </div>


      </div>
    </div>
  );
}

export const MessageComponent = ({ sender, text, time, type }: Message) => (

  <div className={`max-w-[300px] my-2 rounded-lg shadow-md ${type === 'sender' ? 'bg-gray-400 text-black' : 'bg-green-600 text-white ml-auto'}`}>
    <div className="px-4 py-2">
      <div className="font-bold text-xs">{sender}</div>

      <p>{text}</p>
      <div className="text-xs opacity-100 text-right">{time}</div>
    </div>
  </div>

);

export const MessageConversation = ({ messages, hasDelay }: { messages: Message[], hasDelay: boolean }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: Math.random() * (2 - 1) + 1, // Delay between children
        delayChildren: hasDelay ? 1.5 : 0, // Start delay
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