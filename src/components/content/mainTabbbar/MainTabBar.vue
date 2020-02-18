<template>
  <TabBar>
    <tab-bar-item path="/home" activeColor="red">
      <img src="~assets/img/tabbar/home.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.png" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="red">
      <img src="~assets/img/tabbar/category.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.png" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item >
    <tab-bar-item path="/cart" activeColor="red">
      <img src="~assets/img/tabbar/shopcart.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/shopcart_active.png" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="red">
      <img src="~assets/img/tabbar/profile.png" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.png" alt="" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </TabBar>
</template>

<script>
    import TabBar from '../../common/tabbar/TabBar'
    import TabBarItem from "../../common/tabbar/TabBarItem";
    export default {
        name: "MainTabBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>
