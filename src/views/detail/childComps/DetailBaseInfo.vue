<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
         <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
          <img :src="goods.services[index-1].icon" alt="">
          <span>{{goods.services[index-1].name}}</span>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
  .info-title{
    color: #222;
  }
  .info-price{
    margin-top: 10px;
    position: relative;
  }
  .info-price .n-price{
    font-size: 24px;
    color: red;
  }
  .info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    /* 中间画横线 */
    text-decoration: line-through;
  }
  .discount{
    /* margin-top: 30px; */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    color: #fff;
    background-color: red;
    /* width: 50px;
    height: 30px; */
    /* line-height: 30px; */
    border-radius: 5px;
  }
  .info-other{
    font-size: 15px;
    margin-top: 30px;
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid #999;
  }
  .info-other span{
    flex: 1;
  }
  .info-service{
    display: flex;
    margin-top: 20px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  .info-service-item{
    flex: 1;
    white-space:nowrap
  }
  .info-service-item img{
    text-align:center;
    width: 12px;
    height: 12px;
  }
</style>