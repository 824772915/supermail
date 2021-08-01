<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="warpper2" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll">
      <div class="content2">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </div>
    </scroll>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import Scroll from '../../components/common/scroll/Scroll.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {debounce} from "../../common/utils";
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// import {backTopMiXin} from '../../common/mixin'
import BackTop from '../../components/content/backTop/BackTop.vue'
// import Toast from '../../components/common/toast/Toast.vue'

export default {
  name:'Detail',
  // mixins:[backTopMiXin],
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemsTopY: null,
      currentIndex:0,
      isShowBackTop:false,
      // message:'',
      // show:false
    }
  },
  created(){
    
  },
  mounted(){
    // imageLoad()
    //监听详情图片的加载完成
    const refreshDeatail = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('detailItemImageLoad',()=>{
        refreshDeatail()
      })
    this.$bus.$on('imageLoad',()=>{
        //事件总线
        //refresh重新刷新高度，解决scroll滑动bug
        //this.$refs.scroll.refresh()
        imageLoad()
      })

    // 点击滚动到对应位置

  },

  activated(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.请求商品请求
    getDetail(this.iid).then(res =>{
      const data = res.result;
      // console.log(res);
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages);
      // 获取商品信息 
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods);
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop);
      // 获取商品的详情数据
      this.detailInfo = data.detailInfo
      // 获取商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo);
      // 取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        // console.log(this.commentInfo);
      }
    })

    //3.请求推荐数据
    getRecommend().then(res=>{
      console.log(res);
      this.recommends = res.data.list
    })

    //4.给getThemsTopY赋值
    this.getThemsTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //给一个最大值确保可以实现后面的判断方法
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    })
  },

  methods:{
    imageLoad(){
      // console.log("+++");
      this.$refs.scroll.refresh()
      this.getThemsTopY()
    },
    titleClick(index){
      // console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      
     
    },
    contentScroll(position){
      // console.log(position)
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0;i<length-1;i++){
        // if(this.currentIndex !== i && ((i< length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length-1 && positionY >= this.themeTopYs[i]))){
        //   // console.log(i)
        //   this.currentIndex = i
        //   // console.log(this.currentIndex)
        //   //对子组件的通信
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        if((this.currentIndex !== i)&&(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //1.backtop的显示
      this.isShowBackTop = (-position.y) >1000 
    },
    //返回顶部
    backClick(){
        this.$refs.scroll.scrollTo(0,0);
    },
    addCart(){
      // console.log("~~~~");
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车 使用vuex进行管理
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res =>{
      //   this.show = true
      //   this.message = res 
      //   setTimeout(() => {
      //     this.show = false
      //     this.message = ''
      //   }, 1000);
      //   console.log(res);
           this.$toast.show(res,1500)
      })
    }
  }
}
</script>

<style scoped>
#detail{
  z-index: 100;
  position: relative;
  background-color: #fff;
  height: 100vh;
  /* height: 300px; */
}
.detail-nav{
  position: relative;
  background-color: #fff;
  z-index: 1000;
}
.warpper2{
  height: calc(100%);
  overflow: hidden;
        /* position: absolute; 
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden; */
}
.content2{
  /* height: calc(100%-44px); */
  /* height: 100vh; */

}
</style>

