<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item="item" ></cart-list-item>
  </div>
</template>

<script>
import { mapGetters  } from "vuex";
import CartListItem from './cartListItem.vue';
export default {
  name:'cartList',
  data(){
    return{

    }
  },
  components:{
    CartListItem
  },
  computed:{
  ...mapGetters(['cartList'])
  },
  activated(){
    // console.log("11111");
  }
}
</script>

<style >

</style>