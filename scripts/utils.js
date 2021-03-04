const probability = [
  // Horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // Diagonal
  [1, 5, 9],
  [3, 5, 7],
]

function calculateWinner(state) {
  for (let i = 0; i < probability.length; i++) {
    const [a, b, c] = probability[i]
    const value = state[a - 1] // Get The first Value
    if (value && value === state[b - 1] && value === state[c - 1]) {
      return {
        winner: value,
        indexes: probability[i],
      }
    }
  }
  return null
}
function removeChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
function filledElements(parentElement) {
  removeChilds(parentElement)
  // FIll the ELements on the tictac table
  return Array(9)
    .fill(null)
    .map(() => document.createElement('div'))
}

export { calculateWinner, filledElements, removeChilds }
