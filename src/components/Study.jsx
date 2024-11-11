import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { DndContext } from '@dnd-kit/core';
import confetti from 'canvas-confetti';

import { getSolution } from 'src/lib/symbols';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select';
import { app, Mode, resetState } from 'src/state/app';
import { Button } from './ui/Button';
import { Grid } from './Grid';
import { DragSymbol } from './DragSymbol';

const scalar = 2;
const blossom = confetti.shapeFromText({ text: '🌸', scalar });
const celebrateConfetti = {
  scalar: 2,
  spread: 180,
  particleCount: 60,
  origin: { y: -0.1 },
  startVelocity: -35,
  shapes: [blossom],
};

function handleModeChange(value) {
  app.currentMode = value;

  resetState(value);
}

function handleDragEnd({ active, over }) {
  if (!active) return;

  const activeEntry = Object.entries(app.cellContents).find(
    ([_, value]) => value === active.id
  );

  // If the active item comes from the grid, we need to delete it first. It will
  // either be moved somewhere else on the grid or returned to the free stack.
  if (activeEntry) {
    delete app.cellContents[activeEntry[0]];
  }

  if (over) {
    const currentValue = app.cellContents[over.id];

    if (currentValue) {
      // When moving from one cell to another cell that happens to be occupied,
      // we can just swap the two items.

      // Otherwise (when moving from the free stack), we'll just return the
      // blocking item back to the free stack.
      if (activeEntry) {
        app.cellContents[activeEntry[0]] = currentValue;
      } else {
        app.freeStack.push(currentValue);
      }
    }

    if (!activeEntry) {
      app.freeStack = app.freeStack.filter((value) => value !== active.id);
    }

    app.cellContents[over.id] = active.id;
  } else if (activeEntry) {
    // Dragging from the grid to outside of the grid. In this case, just return
    // the piece to the free stack.
    app.freeStack.push(activeEntry[1]);
  }
}

function handleResetClick() {
  resetState(app.currentMode);
}

function handleGradeClick() {
  let errors = [];

  console.log(Object.entries(app.cellContents));

  const solution = getSolution(app.currentMode);

  Object.entries(solution).forEach(([key, value]) => {
    if (app.cellContents[key] !== value) {
      errors.push(key);
    }
  });

  app.hasGrade = true;
  app.errorCells = errors;

  if (errors.length === 0) {
    confetti(celebrateConfetti);
  }
}

export const Study = () => {
  const appSnap = useSnapshot(app);

  useEffect(() => {
    resetState(app.currentMode);
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col xl:flex-row gap-8 items-start max-w-screen-2xl">
        {/* <div>A King Surely Tests No Home-Made Yellow/Red WiNe</div> */}
        <div className="w-[642px]">
          <div className="flex justify-between mb-8">
            <div className="w-[280px]">
              <Select
                value={appSnap.currentMode}
                onValueChange={handleModeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Mode.HIRAGANA}>ひらがな</SelectItem>
                  <SelectItem value={Mode.HIRAGANA_DK}>
                    ひらがな (だくおん + はんだくおん)
                  </SelectItem>
                  <SelectItem value={Mode.HIRAGANA_YOON}>
                    ひらがな (ようおん)
                  </SelectItem>
                  <SelectItem value={Mode.KATAKANA}>かたかな</SelectItem>
                  <SelectItem value={Mode.KATAKANA_DK}>
                    かたかな (だくおん + はんだくおん)
                  </SelectItem>
                  <SelectItem value={Mode.KATAKANA_YOON}>
                    かたかな (ようおん)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                disabled={appSnap.freeStack.length > 0}
                onClick={handleGradeClick}
              >
                Grade Work
              </Button>
              <Button variant="outline" onClick={handleResetClick}>
                Reset
              </Button>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <Grid />
          </div>
          {appSnap.hasGrade && (
            <div className="flex justify-center">
              {appSnap.errorCells.length > 0 ? (
                <div className="text-destructive text-xl">Oops! Try again!</div>
              ) : (
                <div className="text-primary text-xl">
                  Good job! No mistakes!
                </div>
              )}
            </div>
          )}
        </div>
        <div className="border w-[642px] xl:w-[498px] min-h-16 flex justify-center gap-4 flex-wrap p-4">
          {appSnap.freeStack.map((value) => (
            <DragSymbol
              key={value}
              value={value}
              className="border hover:bg-accent"
            />
          ))}
          {appSnap.freeStack.length === 0 && (
            <span className="text-muted">Nothing to see here</span>
          )}
        </div>
      </div>
    </DndContext>
  );
};
