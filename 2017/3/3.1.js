let input = require('./readinput');

let directions = ['RIGHT', 'UP', 'LEFT', 'DOWN'];

let getNextDirection = direction => {
  return direction == 'DOWN'
    ? directions[0]
    : directions[directions.indexOf(direction) + 1];
};

let movePoint = direction => {
  switch (direction) {
    case 'RIGHT':
      point.x++;
      break;
    case 'UP':
      point.y++;
      break;
    case 'LEFT':
      point.x--;
      break;
    case 'DOWN':
      point.y--;
      break;
    default:
      break;
  }
  step++;
};

let step = 1;
let point = { x: 0, y: 0 };
let steps = 1;
let direction = 'RIGHT';

(function findTotalSteps() {
  for (let i = 0; i <= input; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < steps; k++) {
        if (step == input) {
          console.log(Math.abs(point.x) + Math.abs(point.y));
          return;
        }
        movePoint(direction);
      }
      direction = getNextDirection(direction);
    }
    steps++;
  }
})();
