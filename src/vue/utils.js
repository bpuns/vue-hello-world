function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}

function isObject(value){
  return value !== null && typeof value === 'object'
}

function isArray(value){
  return Array.isArray(value)
}

export {
  proxy,
  isArray,
  isObject
}