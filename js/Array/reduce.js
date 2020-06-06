// reduce 方法。一个迭代器。可以对数组进行迭代操作
// 使用示例
const arr1 = [1,2,3]
const sum = arr1.reduce((pre, current) => {
  return pre + current
})
/**
 * 方法1 递归
 * while循环数组，递归调用回调函数。以上一次的结果作为pre
 * 注意点
 * 1、如果函数箭头函数里面，就不要使用this
 *    Array.prototype.myReduce = (cb, init) => {
 * 
 *    }
 * 2、注意调用cb函数是，控制this
 */
Array.prototype.myReduce = function (cb, init) {
  init = init || this[0]
  let pre = init, current, i = 0, result = init
  
  while (i < this.length - 1) {
    i++
    current = this[i]
    result = cb(pre, current)
    pre = result
  }

  return pre
}

Array.prototype.myReduce2 = function (cb, init) {
  let arr = this
// 这个方式不是很理解
  function myReduceHelper(arr, cb, init) {
    init = init || arr[0]
    if (arr.length === 1) {
      return init
    }
    const current = arr[1]
    arr.shift()
    return myReduceHelper(arr, cb, cb(init, current))
  }

  return myReduceHelper(arr, cb, init)
}

const arr2 = [[1,2],[2,3]]
const fatArr = arr2.myReduce2((pre, current) => { 
  console.log(222, pre, current);
  return pre.concat(current)
})
console.log(fatArr);

