const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const calculate = (operand1, operand2, operator) =>
  operator === '+'
    ? Number(operand1) + Number(operand2)
    : Number(operand1) * Number(operand2)

const evaluateInner = expression =>
  expression
    .match(/[\+\*]? ?\d+/g)
    .map(r => r.split(' '))
    .reduce((acc, [operator, operand]) => calculate(acc, operand, operator))

const evaluate = expression => {
  const enclosed = /\([^()]+\)/

  while (enclosed.test(expression)) {
    const [innerExpression] = enclosed.exec(expression)

    const result = evaluateInner(innerExpression)
    expression = expression.replace(innerExpression, result)
  }

  return evaluateInner(expression)
}

const sum = input
  .map(evaluate)
  .reduce((acc, curr) => acc + curr)

console.log('Part 1', sum)
