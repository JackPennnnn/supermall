<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text">我的</slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String,
            activeColor:{
              type:String,
                default:'red'
            }
        },
        data(){
            return {
                // isActive:true
            }
        },
        computed:{
            isActive(){
              return this.$route.path==this.path
            },
            activeStyle(){
                return this.isActive?{color:this.activeColor}:{}
            }
        },
        methods:{
            itemClick:function () {

                if(this.$route.path !== this.path){
                    this.$router.replace(this.path)
                }

            }
        }
    }
</script>

<style scoped>

  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 26px;
    vertical-align: middle;
    margin-bottom: 3px;
  }

</style>
