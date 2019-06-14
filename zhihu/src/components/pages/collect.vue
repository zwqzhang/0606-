<template>
  <div class="collect">
    <div class="nav">
      <span class="fa fa-navicon icon" @touchstart="iscolse=true"></span>
      <i class="icon">{{n}}条收藏</i>
    </div>
    <transition name="aa">
      <div class="mask" @touchstart.self="(iscolse=false)" v-if="iscolse">
        <div class="con">
          <div class="top">
            <img src="https://pic1.zhimg.com/v2-af99447ded7fe236a2113bfae6f3aad8.jpg" alt>
            <i>某某某</i>
            <div class="bottom">
              <div class="left" @touchend="iscolse=false">
                <span class="fa fa-star right1"></span>
                <span>我的收藏</span>
              </div>
              <div class="right">
                <span class="fa fa-download right1"></span>
                <span>我的下载</span>
              </div>
            </div>
          </div>
          <div class="bootm fa fa-bank" @touchstart="$router.push('/index')">
            <i>首页</i>
          </div>
        </div>
      </div>
    </transition>
    <p class="p"></p>
    <div class="news" v-for="item in array" :key="item.id" @touchend="toDetail(item.id)">
      <p class="left1">{{item.title}}</p>
      <img :src="item.img" alt class="right2">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import Array from "../../common/js/Array";
export default {
  components: {},
  props: [],
  data() {
    return {
      iscolse: false,
      n: "",
      arr: [],
      array: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    toDetail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  mounted() {
    // this.n = Array.arr.length;
    // for (var i = 0; i < Array.arr.length; i++) {
    //   this.$http({
    //     url: API.detail + Array.arr[i],
    //     method: "get"
    //   }).then(d => {
    //     // console.log(d);
    //     this.arr=d.data
    //   });
    // }

    this.array = JSON.parse(localStorage.getItem("re"));
    this.n=this.array.length;
    // console.log(this.array);
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.collect {
  overflow: hidden;
}

nav();
mask();

.p {
  margin-top: 1.5rem;
}

.news {
  width: 96%;
  height: $width4;
  margin: 0 auto;
  margin-bottom: 10px;
  background: $bgcolor;
  border-radius: 10px;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
}

.left1 {
  float: left;
  width: 60%;
  padding: 4%;
  margin-top: 10px;
  font-size: $h3;
  line-height: $h1;
}

.right2 {
  float: left;
  width: $width3;
  height: $width3;
  margin-top: 0.25rem;
}
</style>
