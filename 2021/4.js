const input = require('fs').readFileSync(
  `${process.argv[2] || 'input'}.txt`,
  'utf-8'
)

let [drawOrder, ...boards] = input.split('\n\n')

drawOrder = drawOrder.split(',').map(Number)
boards = boards.map(board => board.trim().split(/\s+/).map(Number))

const hasBingo = (board, drawn) => {
  const hasRowBingo = [...Array(5).keys()]
    .map(i => i * 5)
    .some(i => board.slice(i, i + 5).every(n => drawn.includes(n)))

  const hasColumnBingo = [...Array(5).keys()].some(i =>
    board.filter((_, ni) => ni % 5 === i).every(n => drawn.includes(n))
  )

  return hasRowBingo || hasColumnBingo
}

const score = (board, drawn, justCalled) =>
  board.filter(n => !drawn.includes(n)).reduce((acc, curr) => acc + curr) *
  justCalled

drawOrder.reduce((drawnPrev, curr) => {
  const drawn = [...drawnPrev, curr]

  const wonBoards = boards.filter(board => hasBingo(board, drawn))
  const wonBoardsPrev = boards.filter(board => hasBingo(board, drawnPrev))

  const winningBoard = wonBoards.find(b => !wonBoardsPrev.includes(b))

  if (wonBoards.length === 1 && wonBoardsPrev.length === 0) {
    console.log('Part 1', score(winningBoard, drawn, curr))
  }

  if (
    wonBoards.length === boards.length &&
    wonBoardsPrev.length !== boards.length
  ) {
    console.log('Part 2', score(winningBoard, drawn, curr))
  }

  return drawn
}, [])
