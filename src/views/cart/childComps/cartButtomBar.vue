<template>
  <div class="bottom-bar">
    <!-- 全选按钮 -->
    <div class="check-content" >
      <check-button :isChecked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calcuate" @click="calcClcik">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  components: { CheckButton },
 name:'cartButtomBar',
 computed:{
   totalPrice(){
     return "￥" + this.$store.state.cartList.filter(item =>{
       return item.checked
     }).reduce((preValue,item) => {
       return preValue + item.price * item.count
     },0)
   },
   checkLength(){
     return this.$store.state.cartList.filter(item => item.checked).length
   },
   isSelectAll(){
    //方案1  return !(this.$store.state.cartList.filter(item => !item.checked).length)
    //if判断实现一开始全选按钮不选中状态
    if(this.$store.state.cartList.length === 0)return false
    // 全选逻辑 使用find寻找是否存在没有选中的item.checked 如果有即为true 对其取反为false再返回
    return !(this.$store.state.cartList.find(item => !item.checked)) 
   }
 },
 methods:{
   checkClick(){
     if(this.isSelectAll === true){
       this.$store.state.cartList.forEach(item => {
         item.checked = false
       });
     }else{
       this.$store.state.cartList.forEach(item => {
         item.checked = true
       });
     }
     
   },
   calcClcik(){
     if(this.checkLength == 0){
       this.$toast.show('请选择购买的商品',1500)
     }
   }
 }
}
</script>

<style>
.bottom-bar{
  height: 40px;
  /* line-height: 40px; */
  align-items: center;
  background-color: #eee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  height: 40px;
  /* line-height: 40px; */
}
.check-button{
  margin-left:10px ;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.price{
  margin-left: 30px;
  margin-right: 100px;
}
.calcuate{
  flex: 1;
  /* width: 100px; */
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: red;
  color: #fff;
}
</style>