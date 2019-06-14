<template>
  <div class="detail">
    <div class="nav">
      <v-back class="icon i"></v-back>
      <span class="fa fa-share-alt icon"></span>
      <span class="fa fa-star icon" :class="{orange:turn}" @touchend="end()"></span>
      <span class="fa fa-file-text-o icon" @touchstart="tocomment(d)">
        <i>{{a1}}</i>
      </span>
      <span class="fa fa-thumbs-up icon">
        <i>{{a3}}</i>
      </span>
    </div>
    <link rel="stylesheet" :href="style">
    <div v-html="body"></div>
    <div class="title">
      <img :src="img" alt class="img">
      <div class="blank"></div>
      <p>{{title}}</p>
      <i>图片:{{image_source}}</i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import Array from "../../common/js/Array";
import $ from "jquery";
export default {
  components: {},
  props: [],
  data() {
    return {
      turn: false,
      body: "",
      style: "",
      arr: [],
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      d: "",
      img: "",
      title: "",
      image_source: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    tocomment(id) {
      this.$router.push("/comment/" + id);
    },
    // end() {
    //   if (Array.arr.indexOf(this.d) == -1) {
    //     this.turn = true;
    //     Array.arr.push(this.d);
    //   } else {
    //     this.turn = false;
    //     var m = Array.arr.indexOf(this.d);
    //     Array.arr.splice(m, 1);
    //   }
    // }
    end() {
      var re = localStorage.getItem("re")
        ? JSON.parse(localStorage.getItem("re"))
        : [];
      if (re.some(item => item.id == this.$route.params.id)) {
        this.turn = false;
        for (var i = 0; i < re.length; i++) {
          if (re[i].id == this.$route.params.id) {
            re.splice(i, 1);
          }
        }
      } else {
        this.turn = true;
        re.push({
          title: this.title,
          img: this.img,
          id: this.d
        });
      }
      localStorage.setItem("re", JSON.stringify(re));
    }
  },
  mounted() {
    // if (Array.arr.indexOf(this.d) != -1) {
    //   this.turn = true;
    // }
    // 一进来就判断是否已经被收藏
    var re = localStorage.getItem("re")
      ? JSON.parse(localStorage.getItem("re"))
      : [];
    if (re.some(item => item.id == this.$route.params.id)) {
      this.turn = true;
    }
    this.d = this.$route.params.id;
    var id = this.$route.params.id;
    // 页面
    this.$http({
      url: API.detail + id,
      method: "get"
    }).then(d => {
      // console.log(d);
      this.body = d.data.body;
      this.style = d.data.css;
      this.img = d.data.image;
      this.title = d.data.title;
      this.image_source = d.data.image_source;
    });
    // 评论数
    this.$http({
      url: API.detailgood + id,
      method: "get"
    }).then(d => {
      this.a1 = d.data.comments; //评论数
      this.a2 = d.data.long_comments;
      this.a3 = d.data.popularity; //点赞数量
      this.a4 = d.data.short_comments;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.nav {
  position: fixed;
  left: 0;
  top: 0;
  background: $bgcolor1;
  width: 100vw;
  height: $width1;
  display: flex;
  text-align: center;
  line-height: 1rem;
  z-index: 3;
}

span {
  width: 15%;
  line-height: 1rem;
}

.i {
  flex: 1;
  text-align: left;
  margin-left: 20px;
}

.icon {
  display: inline-block;
  height: 1rem;
  color: $bgcolor;
  font-size: $h3;

  i {
    margin: 5px;
  }
}

.orange {
  color: orange;
}

.detail>>>.main-wrap {
  margin-top: $width1;
}

.title {
  width: 100vw;
  height: 200px;
  position: absolute;
  top: 1rem;
  left: 0;

  .img {
    width: 100%;
    height: 100%;
  }

  .blank {
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 -100px 190px 10px rgba(0, 0, 0, 0.5) inset;
    position: absolute;
    left: 0;
    top: 0px;
  }

  p {
    width: 90%;
    height: 1rem;
    padding: 5%;
    color: $bgcolor;
    font-size: 17px;
    line-height: 0.6rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  i {
    position: absolute;
    right: 20px;
    bottom: 7px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}
</style>
