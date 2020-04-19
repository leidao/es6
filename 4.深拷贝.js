/**
 * 浅拷贝
 *  数组：Array.slice / [...]
 *  对象：Object.assign / {...}
 * 深考贝
 *  JSON.parse(JSON.stringify) 不能对时间，函数，正则，循环引用进行处理
 * 类型判断
 *  typeof instanceof Object.prototype.toString.call() 
 *  constructor 指向实例的构造函数
 */
let obj = { name: 'ldx', age: { value: 10 } }
obj.a = obj
// Object.assign
function isType(value) {
  return Object.prototype.toString.call(value).slice(7, -1)
}
console.log('isType({})', isType({}));

function deepClone(value,hash = new Map) {
  if (value == undefined) return value  //null 和 undefined
  if (typeof value !== 'object') return value  //不是对象，即为普通值
  if (value instanceof RegExp) return new RegExp(value)  //正则
  if (value instanceof Date) return new Date(value)  //日期
  if(hash.has(value)) return hash.get(value)
  let result = new value.constructor
  hash.set(value,result)   //解决循环引用问题  
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key],hash)
    }
  }
  return result
}
let o1 = deepClone(obj)
o1.age.value = 100
console.log('o1',o1,obj);


