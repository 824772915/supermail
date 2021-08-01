<template>
  <div class="goods">
    <goods-list-item class="goods-item-flex" v-for= "(item,index) in goods" :key="index" :good-item = "item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
  name:"GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }

  }
}
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .goods-item-flex{
    flex: 0 0 48%;
  }
</style>