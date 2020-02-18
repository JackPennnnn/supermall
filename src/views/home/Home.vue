<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabclick="tabclick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3" @getScroll="getScroll"
            :pull-up-load="true" @isPullingUp="loadMore">
      <div class="swipe-wrapper">
      <van-swipe  :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(item,index) in banners" :key="index">
          <img v-lazy="item.image" @load="imgLoad"/>
        </van-swipe-item>
      </van-swipe>
      </div>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabclick="tabclick" ref="tabControl2"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>

</template>

<script>
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultidata, getHomeGoods} from "../../network/home";

    import NavBar from "../../components/common/navbar/NavBar";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";

    import {debounce} from "../../common/utils";
    import {itemListenerMixin} from "../../common/mixin";

    export default {
        name: "Home",
        components: {
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop

        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {
                        page: 0,
                        list: []
                    },
                    'new': {
                        page: 0,
                        list: []
                    },
                    'sell': {
                        page: 0,
                        list: []
                    },
                },
                currentType: 'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0

            }
        },
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,0)

            this.$refs.scroll.refresh()

        },
        deactivated(){
            this.saveY=this.$refs.scroll.scroll.y

            //取消全局事件的监听
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        },

        created() {
            //1.请求多个数据
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('sell')
            this.getHomeGoods('new')
        },
        mixins:[itemListenerMixin],
        updated(){

        },

        methods: {
            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.data.banner.list;
                    this.recommends = res.data.data.recommend.list;
                });
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.data.list);
                    this.goods[type].page + 1

                    this.$refs.scroll.finishPullUp()
                })
            },

            /**
             * 事件监听相关的方法
             * */
            tabclick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                }
                this.$refs.tabControl1.currentIndex= index;
                this.$refs.tabControl2.currentIndex= index;
            },
            backClick(){
                //this.$refs.scroll.scrollTo 拿的是Scroll.vue 里面methods的scrollTo
                this.$refs.scroll.scrollTo(0,0,500)//x,y,ms
            },

            getScroll(position){
                //判断BackTop是否显示
                this.isShowBackTop = Math.abs(position.y)>1000?true:false;
                this.isTabFixed = Math.abs(position.y)>this.tabOffsetTop?true:false
            },
            loadMore(){
                this.getHomeGoods(this.currentType)
            },
          imgLoad(){
            //获取tabControl的offsettop
            //所有的组件都有一个属性$el: 用户获取组件元素  组件本身没有offettop 元素才有
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
          }



        }
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }
  .swipe-wrapper img{
    width: 100%;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
  .tab-control{
      position: relative;
    z-index:10
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
