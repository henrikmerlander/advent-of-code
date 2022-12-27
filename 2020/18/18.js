const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const calculate = (operand1, operand2, operator) =>
  operator === '+'
    ? Number(operand1) + Number(operand2)
    : Number(operand1) * Number(operand2);

const addition = /(\d+) \+ (\d+)/;

const evaluateInner = (expression, additionFirst) => {
  if (additionFirst)
    while (addition.test(expression))
      expression = expression.replace(addition, match => eval(match));

  return expression
    .match(/[\+\*]? ?\d+/g)
    .map(r => r.split(' '))
    .reduce((acc, [operator, operand]) => calculate(acc, operand, operator));
};

const evaluate = (expression, additionFirst) => {
  const enclosed = /\([^()]+\)/;

  while (enclosed.test(expression))
    expression = expression.replace(enclosed, inner =>
      evaluateInner(inner, additionFirst)
    );

  return evaluateInner(expression, additionFirst);
};

const sum1 = input
  .map(expression => evaluate(expression, false))
  .reduce((acc, curr) => Number(acc) + Number(curr));

console.log('Part 1', sum1);

const sum2 = input
  .map(expression => evaluate(expression, true))
  .reduce((acc, curr) => Number(acc) + Number(curr));

console.log('Part 2', sum2);
