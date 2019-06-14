<template>
  <div class="list" @touchend="next()">
    <p class="hotNews">今日热闻</p>
    <!-- 列表 -->
    <div
      class="news"
      v-for="item in cord"
      :key="item.id"
      @touchstart="start($event)"
      @touchmove="move($event)"
      @touchend="end(item.id)"
    >
      <p class="left">{{item.title}}</p>
      <img v-lazy="item.images[0]" :src="item.images[0]" alt class="right">
    </div>

    <!-- <div class="list">
      <p class="left">尊敬的看风景的开发大家看对方电话回访等复活点回访电话</p>
      <img src="https://pic1.zhimg.com/v2-c7f01cb72d161d5e9c818704ac9fb77c.jpg" alt class="right">
    </div>-->

    <div v-for="(item,index) in all" :key="index">
      <h2 class="hotNews box">{{item.data.date|timefilter}}</h2>
      <div
        v-for="subitem in item.data.stories"
        :key="subitem.id"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end(subitem.id)"
      >
        <div class="news">
          <p class="left">{{subitem.title}}</p>
          <img v-lazy="subitem.images[0]" :src="subitem.images[0]" alt class="right">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import $ from 'jquery'
export default {
  components: {},
  props: [],
  data() {
    return {
      cord: [],
      newDate: new Date().getTime() + 1000 * 60 * 60 * 24,
      now: null,
      time: "",
      all: [],
      startY: 0,
      endY: 0
    };
  },
  watch: {
    // hotNews() {
    //   var box = document.getElementsByClassName("hotNews")[0];
    //   var height = box.offsetTop;
    //   console.log(height);
    // }
  },
  filters: {},
  computed: {},
  methods: {
    next() {
      // 可视区高度
      var clientH = document.documentElement.clientHeight;
      // 滚动条高度
      var scrollTop = document.documentElement.scrollTop;
      // 文档高度
      var bodyH = document.body.scrollHeight;
      if (bodyH - clientH - scrollTop < 100) {
        var m = (this.newDate -= 1000 * 60 * 60 * 24);
        var x = new Date(m);
        var year = x.getFullYear();
        var month =
          x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1;
        var day = x.getDate() < 10 ? "0" + x.getDate() : x.getDate();
        this.now = year + month + day;
        this.$http({
          url: API.gone + "/" + this.now,
          method: "get"
        }).then(d => {
          this.all.push(d);
        });
      }
    },
    start(ev) {
      this.startY = ev.touches[0].clientY;
      this.endY = 0;
    },
    move(ev) {
      this.endY = ev.touches[0].clientY;
    },
    end(id) {
      if (this.endY == 0) {
        this.$router.push("/detail/" + id);
      }
    }
  },
  mounted() {
    this.$http({
      url: API.banner,
      method: "get"
    }).then(d => {
      // console.log(d);
      this.arr = d.data.top_stories;
      this.cord = d.data.stories;
    });
    // window.onscroll = function() {
    //   var box = document.getElementsByClassName("box")[0];
    //   var shouye = document.getElementsByClassName("shouye")[0];
    //   var scrollTop = document.documentElement.scrollTop;
    //   var height = box.offsetTop - scrollTop;
    //   console.log(box.offsetTop);
    //   if ((height <= 35)) {
    //     shouye.innerHTML = box.innerHTML;
    //   } else {
    //     shouye.innerHTML = shouye.innerHTML;
    //   }
    // };
    
    $(window).scroll(function(){
      
      var top2=$(window).scrollTop()    
      for(var i=0;i<$('.box').length;i++){
        if($('.box').eq(i).offset().top-top2<35){
          // console.log(111);
          $('#shouye').html($('.box').eq(i).html())
        }else if(top2=0){
          $('#shouye').html('首页')
        }
      }
      
    })

  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.hotNews {
  color: $fontcolor1;
  font-size: $h3;
  line-height: $lineheight;
  margin-left: $margin * 2;
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

.left {
  float: left;
  width: 60%;
  padding: 4%;
  margin-top: 10px;
  font-size: $h3;
  line-height: $h1;
}

.right {
  float: left;
  width: $width3;
  height: $width3;
  margin-top: 0.25rem;
}
</style>
