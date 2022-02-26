
import { isArray, isObject } from '../utils'
import { newArrayMethods } from './array'

class Observer {

  constructor(data) {

    if (isArray(data)) {
      data.__proto__ = newArrayMethods
      this.observeArr(data)
    } else {
      this.walk(data)
    }

  }

  walk(data) {

    for (let key in data) {
      defineReactive(data, key, data[key])
    }

  }

  observeArr(data) {
    data.forEach(observe)
  }

}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      console.log('响应式获取：', value)
      return value
    },
    set(newValue) {
      if (newValue === value) return
      console.log('响应式设置：', key, newValue)
      observe(newValue)
      value = newValue
    }
  })
}

function observe(data) {
  if (isObject(data)) {
    new Observer(data)
  }
}

export {
  observe
}