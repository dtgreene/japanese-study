import { proxy } from 'valtio';
import { shuffle } from 'fast-shuffle';

import { getDummyGrid, getSymbols } from 'src/lib/symbols';

export const Mode = {
  HIRAGANA: '0',
  HIRAGANA_DK: '1',
  HIRAGANA_YOON: '2',
  KATAKANA: '3',
  KATAKANA_DK: '4',
  KATAKANA_YOON: '5',
};

export const app = proxy({
  currentMode: Mode.HIRAGANA,
  freeStack: [],
  cellContents: {},
  hasGrade: false,
  errorCells: [],
  dummyRows: [],
  dummyCols: [],
});

export function resetState(mode) {
  app.cellContents = {};
  app.freeStack = shuffle(structuredClone(getSymbols(mode)));
  app.hasGrade = false;
  app.errorCells = [];

  const [rows, cols] = getDummyGrid(mode);
  app.dummyRows = rows;
  app.dummyCols = cols;
}
