export default {
  addCart(context,payload){
      return new Promise((resolve, reject) => {
        //payload新添加的商品
        let oldProduct = null;
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            oldProduct = item;
          }
        }
        //判断oldProduct
        if(oldProduct){//数量加一
          context.commit('addCounter',oldProduct)
          resolve('当前的商品数量+1')
        }else{//添加了新的商品
          payload.count = 1
          payload.check=true
          context.commit('addToCart',payload)
          resolve('添加了新的商品')
        }
      })

  }
}
