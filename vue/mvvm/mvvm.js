// 要实现数据劫持、【数据代理】、观察者、编译者、发布订阅
function observer(data) {
  for(key in data){
    let val = data[key]
    if (Object.prototype.toString.call(val) === '[object object]'){
      observer(val)
    }else{
      Object.defineProperty(data, key, {
        configurable: true,
        get(){
          console.log(`获取${val}`); 
          return val
        },
        set(newVal){
          if(val === newVal){
            return
          }
          console.log(`更新${val}`)
          val = newVal
        }
      })
    }
  }
}

function  Mvvm(options = {}) {
  let data = this._data = options.data

  // observer(data)
  // new Compile(options.el, this)
  //  这里不理解，自己跑代码时，内部this不对
  // for(let key in data){
  //   Object.defineProperty(data, key, {
  //     configurable: true,
  //     get(){
  //       return that._data[key]
  //     },
  //     set(newVal){
  //       that._data[key] = newVal
  //     }
  //   })
  // }
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()

  while (child = vm.$el.firstChild) {
    fragment.append(child)
  }

  function replace(frag) {
    Array.from(frag.childNodes).forEach((node) => {
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g
      // RegExp.$1 哪来的值 ?
      // 其实RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, 所以如果我们在使用正则表达式时, 有用到分组,
      if(node.nodeType === 3 && reg.test(txt)){
        console.log(RegExp.$1);
        let arr = RegExp.$1.split('.')
        let val = vm

        arr.forEach(key => {
          val = val[key] //  // 如this.a.b, 感觉这个方式取this.a.b挺好的
        })
        node.textContent = txt.replace(reg, val).trim()
      }

      if(node.childNodes && node.childNodes.length){
        replace(node)
      }
    })

  }

  replace(fragment)

  vm.$el.appendChild(fragment)
}


// 发布订阅。 发布和订阅主要靠的是数组关系。订阅就是将函数放入数组。发布就是执行数组中的函数

// 发布订阅器，主要维护订阅者的收集和更新动作的发布
// 发布订阅器是不是一个一个Vue实例只有一个就够了???
// 另外。什么时候收集(get,只收集一次)，什么时候发布(set)？？？
function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub(sub){
    this.subs.push(sub)
  },
  notify(){
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 订阅者，自己要有update，即订阅变化的回调函数
// 这里在构造函数中接受实例传递的函数。然后再update方法里面调用
// update是原型方法，每个Wather实例都会拥有
function Wather(fn) {
  this.fn = fn
}

Wather.prototype.update = function () {
  this.fn()
}
