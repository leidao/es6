/**
 * 私有  实例上的属性
 * 公有  原型对象上的属性
 * 静态  类上的属性
 */
/** 抽象类：子类可以继承它，它自身不能被实例化 */

function Animal(name) {
  var a = 1  //私有属性
  this.name = name
}
let animal = new Animal('ldx')
/** 类和函数才有prototype */
console.log(animal.__proto__ === Animal.prototype);   //每个实例的隐式原型指向构造函数的原型对象
console.log(Animal.prototype.constructor === Animal);  //每个函数的原型对象上都有个constructor指向自身
console.log(animal.__proto__.constructor === Animal);  //每个实例的constructor指向其构造函数
console.log(Animal.__proto__ === Function.prototype);  //构造函数是new Function的实例
console.log(Animal.prototype.__proto__ === Object.prototype); //原型对象是new Object的实例
console.log(Object.prototype.__proto__ === null);   //不能无限循环下去

/** 原型链继承
 *  缺陷：
 *   只能传递一次参数
 *   多个实例对引用类型的参数修改会互相影响（引用类型的数据在原型链上，不在实例自身上）
 */
//  function F(name){
//    this.name = name
//  }
//  F.prototype.getName = function(){return this.name}
//  function B(){}
//  function C(){}
//  B.prototype = new F('ldx')
//  C.prototype = new F('ldx')
//  B.prototype.setName = function(){this.name = 'xxx'}
//  let b = new B()
//  let c = new C()
// b.setName()
// // c.setName()
//  console.log(b.name,b.getName(),c.name);

//  /** 借用构造函数继承
//   *  缺陷：
//   *    不能继承原型上的属性
//   */
//  function F(name){
//    this.name = name
//  }
//  function B(name){
//     F.call(this,name)
//  }
//  let b = new B('ldx')

//  /** 组合继承 
//   *  缺陷：
//   *    父类实例上的属性会在子类实例上和原型链上创建两份
//  */
//  function F(name){
//   this.name = name
// }
// function B(name){
//    F.call(this,name)
// }
// B.prototype = new F()
// let b = new B('ldx')

/** 原型式继承
 *  缺陷：
 *    只能继承原型对象上的属性
 */
function F(name) {
  this.name = name
}
F.prototype.getName = function () { return this.name }
function B(name) {
}
function creat(parentProtoType) {
  function C() { }
  C.prototype = parentProtoType
  return new C
}
B.prototype = Object.create(F.prototype)
let b = new B()  //b.__proto__ === B.prototype === new C  new C.__proto__ === F.prototype
console.log(
  b.name, b.getName()
);

/** 寄生式继承 */

/** 寄生组合式继承 */
function extends (Sup, Sub) {
  Sub.prototype = Object.cteate(Sup.prototpye)  //原型式
  Sub.prototype.constructor = Sub  
}
function Sup(name) {
  this.name = name
}
function Sub(name) {
  Sup.call(this,name)   //借用构造函数
}
extends (Sup, Sub)



