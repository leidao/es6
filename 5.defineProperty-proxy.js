/**
 * freeze 冻结，被冻结的对象不能被再次配置
 */
let o1 = {
  _name: 'ldx',
  get name() {
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}
o1.name = 'kz'
console.log(o1.name);
// let o2 = {}
// let n = ''
// Object.defineProperty(o2, 'name', {
//   enumerable: true, //是否可枚举（被遍历）
//   configurable: false, //是否可配置/删除
//   get() {
//     retuen n;
//   },
//   set(newValue) {
//     n = newValue
//   }
// })

/**
 * proxy 代理
 * reflect 反射，es6语法，未来代替object对象
 * 以后所有对象Object上的新方法会放到Reflect上
 * 只有取值时才会进行递归代理，不用上来就全部代理，提升性能
 * 可以对数组的方法进行代理，push
 */

let o3 = {
  name: 'ldx',
  age: {
    value: 27
  },
  sex:['0']
}
const handler = {
  get(target, key, value) {
    // return target[key]
    if(typeof target[key] === 'object' && typeof target[key] !== 'null'){
     return new Proxy(target[key],handler)  //new Proxy的返回值是被代理的对象
    }
    return Reflect.get(target, key)  //反射
  },
  set(target, key, value) {
    //  target[key] = value
    //  return true
    let oldValue = target[key]
    if(oldValue !== value){      //数组的push等改变自身的方法被调用2次set，一次是索引，一次是length长度
      console.log('更新');
      return Reflect.set(target, key, value)
    }
   return true
  }
}
let proxy = new Proxy(o3, handler)
// proxy.age
proxy.sex.push('1')
console.log('o3', proxy.sex);

