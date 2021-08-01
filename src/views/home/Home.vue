<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tabControl tabControlfixed" v-show="isTabFixed" @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl1" />
    <scroll class="content1" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll = "contentScroll" @pullingUp = "LoadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-views></feature-views>
      <tab-control class="tabControl" @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl.vue'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureViews from './childComps/FeatureViews.vue';
  
  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "../../common/utils";

  import GoodsList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'



  export default {
    name: "Home",

    data(){
      return{
        banners: [],
        recommends: [],
        titles:[],
        goods:{
          //设计数据模型进行存储请求到的内容
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]},

        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0, //吸顶效果
        isTabFixed:false //是否固定
      }
    },
    components: {
      NavBar,
      TabControl,

      HomeSwiper,
      RecommendView,
      FeatureViews,
      GoodsList,
      Scroll,
        BackTop  
      },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
       // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
       //监听图片加载完成
      this.$bus.$on('homeItemImageLoad',()=>{
        //事件总线
        //refresh重新刷新高度，解决scroll滑动bug
        //this.$refs.scroll.refresh()
        refresh()
      })

      
    },
    activated(){
      const rerefresh = debounce(this.$refs.scroll.refresh,200)
      rerefresh()
      // this.$refs.scroll.refresh
    },
    methods:{
      
       // 1.请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
       // 请求商品数据
      getHomeGoods(type){
         const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
            // console.log(res);
            this.goods[type].list.push(...res.data.list) 
            console.log(this.goods[type].list)  
            this.goods[type].page += 1
            //完成上啦加载更多
            this.$refs.scroll.finishPullUp()
        })
      },
      //点击个改变数据
      tabClick(index){
        console.log(index)
        if(index == 0){
          this.currentType = "pop"
          // console.log(this.currentType);
        }else if(index == 1){
           this.currentType = "new"
          //  console.log(this.currentType);
        }else if(index == 2){
           this.currentType = "sell"
          //  console.log(this.currentType);
        }
        //使得两个导航组件按钮一致
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },   
      //返回顶部
      backClick(){
        console.log("12345");
        // 方法一
        //scrollTo(0,0,500) (x轴位置，y轴位置，过渡时间)
        //访问子组件scroll的的scroll属性，使用scrollTo方法
        // this.$refs.scroll.scroll.scrollTo(0,0,500)

        // 方法二
        //同样访问子组件scroll，直接使用组件中封装的scrollTo方法
        this.$refs.scroll.scrollTo(0,0);
      },
      //实时监听位置实现 滑动到一定位置展示backtop 并且实现粘性导航栏
      contentScroll(position){
        //1.backtop的显示
        this.isShowBackTop = (-position.y) >1000 
        // console.log(position);

        //tabcontrol的吸顶效果 
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //上啦加载更多
      LoadMore(){
        // console.log("上啦加载更多");
        //当上啦事件触发的时候调用getHomeGoods方法使得页数增加之后从新请求数据
        this.getHomeGoods(this.currentType)


      },
      swiperImageLoad(){
       //2.获取tabOffsetTop吸顶效果
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    computed:{
      //设置计算属性 使得传进去子组件goodslist的列表值数据存储到内存中，减少不必要的请求
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    /* position: relative; */
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 固定定位实现底部导航栏或者顶部导航栏 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0; */
    z-index: 100;
    
  }
  /* .tabControl{
    background-color: #fff;
    position: sticky;
    top:44px;
    z-index: 100;
  } */
  .content1{
    /* calc函数可以计算出需要滑动的屏幕高度 */
    /* height: calc(100%-93px); */
    position: absolute; 
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* height: 100%; */
    /* height: 100%; */

    overflow: hidden;
    /* height: 300px; */
  }
  .tabControlfixed{
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    top: 44px;
    background-color: #fff;
    
  }

</style>
