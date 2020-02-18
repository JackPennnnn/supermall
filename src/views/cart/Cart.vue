<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的展示-->
    <cart-list></cart-list>

    <!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartList from "./chidComps/CartList";
    import CartBottomBar from "./chidComps/CartBottomBar";
    import {mapGetters} from 'vuex'

    export default {
        name: "Cart",
        components: {
            NavBar, CartList,CartBottomBar
        },
        computed: {
            // ...mapGetters(['cartLength'])
            ...mapGetters({
                length: 'cartLength'
            })
        }

    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;

  }
</style>
