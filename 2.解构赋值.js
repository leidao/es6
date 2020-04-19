/**
 * 解构赋值:
 *  结构相同可以获取到数据中的内容
 *  可以使用冒号来修改变量名称，可以给不存在的变量赋值
 */
let [, a, c] = [1, 2, 3]
let { name, age: age2, sex = '女' } = { name: 'ldx', age: '26' }
console.log(a, c, name, age2, sex);

/**
 * 剩余运算符: 
 *  可以将多个数据集合，但是数据类型不能改变
 *  将其中一个解构出来，剩余数据可以用剩余运算符集合
 */
let [, ...arr] = [1, 2, 3]
let { b, ...args } = { a: 1, b: 2, c: 3 }
console.log(arr);
console.log(args);
