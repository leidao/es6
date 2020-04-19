const PENDING = 'PENDING'    //等待态
const RESOLVED = 'RESOLVED'  //成功态
const REJECTED = 'REJECTED'  //失败态
const onResolvedPromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise> --'))
  }
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {  //x是对象或数组
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          //如果返回值还是promise实例---递归
          onResolvedPromise(promise2, y, resolve, reject)
        }, r => {
          reject(r)
        })
      } else {
        resolve(x)   //x是数组
      }
    } catch (e) {
      reject(e)
    }
  } else {   //x 是普通值
    resolve(x)
  }
}
class Promise {
  constructor(exector) {
    this.status = PENDING
    this.value = undefined
    this.respon = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === 'PENDING') {   //状态一旦修改，不能在被更改
        this.status = RESOLVED
        this.value = value
        this.onResolvedCallbacks.forEach(cb => cb())  //进行发布
      }
    }
    let reject = (respon) => {
      if (this.status === 'PENDING') {   //状态一旦修改，不能在被更改
        this.status = REJECTED
        this.respon = respon
        this.onRejectedCallbacks.forEach(cb => cb())
      }
    }
    try {    //当执行器出错时，直接让状态为失败
      exector(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (value) => value //穿透
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.status === RESOLVED) {    //根据状态决定调用成功还是失败回调
          try {
            let x = onFullfilled(this.value)
            onResolvedPromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }
        if (this.status === REJECTED) {
          try {
            let x = onRejected(this.respon)
            onResolvedPromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }
        if (this.status === PENDING) {       //如果状态未改变，订阅回调函数，等状态改变时进行发布
          this.onResolvedCallbacks.push(() => {
            try {
              let x = onFullfilled(this.value)
              onResolvedPromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }

          })
          this.onRejectedCallbacks.push(() => {
            try {
              let x = onRejected(this.respon)
              onResolvedPromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }

          })
        }
      }, 0)
    })
    return promise2
  }
  catch(onRejected) {  //catch就是一个then函数，会穿透，会返回新的promise
    return this.then(null, onRejected)
  }
  finally(cb) {
    return this.then((data) => {
      return Promise.resolve(cb()).then(() => data) //函数返回值会变当作下一个then回调参数
    }, (err) => {
      return Promise.resolve(cb()).then(() => { throw err })  //throw会触发reject
    })
    return this
  }

}
Promise.resolve = (value) => {
  return new Promise((resolve, reject) => resolve(value))
}
Promise.reject = (value) => {
  return new Promise((resolve, reject) => reject(value))
}
Promise.all = (list) => {
  return new Promise((resolve, reject) => {
    let result = []
    let index = 0
    let processData = (i, data)=>{
      index += 1
      result[i] = data
      if (index === list.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < list.length; i++) {
      const current = list[i];
      if (isPromise(current)) {
        current.then(res => {
          processData(i, res)
        }, err => {
          reject(err)
        })
      } else {
        processData(i, current)
      }
    }
  })
}
Promise.race = (list)=>{
  return new Promise((resolve, reject) => {
    for (let i = 0; i < list.length; i++) {
      const current = list[i];
      if (isPromise(current)) {
        current.then(res => {
         resolve(res)
        }, err => {
          reject(err)
        })
      } else {
        resolve(current)
      }
    }
  })
}
const isPromise = (x) => {
  if ((typeof x === 'object' && x !== 'null') || (typeof x === 'function')) {
    if (typeof x.then === 'function') {
      return true
    }
  }
}
//遇到promise会进行等待
new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(101)
    }, 1000)
  }))
}).then(res => {
  return () => { }       //如果返回值是一个函数，直接把函数传作为下一个then的回调参数
}).then(res => {      // eeee [Function]
  console.log('eeee', res);
}).catch().then(res => { }, err => {
  console.log('err----', err);
  return 106
}).finally(() => {
  console.log('finally');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(108)
    }, 1000)
  })
}).then(res => {
  console.log('res111', res);
})

new Promise((resolve,reject)=>{
  reject('11')
}).then(res=>{},err=>{
  return new Promise((resolve,reject)=>{
    reject('12')
  })
}).then(res=>{
  console.log(';111',res);
  
},err=>{
  console.log('err',err);
  
})