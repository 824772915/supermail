// 混入
import BackTop from 'components/content/backTop/BackTop.vue'
export const backTopMiXin = {
  components:{
    BackTop 
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    //返回顶部
    backClick(){
      // console.log("12345");
      // 方法一
      //scrollTo(0,0,500) (x轴位置，y轴位置，过渡时间)
      //访问子组件scroll的的scroll属性，使用scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      // 方法二
      //同样访问子组件scroll，直接使用组件中封装的scrollTo方法
      this.$refs.scroll.scrollTo(0,0);
    },
  }
}