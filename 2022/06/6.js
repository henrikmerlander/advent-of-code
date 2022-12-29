const input = require('fs').readFileSync(`${process.argv[2]}.txt`, 'utf-8');

const sequence = input.split('');

const findMarker = size =>
  sequence.findIndex((_, i) => {
    const candidate = sequence.slice(i - size, i);
    return (
      candidate.length >= size && candidate.length === new Set(candidate).size
    );
  });

console.log(findMarker(4));
console.log(findMarker(14));
