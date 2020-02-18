import {debounce} from "./utils";
import {POP,NEW,SELL} from "./const";

export const itemListenerMixin={
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted:function () {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener=()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

