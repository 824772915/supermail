import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default
{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
          // 查找之前数组有无该iid 返回给product
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 判断
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('商品数量加1')
    }else{
      payload.count = 1
      // context.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
      resolve('添加了新的商品')
    }
    })
  }
}