const isObj = (obj) => obj && obj.constructor === Object

function writable(initialState) {
  let state = initialState

  function cloneState() {
    if (Array.isArray(state)) return [...state]
    else if (isObj(state)) return { ...state }

    return state
  }
  if (initialState instanceof Function) {
    state = initialState()
  }

  const subscriber = []

  function subscribeAllFunction() {
    subscriber.forEach((fn) => fn(cloneState()))
  }

  return {
    set: (newState) => {
      state = newState
      subscribeAllFunction()
    },
    subscribe: (callback) => {
      subscriber.push(callback)
    },
    update: (callback) => {
      state = callback(cloneState())
      subscribeAllFunction()
    },
    get state() {
      return state
    },
  }
}

export default writable
