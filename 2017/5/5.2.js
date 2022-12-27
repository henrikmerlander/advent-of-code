let input = require('./readinput');

let steps = 0;

for (let index = 0; index in input; steps++) {
  let offset = input[index];
  input[index] += offset >= 3 ? -1 : 1;
  index += offset;
}

console.log(steps);
