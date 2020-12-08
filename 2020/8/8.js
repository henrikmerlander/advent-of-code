const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const program = input

const run = program => {
  let i = 0
  let accumulator = 0
  const visited = new Set()

  while (!visited.has(i)) {
    visited.add(i)

    const isTerminated = i === program.length
    if (isTerminated) return accumulator

    const [, operation, argument] = /(\w\w\w) ((\+|-)\d+)/.exec(program[i])

    switch (operation) {
      case 'nop':
        i++
        break
      case 'acc':
        accumulator += Number(argument)
        i++
        break
      case 'jmp':
        i += Number(argument)
        break
    }
  }

  throw accumulator
}

try {
  run(program)
} catch (error) {
  console.log('Part 1', error)
}

for (const [index, instruction] of program.entries()) {
  const [operation] = /(nop|jmp)/.exec(instruction) || []
  if (!operation) continue

  const newProgram = Array.from(input)

  newProgram[index] = instruction.replace(operation, operation === 'nop' ? 'jmp' : 'nop')

  try {
    const result = run(newProgram)
    console.log('Part 2', result)
    break
  } catch (error) { }
}
