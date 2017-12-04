let input = require('./readinput');

let valid = input.filter(x => {
    let words = x.split(' ').map(x => x.split('').sort().join(''));

    return new Set(words).size == words.length;
})

console.log(valid.length);
