import Toast from "./Toast";

const obj = {}

obj.install = function(Vue){
  // console.log('执行obj');
  // document.body.appendChild(Toast.$el)
  //第一步 创建组件封装器
  const toastContrustor = Vue.extend(Toast)

  //第二步 new的方式 根据组件封装器可以创建一个组件对象
  const toast = new toastContrustor()

  //第三步 挂载
  toast.$mount(document.createElement('div'))

  // 第四步 $el对应就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj