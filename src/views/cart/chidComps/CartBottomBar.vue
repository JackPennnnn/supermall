<template>
    <div class="bottom-bar">
      <div class="checkAll">
        <check-button class="check-button"
                      :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>

      <div class="price">
        合计:{{totalPrice}}
      </div>


      <div class="calculate" @click="calcClick">
        去计算:{{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            totalPrice(){
                return '￥' + this.$store.getters.cartList.filter(item =>{
                    return item.check
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0)
            },
            checkLength(){
                return this.$store.state.cartList.filter(item=>{
                    return item.check
                }).length
            },
            isSelectAll(){
                if(this.$store.getters.cartList.length===0 || this.$store.getters.cartList.filter(item => !item.check).length>0){
                    return false
                }else{
                    return true
                }
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){//全部选中
                    this.$store.getters.cartList.forEach(item=>{
                        item.check=false
                    })
                }else{//全部或局部没选中
                    this.$store.getters.cartList.forEach(item=>{
                        item.check=true
                    })
                }
            },
            calcClick(){
                if (!this.isSelectAll){
                    this.$toast.show('请选择购买的商品',2000)
                }
            }
        }

    }
</script>

<style scoped>
.bottom-bar{
  /*background-color: red;*/
  position: relative;
  background-color: #eee;
  display: flex;
  line-height: 40px;
  height: 40px;
}
  .checkAll{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 20%;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 30%;
    background-color: var(--color-tint);
    color: white;
    text-align: center;
  }
</style>
