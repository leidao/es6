
let events = {}
function emit(type,poyld){   //发布
  let result = events[type]
  if(!result) return
  result.forEach(cb=>cb(poyld))
}
function on(type,cb){    //订阅
  if(!events[type]){
    events[type] = []
  }
  events[type].push(cb)
}
function off(type){    //销毁
   events[type] = null
}

on('a',(e)=>{
  console.log('e',e);
  
})

emit('a','ccc')