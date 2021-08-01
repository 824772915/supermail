<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
   mounted(){
     //创建Bscroll事件
     this.scroll = new BScroll(this.$refs.wrapper,{
       probeType:this.probeType, //滑动方式
       pullUpLoad:this.pullUpLoad, //监听上啦刷新事件
       click:true //点击
      })
      //监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll',(position)=>{
          // console.log(position);
          //$emit可以将事件传出去父组件
          this.$emit('scroll',position)
        })
      }
      if(this.pullUpLoad){
        //监听上啦事件
        this.scroll.on('pullingUp',()=>{
          // console.log("上啦加载更多");
          this.$emit('pullingUp')
        })
      }
      
  },
  methods:{
    scrollTo(x,y,time=500){
      //this.scroll &&是为了先判断this.scroll是否已经生效挂载
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log("~~~~");
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>