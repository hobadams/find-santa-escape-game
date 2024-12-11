import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PuzzleProps } from "@/routes/game/step/$step";
import { setStepCompleted } from "@/state/gameSlice";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';



export const Kitchen = ({ step }: PuzzleProps) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const correctOrder = ['yellow', 'green', 'blue', 'red'];

  const handleSubmit = (items: string[]) => {

    const isCorrectOrder = items.every((item, index) => item === correctOrder[index]);

    if (isCorrectOrder) {
      dispatch(setStepCompleted(step))
      setCompleted(true);
    } else {
      setHasError(true);
    }
  }

  return (

    <div className="flex h-screen">

      <Dialog open={completed}>
        <DialogContent className="text-center">
          <DialogTitle className="font-bold text-xl">⭐⭐⭐</DialogTitle>
          <p>Just the way Grandma likes it!</p>
          <p>Time to move to then next room and get back to finding Santa.</p>
          <Link href={`/game/step/${step + 1}`} className={cn(buttonVariants())}>Enter the living room</Link>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <img src="/images/kitchen.webp" alt="Kitchen" className="h-full w-auto object-cover mx-auto" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="bg-white p-8 rounded text-center mb-8 text-black w-full">
          <p>Wow this <strong>kitchen</strong> is a MESS.</p>
          <p><strong>Grandma</strong> would never let me leave it like this!</p>
          <p>Forgetting the importance of your mission you decide to give it a clear up before you move on.</p>
          <p>You look through the cupboards for cleaning products. If only you could remember the order <strong>Grandma</strong> taught you to use them.</p>
        </div>

        <DragAndDropComponent onSubmit={handleSubmit} />

        {hasError ? (
          <p className="text-red-500 mt-4">Hmmm, that doesn't seem right</p>
        ) : null}



      </div>
    </div>

  )
}

type DragAndDropComponentProps = {
  onSubmit: (answers: string[]) => void;
}

const DragAndDropComponent = ({ onSubmit }: DragAndDropComponentProps) => {
  const [items, setItems] = useState(['red', 'green', 'yellow', 'blue']);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="flex gap-4">
            {items.map((id) => (
              <SortableItem key={id} id={id} active={activeId} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <Button onClick={() => onSubmit(items)} className="mt-8">
        Start cleaning!
      </Button>
    </div>
  );
};

interface SortableItemProps {
  id: string;
  active: string | null
}

const SortableItem: React.FC<SortableItemProps> = ({ id, active }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className={`relative ${active === id ? 'z-10' : ''}`}>
      <img src={`/images/${id}-bottle.webp`} alt="cleaning product" className="rounded-lg" />
    </li>
  );
};