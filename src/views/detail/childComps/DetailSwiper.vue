<template>
  <swiper class="detail-swiper">
    <swiper-item class="detail-swiper-item" v-for="(item,index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
  
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    data(){
      return{
       
      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
    }
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
}
</style>
