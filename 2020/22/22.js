const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n')

const deck = raw => raw.split('\n').slice(1).map(Number)
const startingDeck1 = deck(input[0])
const startingDeck2 = deck(input[1])

const score = deck => deck
  .reduce((acc, curr, currIndex) => acc + curr * (deck.length - currIndex), 0)

const combat = (startingDeck1, startingDeck2, recursive) => {
  const deck1 = Array.from(startingDeck1)
  const deck2 = Array.from(startingDeck2)
  const previousRounds = new Set()

  const draw = () => {
    const card1 = deck1.shift()
    const card2 = deck2.shift()

    const hasEnoughCards = deck1.length >= card1 && deck2.length >= card2
    const p1Win = recursive && hasEnoughCards
      ? recursiveCombat(deck1.slice(0, card1), deck2.slice(0, card2)).p1Win
      : card1 > card2

    if (p1Win)
      deck1.push(card1, card2)
    else
      deck2.push(card2, card1)
  }

  const isEnd = () => deck1.length === 0 || deck2.length === 0

  while (!isEnd()) {
    const round = JSON.stringify({ deck1, deck2 })
    if (previousRounds.has(round))
      return { p1Win: true, score: score(deck1) }

    previousRounds.add(round)
    draw()
  }

  const p1Win = deck1.length > 0

  return { p1Win, score: score(p1Win ? deck1 : deck2) }
}

const recursiveCombat = (startingDeck1, startingDeck2) => combat(startingDeck1, startingDeck2, true)

console.log('Part 1', combat(startingDeck1, startingDeck2).score)

console.log('Part 2', recursiveCombat(startingDeck1, startingDeck2).score)
