<template>
<!--      <swiper class="item-swiper">-->
<!--        <swiper-item v-for="item in topImages" >-->
<!--          <img :src="item" alt="">-->
<!--        </swiper-item>-->
<!--      </swiper>-->
  <div class="item-swiper">
    <van-swipe  :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="(item,index) in topImages" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

    export default {
        name: "DetailSwiper",
        components:{

        },
        props:{
            topImages:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.item-swiper{
  height: 300px;
  overflow: hidden;
}
.item-swiper img{
  width: 100%;
}
</style>
