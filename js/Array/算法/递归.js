/**
 * 累加1--求1--n的和
*/

/**
 * 
 * @param {*} n 
 * 申请一个result，来存储上一次的执行结果
 * 遍历迭代
 */
function sumN(n) {
  let result = 0, i = 1
  while (i < n + 1) {
    result = result + i
    i++
  }
  return result
}
/**
 * 
 * @param {*} n 
 * 递归方式
 * 1、先找到递归公式
 *    递归结束条件：n为1时，结果就是1
 *    递归公式：f(n) = n + fn(n-1)
 */
function sumN2(n) {
  if(n <= 1){
    return n
  }
  return n + sumN2(n - 1)
}

/**
 * 
 * @param {*} arr 
 * 迭代：
 * 定义result
 * 遍历数组
 */
function sumArr(arr) {
  let result = arr[0]

  for (let index = 0; index < arr.length; index++) {
    if (index + 1 < arr.length){
      result = result + arr[index + 1]
    }
  }

  return result
}

/**
 * 
 * @param {*} arr 
 * 递归
 * sumArr2(arr) = arrlast + sumArr2(arrPre)
 */
function sumArr2(arr) {
  if (arr.length === 1){
    return arr[0]
  }

  const arrLast = arr.pop()
  return arrLast + sumArr2(arr)
}

/**
 * 斐波那契
 * @param {*} n
 * 1,1,2,3,5,8,13
 */


/**
 * 斐波那契
 * @param {*} n 
 * 递归
 */
function feibo(n) {
  if (n <= 2) {
    return 1
  }
  
  let num1 = 1, num2 = 1, result = 2

  for (let i = 3; i <= n; i++) {
    result = num1 + num2
    num1 = num2
    num2 = result
  }
  return result
}

/**
 * 斐波那契
 * @param {*} n 
 * 递归
 */
function feibo2(n) {
  if(n <= 2) {
    return 1
  }
  return feibo(n - 1) + feibo(n - 2)
}

console.log(feibo(7));
