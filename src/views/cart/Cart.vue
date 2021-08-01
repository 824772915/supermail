<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content-cart" ref="scroll" :probe-type="3">
    <!-- 商品列表 -->
    <div>
      <cart-list></cart-list>
    </div> 
    </scroll>
    <!-- 底部汇总 -->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { mapGetters  } from "vuex";
import CartList from './childComps/cartList.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import CartButtomBar from './childComps/cartButtomBar.vue';
  export default {
    name: "Cart",
    components:{
     NavBar,
     CartList,
        Scroll,
        CartButtomBar
    },
    computed:{
     ...mapGetters(['cartLength'])
    },
    activated(){
      // console.log("~~~~~");
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
  overflow: hidden;
}
.nav-bar{
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content-cart{
  /* height: calc(100%-44px); */
  /* height: 100vh; */
  height: calc(100%);
  overflow: hidden;
}
</style>
