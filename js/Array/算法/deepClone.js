function deepClone(target) {
  let result
  if (Array.isArray(target)){
    result = []
    for (let i = 0; i < target.length; i++) {
      result.push(deepClone(target[i]))
    }
  } else if (Object.prototype.toString.call(target) === '[object Null]') {
    result = null
  } else if (Object.prototype.toString.call(target) === '[object RegExp]'){
    result = target
  } else if (Object.prototype.toString.call(target) === '[object Object]') {
    result = {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = deepClone(target[key])
      }
    }
  } else {
    result = target
  }
  return result
}
let a = {
  aa:{bb: [1,2]}
}
let b = deepClone(a)
console.log(b);
