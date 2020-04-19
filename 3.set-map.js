/**
 * set: 集合，不能放置重复的项
 * 数组是一个索引集合，set是一个健集合，其内部是一个个键值对
 * size：返回集合所包含元素的数量
 * add(value)：向集合添加一个新的项
 * delete(value)：从集合中移除一个值
 * has(value)：如果值在集合中存在，返回true,否则false
 * clear(): 移除集合里所有的项
 * keys()：返回一个包含集合中所有键的数组
 * values()：返回一个包含集合中所有值的数组
 * entries：返回一个包含集合中所有键值对的数组
 * forEach()：用于对集合成员执行某种操作，没有返回值
 */
let arr1 = [1, 2, 1, 3, 4]
let arr2 = [1, 3, 4, 5, 5]
intersetion(arr1,arr2)
function intersetion(a,b){
  let s1 = new Set(a)
  let s2 = new Set(b)
  s1.add(5)
  console.log('s1',s1);
  
  let v1 = [...s1].filter(item=>{   //交集
    return s2.has(item)
  })
  let v2 = [...s1].filter(item=>{  //差集
    return !s2.has(item)
  })
}

/**
 * 类数组: 有长度，有下标
 * 将类数组转成数组的两种方式，Array.from 和...
 * ...要求类数组必须自身有生成器(iterator)
 * Array.from不借助自身的生成器(iterator)
 * [...] 数组中的...是es6的语法
 * {...} 对象中的...是es7的语法
 */
let arrayLink = {
  0:1,
  1:2,
  length:2,
  [Symbol.iterator]:function *(){  //genterator迭代器
    let idx = 0
    while (idx !== this.length) {
      yield this[idx++]
    }
  }
}
console.log('Array.from(arrayLink)',Array.from(arrayLink));
console.log('Array.from(arrayLink)',[...arrayLink]);

/** 
 * map: 
  size：返回字典所包含的元素个数
  set(key, val): 向字典中添加新元素
  get(key):通过键值查找特定的数值并返回
  has(key):如果键存在字典中返回true,否则false
  delete(key): 通过键值从字典中移除对应的数据
  clear():将这个字典中的所有元素删除
  keys():将字典中包含的所有键名以数组形式返回
  values():将字典中包含的所有数值以数组形式返回
  forEach()：遍历字典的所有成员
 */
let o1 = {c:3}
let a1 = [1]
 let map1 = new Map([[1,2],[{c:3},'c'],[1,2]])  //参数是一个二维数组,key不能重复，但是对象/数组永远是不相同的
 let map2 = new Map([[a1,2],[o1,'c'],[a1,3],[o1,'c']])  //如果对象/数组是一个变量，那么同一个引用地址是相同的
 console.log('map',map2);

 /**
  * WeakMap和WakSet  
  * 弱引用，key只能是一个对象
  * 当key被释放（为null）时，当前map会被销毁
  * 优点：不会造成内存泄露
  */

  let o2 = {a:3}
  let w = new WeakMap()
  // w.set({b:10},100)
  w.set(o2,100)
  o2 = null
  console.log('w',w);
  
 
