import { useDraggable } from '@dnd-kit/core';
import { cn } from 'src/lib/utils';

export const DragSymbol = ({ value, className }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: value,
    });
  const style = {};

  if (transform) {
    style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0)`;
    style.zIndex = 10;
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={cn(
        'w-16 h-16 text-3xl shrink-0 inline-block overflow-hidden transition-colors touch-none',
        {
          'border bg-background': isDragging,
        },
        className
      )}
      {...listeners}
      {...attributes}
    >
      {value}
    </button>
  );
};
