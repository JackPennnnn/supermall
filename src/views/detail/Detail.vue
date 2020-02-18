<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @getScroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @itemImgLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

  </div>
</template>

<script>
  import DetailNavBar from "./childComponent/DetailNavBar";
  import DetailSwiper from "./childComponent/DetailSwiper";
  import DetailBaseInfo from "./childComponent/DetailBaseInfo";
  import DetailShopInfo from "./childComponent/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
  import DetailParamInfo from "./childComponent/DetailParamInfo";
  import DetailCommentInfo from "./childComponent/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComponent/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";


  import {itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";

  export default {
        name: "Detail",
        components:{
            BackTop,
            DetailParamInfo,
            DetailBaseInfo,
            DetailNavBar,DetailSwiper,
            DetailShopInfo,Scroll,
            DetailGoodsInfo,
            DetailCommentInfo,
            GoodsList,DetailBottomBar


        },
        data(){
            return{
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo: {},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                getThemeTopY:null,
                currentIndex:0,
                isShowBackTop:false

            }
        },
      methods:{
            imageLoad(){
                //再mixin里面
                this.newRefresh()
                this.getThemeTopY()
            },
          titleClick(index){
              // console.log(index);

              this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
          },
          contentScroll(position){
                //获取y值
              const positionY=-position.y

              // positionY跟themeTopYs  进行对比
              let length = this.themeTopYs.length
              for(let i=0;i<length;i++){
                  // if (positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
                  //     console.log(i)
                  // }
                  if(this.currentIndex!=i && ((i < length - 1 && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) ||
                      (i === length-1 && positionY >= this.themeTopYs[i]))){
                      this.currentIndex=i;
                      this.$refs.nav.currentIndex=this.currentIndex
                  }
              }

              //判断BackTop是否显示
              this.isShowBackTop = Math.abs(position.y)>1000?true:false;
          },

          backClick(){
              //this.$refs.scroll.scrollTo 拿的是Scroll.vue 里面methods的scrollTo
              this.$refs.scroll.scrollTo(0,0,500)//x,y,ms
          },


          addToCart(){
                //获取购物车需要展示的信息
              const product={}
              product.image = this.topImages[0]
              product.title=this.goods.title
              product.desc = this.goods.desc
              product.price = this.goods.realPrice
              product.iid = this.goods.iid
              

              //将商品加入到购物车里面 (mutation)
              // this.$store.commit('addCart',product)

              this.$store.dispatch('addCart',product).then(res=>{
                  // this.show = true
                  // this.message = res
                  //
                  // setTimeout(()=>{
                  //     this.show = false;
                  //     this.message = ''
                  // },1500)

                  this.$toast.show(res,1500)
              })
          }

      },
        created() {
            this.iid = this.$route.params.iid

           getDetail(this.iid).then(res => {
               //获取轮播图片
               const data=res.data.result
               this.topImages=res.data.result.itemInfo.topImages
               //获取商品信息
               this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

               //创建店铺信息的对象
               this.shop = new Shop(data.shopInfo)

               //保存商品的详情数据
               this.detailInfo = data.detailInfo

               //获取参数信息
               this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

                //取出评论信息
               if(data.rate.cRate !==0){
                   this.commentInfo = data.rate.list[0]
               }
           })


              //请求详情数据
            getRecommend().then(res=>{
                this.recommends=res.data.data.list
            })

            //给getThemeTopY赋值 防抖
            //1.created不行 压根不能获取元素
            //2.mounted不行，数据还没获取到
            //3.updated不行，DOM还没有渲染完
            //4.$nextTick不行，图片的高度没有被计算在内
            //在图片加载完成后，获取的高度才是正确的
            this.getThemeTopY=debounce(()=>{
                this.themeTopYs=[]
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
                console.log(this.themeTopYs);
            },100)
        },
      mixins:[itemListenerMixin],
      mounted() {

      },
      destroyed() {
            this.$bus.$off('itemImgLoad',this.itemImgListener)
      }
  }
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: white;
}
  .content{
    height: calc(100% - 44px - 58px);
  }
</style>
