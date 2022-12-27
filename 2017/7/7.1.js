let input = require('./readinput');

let ids = input.filter(x => x.above.length).map(x => x.id);
let lower = input
  .filter(x => x.above.length)
  .map(x => x.above)
  .reduce((a, b) => a.concat(b));

console.log(ids.filter(x => lower.indexOf(x) == -1)[0]);
