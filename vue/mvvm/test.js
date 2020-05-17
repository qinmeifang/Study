function Mvvm(options = {}) {
  let data = this._data = options.data
  console.log(data);
  let c = { a: 1, b: 2 }
  //  这里不理解，自己跑代码时，内部this不对
  for (let key in data) {
    Object.defineProperty(c, key, {
      configurable: true,
      get() {
        console.log(111, this);
        return 1;     // 如this.a = {b: 1}
      },
      set(newVal) {
        this[key] = newVal;
      }
    });
  }
  console.log(c.a);
  
}
var a3 = {
  data: {
    a: 1
  }
}

new Mvvm(a3)