import { observe } from "."

const ARR_METHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reserve'
]

const originArrPrototype = Array.prototype
const newArrayMethods = Object.create(originArrPrototype)

ARR_METHODS.map(m => {
  newArrayMethods[m] = function () {
    // 执行原型的方法
    const args = Array.prototype.slice.call(arguments)
  
    const rt = originArrPrototype[m].apply(this, args)

    // 因为push，unshift，splice都可以玩数组中插入数据
    // 所以需要对插入的数据做响应式处理

    let newArr 

    switch(m){
      case 'push':
      case 'unshift':
        newArr = args
        break
      case 'splice':
        newArr = args.slice(2)
        break
    }

    newArr && observe(newArr)

    return rt
  }
})

export {
  newArrayMethods
}