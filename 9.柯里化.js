/**
 * 柯里化
 * 让函数变得更具体一些
 */

function add(a, b, c, d) {
  return a + b + c + d
}

let fn = curring(add, 1, 2)
let newFn = fn(3)
let v = newFn(4)
console.log(v);

function curring(context, ...args) {
  debugger
  if (context.length === args.length) {
    return context(...args)
  }
  return function (...values) {
    let newArgs = args.concat(values)
    return curring(context, ...newArgs)
  }
}
// function curring(context, ...args) {
//   if(context.length === args.length){
//    return context(...args)
//   }
//   let fn = function (...values) {
//     args = args.concat(values)
//     if (args.length === context.length) {
//       return context(...args)
//     }else{
//       return fn
//     }
//   }
//   return fn()
// }
