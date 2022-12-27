const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const adapters = input.map(Number);
const outlet = 0;
const builtInAdapter = Math.max(...adapters) + 3;
const sortedAdapters = adapters.sort((a, b) => a - b);

const jolts = [outlet, ...sortedAdapters, builtInAdapter];

const differences = jolts.map((jolt, index) => jolt - jolts[index - 1]);
const result =
  differences.filter(difference => difference === 1).length *
  differences.filter(difference => difference === 3).length;

console.log('Part 1', result);

const cache = {};

const waysTo = jolt => {
  if (jolt === outlet) return 1;
  if (cache[jolt]) return cache[jolt];

  const possibleJolts = jolts.filter(
    candidate => candidate < jolt && jolt - candidate <= 3
  );
  const waysToJolt = possibleJolts.reduce((acc, curr) => acc + waysTo(curr), 0);

  return (cache[jolt] = waysToJolt);
};

console.log('Part 2', waysTo(builtInAdapter));
