<template>
  <div class="good-item" @click="itemClick">

    <img :src="showImage" alt="" @load="imageLoad">
    <div class="good-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
    props:{
      goodItem:{
        type:Object,
        default(){
          return {}
        }
      }
  },
  computed:{
    showImage(){
      return this.goodItem.image || this.goodItem.show.img
    }
  },
  methods:{
    imageLoad(){
      // if (this.$route.path.indexOf('/home')){
        this.$bus.$emit('homeItemImageLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //    this.$bus.$emit('detailItemImageLoad')
      // }
      
    },
    itemClick(){
      // console.log("跳转到详情页");
      this.$router.push('/detail/'+this.goodItem.iid)
    }
  }
}
</script>

<style>
.good-item{
  position: relative;
  padding-bottom: 40px;
}
.good-item img{
  width: 100%;
  border-radius: 5px;
}
.good-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.good-info p{
  white-space:nowrap; 
  text-overflow:ellipsis;  
  overflow:hidden; 
  margin-bottom: 3px;
} 
.good-info .price{
  color: red;
  margin-right: 20px;
}
.good-info .collect{
  position: relative;
}
.good-info .collect::before{
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>