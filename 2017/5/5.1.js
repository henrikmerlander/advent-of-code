let input = require('./readinput');

let steps = 0;

for (let index = 0; index in input; steps++) {
  index += input[index]++;
}

console.log(steps);
