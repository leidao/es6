/**
 * 模块的概念， 多个模块直接相互独立，解决命名冲突问题，方便维护
 * 模块的核心， 将当前的内容放入一个函数中
 * es6 模块
 * 静态导入  --有作用域的概念，默认只能在最外层作用域下使用，并且会进行声明提升
 * import  / export 
 * export 导出的是一个接口， export default 导出的是一个具体的值。
 * export * from 'xxx' 
 * node 模块
 * 动态导入
 */

export default '1'
export let str = '1'
export {
  str
}
export * from 'xxx'
console.log(str);  //声明提前
import str from 'xxx'
import * as obj from 'xxx'
import a, { str1, str2 as s2 } from 'xxx'
if (true) {   //动态导入
  import('xxx').then(res => {
    console.log(res.default);

  })
}

