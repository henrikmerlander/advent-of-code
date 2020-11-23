let input = require('./readinput')

let steps = input.length / 2;
let sum = 0;

input.forEach((value, index) => {
    let next = index >= steps ?
        input[index - steps] :
        input[index + steps];

    if (value == next) sum += value;
})

console.log(sum);
