// /**
//  * 队列   先进先出   数组push，然后shift
//  * 栈    先进后出    数字push，然后pop
//  * hash表（对象=》键值对，但是对象的key不能是对象，只能是字符串，数字）
//  * 图   
//  * 数
//  * 链表
//  */

// /** 双向链表 */
// class Node {
//   constructor(element) {
//     this.element = element
//     this.prev = null
//     this.next = null
//   }
// }

// class List {
//   constructor() {
//     this.root = null
//     this.length = 0
//   }
//   append(element) {
//     let node = new Node(element)
//     if (!this.root) {
//       this.root = node
//     } else {
//       let current = this.root
//       while (current.next) {
//         current = current.next
//       }
//       current.next = node
//       current.next.prev = current
//     }
//     this.root.prev = node
//     this.length++
//   }
//   insertAt(index, element) {
//     let ind = 0
//     let node = new Node(element)
//     let current = this.root
//     let prev = null
//     if (index === 0) {
//       this.root = node;
//       node.next = current
//       node.prev = current.prev
//       current.prev = node
//     } else {
//       while (ind < index) {
//         ind++
//         prev = current
//         current = current.next
//       }
//       prev.next = node
//       node.next = current
//       current.prev = node
//       node.prev = prev
//     }
//     this.length++
//   }
//   removeAt(index, element) {
//     let node = new Node(element)
//     let ind = 0;
//     let current = this.root
//     let prev = null
//     if (ind === 0) {
//       this.root = current.next
//       this.root.prev = current.prev
//       current.prev = this.root
//     } else {
//       while (ind < index) {
//         ind++
//         prev = current
//         current = current.next
//       }
//       prev.next = current.next
//       current.prev = prev
//     }
//     this.length--
//   }
// }

// let list = new List()
// list.append(10)
// list.append(50)
// list.insertAt(1, 500)
// list.append(100)
// console.dir(list, { depth: 1000 });

// /** 平衡二叉树 */
class Node {
  constructor(element) {
    this.element = element
    this.left = null
    this.right = null
  }
}
class Tree {
  constructor() {
    this.root = null
  }
  append(element) {
    let node = new Node(element)
    if (!this.root) {
      this.root = node
    } else {
      let current = this.root
      this.insertAt(current,node)
    }
  }
  insertAt(root,node){
    if(node.element<root.element){
      if(!root.left){
        root.left = node
      }else{
        this.insertAt(root.left,node)
      }
    }else{
      if(!root.right){
        root.right = node
      }else{
        this.insertAt(root.right,node)
      }
    }
  }
}
let tree = new Tree()
tree.append(100)
tree.append(150)
tree.append(50)
tree.append(20)
tree.append(80)
tree.append(70)
tree.append(40)
tree.append(10)
console.dir( tree,{depth:1000});
