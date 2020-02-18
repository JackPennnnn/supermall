<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :itemInfo="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Scroll from "../../../components/common/scroll/Scroll";
    import CartListItem from "./CartListItem";
    export default {
        name: "CartList",
        computed: {
            ...mapGetters(['cartList'])
        },
        components: {
            CartListItem,
            Scroll
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
.content{
  overflow: hidden;
  height: calc(100vh - 44px - 49px - 40px);

}
</style>
