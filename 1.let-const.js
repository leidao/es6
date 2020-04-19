//var 导致的问题
// 1.重复声明
// 2.变量提升  js中变量提升的几种方式 var、function、import
// 3.会将变量声明到全局（window）上
// 4.var没有作用域的概念
// 5.var声明的变量可以随意更改

//let:块级作用域
//const：常量，不可改变的变量，但是它的引用空间可以被改变
let a = 100
{
  console.log(a);  //会报错，暂存死区
  let a =1
}

for (let i = 0; i < 3; i++) {
  setTimeout(()=>{
    console.log('i');
  },0)
} 
/**
 * var _loop = function _loop(i) {
  setTimeout(function () {
    console.log('i', i);
  }, 0);
};

for (var i = 0; i < 3; i++) {
  _loop(i);
}
 */