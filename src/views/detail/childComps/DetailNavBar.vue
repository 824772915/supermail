<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" 
        v-for="(item,index) in titles" :key="index" 
        :class="{active: index === currentIndex}"
        @click="titleClick(index)"
        >{{item}}</div>  
      </div> 
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  components: { NavBar },
  name:'DetailNavBar',
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    //返回按钮的函数
    backClick(){
    this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: red;
}

.back img{
  /* margin-top: 10px; */
  vertical-align: middle;
}
</style>