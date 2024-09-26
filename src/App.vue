<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {}
</script>
<style>
html {
  overflow: hidden;
}
body,
html {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: Inter, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5fae\8f6f\96c5\9ed1, Arial, sans-serif;
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  color: #2c3e50;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

::-webkit-scrollbar-track-piece{width:8px;background-color:#f5f5f5;border-radius:6px;}
::-webkit-scrollbar{width:8px;height:8px;}
::-webkit-scrollbar-thumb{height:50px;background:#bec7d5;border-radius:6px;}
::-webkit-scrollbar-thumb:hover{background:#91a0b5;}

</style>
