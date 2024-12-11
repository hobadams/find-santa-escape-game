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
import { useState } from 'react';
import { Button } from '../ui/button';

type DragAndDropComponentProps = {
  items: string[];
  buttonText: string;
  onSubmit: (answers: string[]) => void;
}

export const DragAndDrop = ({ onSubmit, items: initialItems, buttonText }: DragAndDropComponentProps) => {
  const [items, setItems] = useState(initialItems);
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


  const flexClass = items.length > 4 ? 'grid-cols-6' : 'grid-cols-4';


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 bottom-0 right-0">
            <ul className={`relative z-10 grid gap-4 ${flexClass}`}>
              {items.map((id) => (
                <li key={id} className="border border-gray-300 rounded-lg border-dashed">
                  <img src={`/images/${id}.webp`} alt="item" className="rounded-lg opacity-0" />
                </li>

              ))}
            </ul>
          </div>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className={`relative z-10 grid gap-4 ${flexClass}`}>
              {items.map((id) => (
                <SortableItem key={id} id={id} active={activeId} />
              ))}
            </ul>
          </SortableContext>
        </div>

      </DndContext>
      <Button onClick={() => onSubmit(items)} className="mt-8">
        {buttonText}
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
      <img src={`/images/${id}.webp`} alt="item" className="rounded-lg" />
    </li>
  );
};