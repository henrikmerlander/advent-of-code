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
};

let calculatePointValue = point => {
  let adjacents = [
    { x: point.x - 1, y: point.y + 1 },
    { x: point.x, y: point.y + 1 },
    { x: point.x + 1, y: point.y + 1 },
    { x: point.x + 1, y: point.y },
    { x: point.x + 1, y: point.y - 1 },
    { x: point.x, y: point.y - 1 },
    { x: point.x - 1, y: point.y - 1 },
    { x: point.x - 1, y: point.y },
  ];

  let sum = 0;

  adjacents.forEach(x => {
    let existingPoint = points.find(y => y.point.x == x.x && y.point.y == x.y);
    if (existingPoint) sum += existingPoint.value;
  });

  points.push({ point: { x: point.x, y: point.y }, value: sum > 0 ? sum : 1 });

  return sum;
};

let points = [];
let point = { x: 0, y: 0 };
let steps = 1;
let direction = 'RIGHT';

(function findTotalSteps() {
  while (true) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < steps; k++) {
        let pointValue = calculatePointValue(point);
        if (pointValue > input) {
          console.log(pointValue);
          return;
        }
        movePoint(direction);
      }
      direction = getNextDirection(direction);
    }
    steps++;
  }
})();
