function a(num, num2) {
  console.log(num,num2);
  
  this.num = num
}

var obj = {}
var b = a.bind(obj,2,3)

var a = {aa:{aaa: 2}}
var c = Object.assign({}, a)
a.aa.aaa =3
console.log(c.aa);
