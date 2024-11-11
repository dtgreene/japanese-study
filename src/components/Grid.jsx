import { useSnapshot } from 'valtio';

import { createCellId } from 'src/lib/symbols';
import { app } from 'src/state/app';
import { DropCell } from './DropCell';

export const Grid = () => {
  const { dummyRows, dummyCols } = useSnapshot(app);

  return (
    <div>
      {dummyRows.map((_, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {dummyCols.map((_, colIndex) => (
            <DropCell key={colIndex} id={createCellId(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};
