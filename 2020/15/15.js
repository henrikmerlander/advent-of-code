const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split(',');

const startingNumbers = input.map(Number);

const play = turns => {
  const lastSpoken = Array(turns);
  startingNumbers.forEach((value, index) => (lastSpoken[value] = index + 1));

  let recent = startingNumbers[startingNumbers.length - 1];

  for (let turn = startingNumbers.length; turn < turns; turn++) {
    const saidNumber = lastSpoken[recent] ? turn - lastSpoken[recent] : 0;
    lastSpoken[recent] = turn;
    recent = saidNumber;
  }

  return recent;
};

console.log('Part 1', play(2020));

console.log('Part 2', play(30000000));
