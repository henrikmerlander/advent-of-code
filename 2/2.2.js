let input = require('./readinput')

let sum = 0;

input.forEach(x => {
    x.forEach((y, i) => {
        let evenlyDivisibleValue = x.find((z, j) => Number.isInteger(z / y) && j != i)

        if (evenlyDivisibleValue) sum += (evenlyDivisibleValue / y);
    })
})

console.log(sum);
