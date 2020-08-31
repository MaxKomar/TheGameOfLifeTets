// @flow
const fieldWidth: number = 50;
const fieldHeight: number = 50;

export type Generation = Array<number[]>

const neighboursCoordinates: Array<number[]> = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [0, -1],
  [1, -1]
];

const createInitialGeneration = (height: number = fieldHeight, width: number = fieldWidth): Generation => {
  return Array(height).fill().map(() => Array.from(Array(width), () => Math.round(Math.random())));
};

const getNextGeneration = (currentGeneration: Generation): Generation => {
  return currentGeneration.map((row, rowIndex)=> row.map((cell, cellIndex) => {
    let neighbors = 0;
    neighboursCoordinates.forEach(([x, y]) => {
      const newRow = rowIndex + y;
      const newCell = cellIndex + x;
      if (newRow >= 0 && newRow < currentGeneration.length && newCell >= 0 && newCell < row.length) {
        neighbors += currentGeneration[newRow][newCell];
      }
    });

    if (neighbors < 2 || neighbors > 3) {
      return 0;
    } else if (currentGeneration[rowIndex][cellIndex] === 0 && neighbors === 3) {
      return 1;
    }

    return cell;
  }));
};

const SimulationService = {
  createInitialGeneration,
  getNextGeneration
};

export default SimulationService;