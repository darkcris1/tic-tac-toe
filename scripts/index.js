import writable from './store.js'
import { calculateWinner, filledElements, removeChilds } from './utils.js'

const tictacTable = document.querySelector('#tictacTable')
const banner = document.querySelector('#banner')

const tictacInitialState = ['', '', '', '', '', '', '', '', '']
const tictacState = writable(tictacInitialState)
const tictacMove = writable('X')

let isWinner = null

const fieldsElement = filledElements(tictacTable)

function updateBanner(move) {
  const isFilled = tictacState.state.every((val) => val)
  banner.innerHTML = isWinner
    ? `Winner is <span>${isWinner.winner} </span>`
    : isFilled
    ? 'There is no winner'
    : `Next move: <span>${move} </span>`
}

function updateWinnerIndexes(indexes) {
  indexes.forEach((val) => {
    fieldsElement[val - 1].classList.add('winner')
  })
}

// When the state is change this function will be called
tictacState.subscribe((value) => {
  renderTictacToe(value)
  isWinner = calculateWinner(value)
  updateBanner(tictacMove.state)
  if (isWinner) {
    updateWinnerIndexes(isWinner.indexes)
  }
})

function handleClick(num) {
  // IF the index of state is filled return immediately
  if (!!tictacState.state[num] || isWinner) return

  tictacState.update((state) => {
    state[num] = tictacMove.state
    tictacMove.update((value) => (value === 'X' ? 'O' : 'X'))
    return state
  })
}

function renderTictacToe(state) {
  removeChilds(tictacTable)

  state.forEach((value, i) => {
    const square = fieldsElement[i]
    const isXorY = value === '' ? '' : value === 'X' ? 'isX' : 'isO'
    square.className = 'field ' + isXorY
    square.innerText = value
    square.onclick = () => handleClick.call(square, i)
    tictacTable.appendChild(square)
  })
}

const restartBtn = document.querySelector('#restartBtn')

restartBtn.addEventListener('click', () => {
  tictacState.set(tictacInitialState)
})

// Initial Renderer
;(() => {
  renderTictacToe(tictacState.state)
})()
