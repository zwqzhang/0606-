<template>
  <div class="comment">
    <div class="nav">
      <v-back class="icon"></v-back>
      <i class="icon">{{arr1.length+arr2.length}}条点评</i>
      <span class="fa fa-edit icon"></span>
    </div>
    <!-- 评论区 -->
    <div class="content">
      <!-- 长评论 -->
      <div class="long">
        <span class="left">{{arr1.length}}条长评</span>
        <!-- <span class="fa fa-angle-double-up right"></span> -->
      </div>
      <ul class="ul">
        <li class="li" v-for="item in arr1" :key="item.id">
          <div class="li_left">
            <img :src="item.avatar" alt>
          </div>
          <div class="li_center">
            <h3>{{item.author}}</h3>
            <p>{{item.content}}</p>
            <p class="time">{{item.time|commenttime}}</p>
          </div>
          <div class="li_right">
            <em class="fa fa-thumbs-up">
              <i>{{item.likes}}</i>
            </em>
          </div>
        </li>
      </ul>

      <!-- 中间图片 -->

      <img class="pic" src="../../../static/img/1.jpg" v-if="arr1.length==0" alt>

      <!-- 短评论 -->
      <div class="long short" @touchstart="close()">
        <span class="left">{{arr2.length}}条短评</span>
        <span class="fa fa-angle-double-up right" v-if="!show"></span>
        <span class="fa fa-angle-double-down right" v-if="show"></span>
      </div>
      <ul class="ul" v-if="show">
        <li class="li" v-for="item in arr2" :key="item.id">
          <div class="li_left">
            <img :src="item.avatar" alt>
          </div>
          <div class="li_center">
            <h3>{{item.author}}</h3>
            <p>{{item.content}}</p>
            <p class="time">{{item.time|commenttime}}</p>
          </div>
          <div class="li_right">
            <em class="fa fa-thumbs-up">
              <i>{{item.likes}}</i>
            </em>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import $ from "jquery";
export default {
  components: {},
  props: [],
  data() {
    return {
      arr1: [],
      arr2: [],
      show: false,
      onOff:true,
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      if ((this.onOff = true)) {
        this.show = !this.show;
        $(".pic").css("display", "none");
        this.onOff=false;
      }else{
        this.show = !this.show;
        $(".pic").css("display", "block");
        this.onOff=true;
      }
    }
  },
  mounted() {
    var id = this.$route.params.id;
    // 对应的长评论
    this.$http({
      url: API.comment + id + "/long-comments",
      method: "get"
    }).then(d => {
      // console.log(d);
      this.arr1 = d.data.comments;
    });
    // 对应的短评论
    this.$http({
      url: API.comment + id + "/short-comments",
      method: "get"
    }).then(d => {
      // console.log(d);
      this.arr2 = d.data.comments;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.comment {
  width: 100vw;
  min-height: 100vh;
}

nav();

.icon {
  display: inline-block;
  height: 1rem;
  color: $bgcolor;
  font-size: $h3;
  margin-left: 20px;
}

.content {
  width: 100vw;
  min-height: 100vh;
  background: $bgcolor;
}

.long {
  width: 100vw;
  height: $width1;
  line-height: $width1;
  margin-top: $width1;
  display: flex;
  border-bottom: 1px solid $bgcolor3;
  border-top: 1px solid $bgcolor3;

  span {
    flex: 1;
  }

  .left {
    margin-left: 10px;
  }

  .right {
    margin-right: 20px;
    text-align: right;
  }
}

.ul {
  width: 100vw;
  min-height: 0vh;
  background: $bgcolor;
}

.li {
  width: 90%;
  height: 90%;
  padding: 5% 5% 0 5%;
  display: flex;
  border-bottom: 1px solid $bgcolor3;
}

.li_left {
  width: 10%;

  img {
    width: 0.5rem;
    height: 0.5rem;
    padding-top: 10px;
  }
}

.li_center {
  flex: 1;
  padding: 0 2%;

  h3 {
    font-weight: bold;
    font-size: $h3;
    height: 0.5rem;
    line-height: 0.5rem;
  }

  p {
    font-size: $h3;
    line-height: $h1;
  }

  .time {
    display: block;
    height: $width1;
    line-height: $width1;
    color: $bgcolor3;
    font-size: 0.25rem;
  }
}

.li_right {
  padding-top: 10px;
  width: 10%;
  color: $bgcolor3;

  i {
    margin: 8px;
  }
}

.pic {
  width: 100vw;
  height: 77vh;
}

.short {
  margin: 0;
}
</style>
