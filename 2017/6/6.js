let input = require('./readinput');

let states = [];
let cycles = 0;

while (!states.includes(JSON.stringify(input))) {
  states.push(JSON.stringify(input));

  let blocks = Math.max(...input);
  let indexOfHighest = input.indexOf(blocks);

  input[indexOfHighest] = 0;

  for (let index = indexOfHighest + 1; blocks > 0; blocks--, index++) {
    if (index >= input.length) index = 0;
    input[index]++;
  }

  cycles++;
}

console.log(cycles);
console.log(cycles - states.indexOf(JSON.stringify(input)));
