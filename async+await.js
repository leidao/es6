//async函数的实现，就是把genterator和自执行器包装在一个函数中

// genterator --------------
function *fn(){
    let a = yield 1
    console.log(a);  // a == value
    let b = yield 2
    return b
}
let it = fn()
let {value,done} =it.next()  //value是yield后面的值，fn函数没有执行到return时done为falses
 it.next(value)    //value的值会赋值给a

// async实现---------------
async function getValue() {
  // todo。。。
}
function getValue() {
  return co(function* genterator() { 
    // 会将await替换成yield
    // todo。。。
  });
}
function co(genterator) {
  return new Promise((resolve, reject) => {
    let it = genterator()
    function next(val) {
      let { value, done } = it.next(val);
      if (done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(data => next(data), reject);
      }
    }
    next(undefined);
  });
}