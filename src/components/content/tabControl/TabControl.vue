<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item"  :class="{active: index === currentIndex}" @click="handleCurrentIndex(index)">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  data(){
    return{
      // 记录谁被选中
      currentIndex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    handleCurrentIndex(index){
      this.currentIndex = index
      //将子组件的数据传出去
      this.$emit('tabClick',index)
    }
  }

  }
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 14px;
}
.tab-control-item{
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: red;
  
}
.active span{
  border-bottom: 3px solid red;
}
</style>