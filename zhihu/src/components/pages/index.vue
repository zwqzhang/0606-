<template>
  <div
    class="index"
    @touchstart="Allstart($event)"
    @touchmove="Allmove($event)"
    @touchend="Allend()"
  >
    <!-- 顶部导航栏 -->
    <div class="nav">
      <span class="fa fa-navicon icon" @touchstart="iscolse = true"></span>
      <i class="icon" id="shouye">首页</i>
      <span class="fa fa-bell icon"></span>
      <span class="fa fa-ellipsis-v icon"></span>
    </div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" :show-indicators="true">
      <mt-swipe-item v-for="item in arr" :key="item.id">
        <img
          :src="item.image"
          alt
          class="img"
          @touchstart="start($event)"
          @touchmove="move($event)"
          @touchend="end(item.id)"
        >
      </mt-swipe-item>
    </mt-swipe>

    <transition name="aa">
      <div class="mask" @touchstart.self="(iscolse=false)" v-if="iscolse">
        <div class="con">
          <div class="top">
            <img src="https://pic1.zhimg.com/v2-af99447ded7fe236a2113bfae6f3aad8.jpg" alt>
            <i>某某某</i>
            <div class="bottom">
              <div class="left" @touchend="$router.push('/collect')">
                <span class="fa fa-star right1"></span>
                <span>我的收藏</span>
              </div>
              <div class="right">
                <span class="fa fa-download right1"></span>
                <span>我的下载</span>
              </div>
            </div>
          </div>
          <div class="bootm fa fa-bank" @touchstart="iscolse=false">
            <i>首页</i>
          </div>
        </div>
      </div>
    </transition>

    <v-list></v-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swipe, SwipeItem } from "mint-ui";
import API from "../../common/js/API";
import vList from "./list";
export default {
  components: {
    vList
  },
  props: [],
  data() {
    return {
      arr: [],
      iscolse: false,
      startX: 0,
      endX: 0,
      AstartX: 0,
      AendX: 0
    };
  },
  watch: {},
  filters: {},
  computed: {},
  methods: {
    // 轮播图滑动改变
    start(e) {
      this.startX = e.touches[0].startX;
      this.endX = 0;
    },
    move(e) {
      this.endX = e.touches[0].endx;
    },
    end(id) {
      if (this.endX == 0) {
        this.$router.push("/detail/" + id);
      }
    },
    // 右滑显示遮罩层
    Allstart(ev) {
      this.AstartX = ev.touches[0].clientX;
      this.AendX = 0;
    },
    Allmove(ev) {
      this.AendX = ev.touches[0].clientX;
    },
    Allend() {
      if (
        this.AendX < 100 &&
        this.AstartX < 80 &&
        this.AendX - this.AstartX > 20
      ) {
        this.iscolse = true;
      }
    }
  },
  mounted() {
    // 获取banner图
    this.$http({
      url: API.banner,
      method: "get"
    }).then(d => {
      // console.log(d);
      this.arr = d.data.top_stories;
      this.cord = d.data.stories;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index {
  width: 100vw;
}

nav();

.mint-swipe {
  height: $bheight;
  margin-top: $width1;
}

.mint-swipe>>>.mint-swipe-indicator {
  opacity: 0.8;
}

.img {
  width: 100vw;
  height: $bheight;
}

mask();
</style>
