export const setTimeOutFn =
  (callback, time = 3000) =>
  (...params) => {
    setTimeout(() => {
      console.log(callback)
      callback(params)
    }, time)
  }
export const flipTwo = (fn) => (p1, p2) => fn(p2, p1)

export const curry = (fn) =>
  fn.length === 0 ? fn() : (p) => curry(fn.bind(null, p))
