class Person {
  a = {
    a: '1'
  }
  _money = ''
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  static get a() {
    return 100
  }
  get money() {
    return _money
  }
  set money(value) {
    _money = value
  }
  getName() {
    return this.name
  }
  setName(name) {
    this.name = name
  }
}
// var a = new Person
// var b = new Person
// a.a.a = '2'
// console.log('A',a,b);

/** es6类的继承 */
class B extends Person {
  constructor(name, age, sex) {
    super(name, age)
    this.sex = sex
  }
}
//  -----------------------------------------

/** es5继承 */
function Person(name, age) {
  this.name = name
  this.age = age
}
Object.defineProperty(Person.prototype, 'money', {
  get() {
    return this._money
  }
  set(value) {
    this._money = value
  }
})
Object.defineProperty(Person, 'a', {
  get() {
    return 100
  }

})
Person.prototype.getName = function () {
  return this.name
}
Person.prototype.setName = function (name) {
  this.name = name
}
function B(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  Person.call(this, name, age)  //构造函数继承，继承父类实例上属性
  this.sex = sex
}
function extend(sub, sup) { //sub-子类 sup父类
  function _() {  //寄生式继承
    this.constructor = sup
  }
  let _a = new _()
  _a.prototype = sup.prototype
  sub.prototype = _a  //继承父类原型上方法
}
function extendStatic(sub, sup) {  //sub-子类 sup父类
  sub.__proto__ = sup   //继承父类的静态方法
}
extend(B, Person)
extendStatic(B, Person)

