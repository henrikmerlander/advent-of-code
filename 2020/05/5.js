const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const seatId = (row, column) => row * 8 + column;

const instructionsToBinary = instructions =>
  instructions.replace(/(F|L)/g, 0).replace(/(B|R)/g, 1);

const seatIds = input.map(boardingPass => {
  const {
    groups: { rowInstructions, columnInstructions },
  } = /(?<rowInstructions>(B|F){7})(?<columnInstructions>(L|R){3})/.exec(
    boardingPass
  );

  const row = parseInt(instructionsToBinary(rowInstructions), 2);
  const column = parseInt(instructionsToBinary(columnInstructions), 2);

  return seatId(row, column);
});

console.log('Part 1', Math.max(...seatIds));

const lowestSeatId = Math.min(...seatIds);

const expectedTotal = Array(seatIds.length + 1)
  .fill()
  .map((_, index) => index + lowestSeatId)
  .reduce((a, b) => a + b);
const actualTotal = seatIds.reduce((a, b) => a + b);

console.log('Part 2', expectedTotal - actualTotal);
