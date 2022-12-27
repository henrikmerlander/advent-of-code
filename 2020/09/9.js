const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const xmasData = input.map(Number);

const isValid = (number, previousNumbers) =>
  previousNumbers.some(x =>
    previousNumbers.filter(x => x).some(y => x + y === number)
  );

const preambleLength = 25;

const firstInvalidNumber = xmasData.find(
  (number, index) =>
    index >= preambleLength &&
    !isValid(number, xmasData.slice(index - preambleLength, index))
);

console.log('Part 1', firstInvalidNumber);

const encryptionWeakness = target => {
  for (let i = 0; i < xmasData.length; i++) {
    for (let j = i + 2; j < xmasData.length; j++) {
      const contiguousCandidate = xmasData.slice(i, j);

      const sum = contiguousCandidate.reduce((acc, curr) => acc + curr, 0);
      const isContiguous = sum === target;

      if (isContiguous) {
        const smallest = Math.min(...contiguousCandidate);
        const largest = Math.max(...contiguousCandidate);
        const encryptionWeakness = smallest + largest;

        return encryptionWeakness;
      } else if (sum > target) {
        break;
      }
    }
  }
};

console.log('Part 2', encryptionWeakness(firstInvalidNumber));
