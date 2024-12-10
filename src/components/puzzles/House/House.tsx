import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";
import { RootState } from "@/state/store";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const House = ({ step }: PuzzleProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <img src="/images/house.webp" alt="House" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white p-8 rounded text-center my-8 text-black">
          <p>You have arrived at Santa's last known location. There is an eerie silence in the air. You see some tiles on the floor in front of the locked door.</p>
          <p>They look as if they are switches. Maybe they can help open the door?!?</p>
        </div>
        <img src="/images/doorstep.webp" alt="doorstep" className="w-[400px] h-[400px] mx-auto" />

        <Puzzle step={step} />
      </div>
    </div>

  )
}

const Puzzle = ({ step: currentStep }: PuzzleProps) => {

  const { steps } = useSelector((state: RootState) => state.game)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    const step = steps.find((step) => step.key === currentStep);

    if (step?.completed) {
      setOpen(true);
    }
  }, [steps])

  // Array of button properties
  const buttons = [
    { id: 'A1', letter: 'A' },
    { id: 'S', letter: 'S' },
    { id: 'N', letter: 'N' },
    { id: 'T', letter: 'T' },
    { id: 'A2', letter: 'A' },

  ];

  // State to hold the sequence of letters
  const [letters, setLetters] = useState('');
  const [hasError, setHasError] = useState(false);
  // State to manage button enable/disable status
  const [disabledButtons, setDisabledButtons] = useState<Record<string, boolean>>({
    A1: false,
    S: false,
    T: false,
    A2: false,
    N: false
  });

  // Handler for button clicks
  const handleButtonClick = (id: string, letter: string) => {
    setLetters((prev) => prev + letter); // Add the display letter to the sequence
    setDisabledButtons((prev) => ({ ...prev, [id]: true })); // Disable the button that was pressed
  };

  // Reset all states to initial
  const handleReset = () => {
    setLetters('');
    setHasError(false);
    setDisabledButtons(buttons.reduce<{ A1: boolean; S: boolean; T: boolean; A2: boolean; N: boolean }>((acc, button) => ({ ...acc, [button.id]: false }), { A1: false, S: false, T: false, A2: false, N: false }));
  };


  useEffect(() => {
    if (letters.length === 5) {
      if (letters === 'SATAN') {
        setHasError(false);
        dispatch(setStepCompleted(1));

      } else {
        setHasError(true);
      }
    }
  }, [letters])

  return (
    <div className="my-8 text-center">
      <div className="flex gap-4 mb-4">
        {buttons.map(({ id, letter }) => (
          <button
            key={id}
            disabled={disabledButtons[id]}
            onClick={() => handleButtonClick(id, letter)}
            className="p-2 bg-white text-black rounded w-[60px] h-[60px] flex items-center justify-center shadow-inner text-xl font-bold hover:opacity-70 disabled:opacity-50"
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="text-center text-xl">
        {letters}
      </div>
      {hasError && (
        <div className="text-red-500 mt-4">
          Hmmmmm, something isn't quite right. <Button onClick={handleReset} variant="link" className="p-0 underline">Try again</Button>.
        </div>
      )}
      {letters.length > 0 && (
        <div>
          <Button onClick={handleReset} variant="link" className="text-white">Reset</Button>
        </div>
      )}

      <Dialog open={open}>
        <DialogContent className="text-center">
          <h3 className="font-bold text-xl">CLICK!!</h3>
          <p>The door creaks open. You see a <strong>porch</strong> leading to an <strong>entrance hallway</strong>.</p>
          <Link href={`/game/step/${currentStep + 1}`} className={cn(buttonVariants())}>Enter the house.</Link>
        </DialogContent>
      </Dialog>
    </div>
  );
};