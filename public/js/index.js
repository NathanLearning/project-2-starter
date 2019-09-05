function groupBy (fn, arr) {
  return arr.reduce((acc, v) => {
    const k = fn(v)

    if (Object.prototype.hasOwnProperty.call(acc, k)) {
      acc[k].push(v)
    } else {
      acc[k] = [v]
    }

    return acc
  }, {})
}

/**
 * Sorts an array based on the functions passed it, will go through the functions in order and use ties to the next function in order to break ties. (Does not mutate original array)
 * @param {Array} fns An array of functions to sort with
 * @param {Array} arr The array to sort
 * @return {Array} returns a brand new sorted array
 */
function sortWith (fns, arr) {
  return [...arr].sort((a, b) =>
    fns.reduce((acc, f) => (acc === 0 ? f(a, b) : acc), 0)
  )
}

/**
 * Can be used with sort to ascend an array based on the function passed in
 * @param {Function} fn The function to apply to the values before comparing
 */
function ascendBy (fn) {
  return function (a, b) {
    const A = fn(a)
    const B = fn(b)

    if (A < B) {
      return -1
    }

    if (A > B) {
      return 1
    }

    return 0
  }
}

/**
 * Can be used with sort to descend an array based on the function passed in
 * @param {Function} fn The function to apply to the values before comparing
 */
function descendBy (fn) {
  return function (a, b) {
    const A = fn(a)
    const B = fn(b)

    if (A > B) {
      return -1
    }

    if (A < B) {
      return 1
    }

    return 0
  }
}

// const data = [{ name: 'alice', age: 40 }, { name: 'bob', age: 30 }, { name: 'clara', age: 40 }]

// console.log(
//   sortWith([
//     descendBy(x => x.age),
//     ascendBy(x => x.name)
//   ], data)
// )

// console.log(groupBy(x => x.age, data))
