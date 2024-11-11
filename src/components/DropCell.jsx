import { useDroppable } from '@dnd-kit/core';
import { useSnapshot } from 'valtio';
import clsx from 'clsx';

import { app } from 'src/state/app';
import { DragSymbol } from './DragSymbol';

export const DropCell = ({ id }) => {
  const appSnap = useSnapshot(app);
  const value = appSnap.cellContents[id];
  const hasError = appSnap.errorCells.includes(id);

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx('grid-col', {
        'bg-accent': isOver,
        'bg-destructive': hasError,
      })}
    >
      {value && <DragSymbol value={value} />}
    </div>
  );
};
