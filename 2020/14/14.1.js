const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const program = input;

const endState = program.reduce(
  ({ memory, bitmask }, instruction) => {
    if (instruction.startsWith('mask')) {
      [, bitmask] = /mask = ([01X]+)/.exec(instruction);
    } else {
      const [, address, value] = /mem\[(\d+)\] = (\d+)/.exec(instruction);

      const binary = Number(value)
        .toString(2)
        .padStart(bitmask.length, '0')
        .split('')
        .map((v, i) => (bitmask[i] === 'X' ? v : bitmask[i]))
        .join('');

      memory[address] = parseInt(binary, 2);
    }

    return { memory, bitmask };
  },
  { memory: {}, bitmask: '' }
);

const sum = Object.values(endState.memory).reduce((a, b) => a + b);

console.log('Part 1', sum);
