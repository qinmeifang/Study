// 要实现数据劫持、【数据代理】、观察者、编译者、发布订阅
function observer(data) {
  let dep = new Dep
  for(key in data){
    let val = data[key]
    if (Object.prototype.toString.call(val) === '[object Object]'){
      observer(val)
    }else{
      
      Object.defineProperty(data, key, {
        configurable: true,
        get(){
          console.log(`获取::::${val}`, Dep.target); 
          Dep.target && dep.addSub(Dep.target) // 为什么是Dep.target，不应该是wather实例吗？
          return val
        },
        set(newVal){
          if(val === newVal){
            return
          }
          console.log(`更新${val}`)
          val = newVal
          if (Object.prototype.toString.call(newVal) === '[object Object]'){
            observer(newVal)
          }
          dep.notify()
        }
      })
    }
  }
}

function  Mvvm(options = {}) {
  let data = this._data = options.data
  this.options = options
  observer(data)
  initComputed.call(this)

  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        // 这里的this,是给谁做数据拦截，谁就是this。
        return this._data[key];     // 如this.a = {b: 1}
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }
  
  new Compile(options.el, this)
  options.mounted.call(this)
  // this.song = '啦啦'
  // this.album.name = '十二月的肖邦'
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
      
      if(node.nodeType === 1){
        let nodeAttr = node.attributes
        nodeAttr && Array.from(nodeAttr).forEach( attr => {
          let name = attr.name
          let exp = attr.value
          if(name.includes('v-')){
            new Wather(vm, exp, newVal => {
              node.value = newVal
            })

            node.addEventListener('input', e => {
              newVal = e.target.value
              vm[exp] = newVal
            })
          }
        })
      }
      
      if(node.nodeType === 3 && reg.test(txt)){
        let arr = RegExp.$1.split('.')
        let val = vm

        arr.forEach(key => { // 取值,默认就会调用get方法
          val = val[key] //  // 如this.a.b, 感觉这个方式取this.a.b挺好的
        })

        // node.textContent = txt.replace(reg, val).trim()

        new Wather(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg, newVal).trim()
        })
      }

      if(node.childNodes && node.childNodes.length){
        replace(node)
      }
    })
  }
  console.log(fragment);
  
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
function Wather(vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp

  Dep.target = this 
  let arr = exp.split('.')
  let val = vm

  arr.forEach(key => { // 取值,默认就会调用get方法
    val = val[key] //  // 如this.a.b, 感觉这个方式取this.a.b挺好的
  })
  fn(val)

  Dep.target = null
}

Wather.prototype.update = function () {
  console.log('update:::', this.exp);
  
  let arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(key => {
    val = val[key]
  })
  this.fn(val)
}

function initComputed() {
  let vm = this
  let computed = this.options.computed
  Object.keys(computed).forEach(key => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set: function () {
        console.log('set');

      }
    })
    
  })
}