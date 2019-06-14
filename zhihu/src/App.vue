<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='stylus' scoped>
@import './common/stylus/index.styl';
#app{
  min-height:100vh;
  background :$bgcolor2;
}

</style>
