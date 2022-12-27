const input = require('fs')
  .readFileSync(`${process.argv[2]}.txt`, 'utf-8')
  .split('\n');

const abc = ['A', 'B', 'C'];
const shapeScore = { A: 1, B: 2, C: 3 };
const outcomeScore = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

const totalScore = input.reduce((acc, curr) => {
  const [opponent, you] = curr
    .replace('X', 'A')
    .replace('Y', 'B')
    .replace('Z', 'C')
    .split(' ');

  return (acc +=
    shapeScore[you] + outcomeScore[abc.indexOf(you)][abc.indexOf(opponent)]);
}, 0);

console.log(totalScore);

const totalScore2 = input.reduce((acc, curr) => {
  const [opponent, outcome] = curr.split(' ');

  const you =
    outcome === 'Y'
      ? opponent
      : abc[(abc.indexOf(opponent) + (outcome === 'Z' ? 1 : 2)) % 3];

  return (acc +=
    shapeScore[you] + outcomeScore[abc.indexOf(you)][abc.indexOf(opponent)]);
}, 0);

console.log(totalScore2);
