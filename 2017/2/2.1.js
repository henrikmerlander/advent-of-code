let input = require('./readinput')

let sum = 0;

input.forEach(x => {
    sum += Math.max(...x) - Math.min(...x);
});

console.log(sum)
