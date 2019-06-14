<template>
  <div class="list">
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
import $ from "jquery";

function getDate(num) {
  var date = new Date().getTime();
  // var m = (this.newDate -= 1000 * 60 * 60 * 24);
  // var x = new Date(m);
  var x = new Date(date - (num - 1) * 1000 * 60 * 60 * 24);
  var year = x.getFullYear();
  var month =
    x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1;
  var day = x.getDate() < 10 ? "0" + x.getDate() : x.getDate();
  var params = year + month + day;
  return {
    params: params
  };
}
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
      endY: 0,
      isload: true,
      num:0,
    };
  },
  watch: {
  },
  filters: {},
  computed: {},
  methods: {
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
    },
    getNewData() {
      if (this.isload) {
        this.isload = false;
        this.num++;
        this.$http({
          url: API.gone + "/" + getDate(this.num).params,
          method: "get"
        }).then(d => {
          this.isload=true;
          this.all.push(d);
        });
      }
    }
  },
  mounted() {
    // 获取今日头条数据
    this.$http({
      url: API.banner,
      method: "get"
    }).then(d => {
      // console.log(d);
      this.arr = d.data.top_stories;
      this.cord = d.data.stories;
    });
    var that = this;
    $(window).scroll(function() {
      // 可视区的高度
      var top1 = $(window).height();
      // 滚动条的高度
      var top2 = $(window).scrollTop();
      // 文档的高度
      var top3 = $(document.body).height();
      if (top1 + top2 >= top3) {
        // console.log("111");
        that.getNewData();
      }
  // 根据每一个时间的盒子‘$('.box')’到整个文档的高度‘$('.box).eq(i).offset().top’减去滚动条的高度‘$(window).scrollTop()’，即元素到可视区顶部的高度来设置nav中应该显示哪一天的日期
      for (var i = 0; i < $(".box").length; i++) {
        if ($(".box").eq(i).offset().top -top2 <35) {
          $("#shouye").html($(".box").eq(i).html());
        } else if ((top2 == 0)) {
          $("#shouye").html("首页");
        }
      }
    });
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
