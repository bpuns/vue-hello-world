import { observe } from './observer'
import { proxy } from './utils'

function initState(vm) {
  const options = vm.$options

  if (options.props) {
    initProps(vm)
  }

  if (options.methods) {
    initMethods(vm)
  }

  if (options.data) {
    initData(vm)
  }

  if (options.computed) {
    initComputed(vm)
  }

  if (options.watch) {
    initWatch(vm)
  }

}

function initProps(vm){}

function initMethods(vm){}

function initData(vm){
  // 1  取出data
  let data = vm.$options.data
  
  // 2  data可能是一个函数，需要执行
  vm._data = typeof data === 'function' ? data.apply(vm) : data || {}

  // 3  把data挂载到vm实例上
  for(let key in vm._data){
    proxy(vm, '_data', key)
  }

  // 4  给data添加代理，监听get和set
  observe(vm._data)

}

function initComputed(vm){}

function initWatch(vm){}

export {
  initState
}