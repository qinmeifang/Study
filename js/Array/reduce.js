// reduce 方法。一个迭代器。可以对数组进行迭代操作
// 使用示例
const arr1 = [1,2,3]
const sum = arr1.reduce((pre, current) => {
  return pre + current
})
console.log(sum);

// 自己实现（比较简单-while循环数组，递归调用回调函数。以上一次的结果作为pre）
Array.prototype.myReduce = (cb, init) => {
  init = init || this[0]
  let pre, current, i
  while (i < this.length) {
    pre = cb(pre, current)
    i++
    current = this[i]
  }
  return cb(pre, current)
}

const arr2 = [[1,2],[2,3]]
const fatArr = arr2.reduce((pre, current) => {
  return pre.concat(current)
})
console.log(fatArr);

