// // /**
// //  * call
// //  * 改变this指向
// //  * 让函数执行
// //  * 参数是一个个传入
// //  * this是null或者undefined ,this为window
// //  */

// // Function.prototype.call = function (context, ...args) {
// //   context = context ? Object(context) : window  //等待解答：函数作用域中的函数window上能查找到么？？？
// //   context.fn = this
// //   context.fn(...args)
// //   delete context.fn    //最后需要删除
// // }

// // fn.call.call.call(fn2) //最后执行的是fn2，fn.call.call 找到的是call函数，最后call.call(fn2)=> fn2.call()=>window.fn2()
// // /**
// //  * call
// //  * 改变this指向
// //  * 让函数执行
// //  * 参数是一个数组
// //  * this是null或者undefined ,this为window
// //  */
// // Function.prototype.apply = function (context, args) {
// //   context = context ? Object(context) : window  //等待解答：函数作用域中的函数window上能查找到么？？？
// //   context.fn = this
// //   context.fn(args)
// //   delete context.fn    //最后需要删除
// // }

// // /**
// //  * bind
// //  * 改变this指向
// //  * 返回一个函数
// //  * 
// //  */
// // Function.prototype.bind = function (context, ...args1) {
// //   context = context ? Object(context) : window
// //   context.fn = this
// //   return function (...args2) {
// //     let args = args1.concat(args2)
// //     context.fn(...args)
// //     delete context.fn
// //   }
// // }

// // let f1 = fn.bind(1,2,3)
// // f1 = f1.bind(100) //无意义  闭包
// // f1.bind(30)    //无意义
// // f1(22)
