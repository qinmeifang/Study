function Mvvm(data) {
  var newData = Object.assign({},data)
  console.log('MVVM:');

  //  这里不理解，自己跑代码时，内部this不对
  for (let key in data) {
    let val = data[key]
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        return val;     // 如this.a = {b: 1}
      },
      set(newVal) {
        console.log('set:',newVal);
        val = newVal;
      }
    });
  }
}
  
var data= {
  a: 1,
  b:2
}
new Mvvm(data)
data.a = 22
// console.log(data.b);
console.log(data.a);
