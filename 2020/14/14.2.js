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

      const result = Number(address)
        .toString(2)
        .padStart(bitmask.length, '0')
        .split('')
        .map((v, i) => (bitmask[i] === '0' ? v : bitmask[i]))
        .join('');

      const nFloating = result.match(/X/g).length;
      const nPermutations = Math.pow(2, nFloating);

      Array(nPermutations)
        .fill()
        .map((_, i) => i.toString(2).padStart(nFloating, '0').split(''))
        .map(binaryPermutation =>
          parseInt(
            result.replace(/X/g, () => binaryPermutation.shift()),
            2
          )
        )
        .forEach(address => (memory[address] = Number(value)));
    }

    return { memory, bitmask };
  },
  { memory: {}, bitmask: '' }
);

const sum = Object.values(endState.memory).reduce((a, b) => a + b);

console.log('Part 2', sum);
