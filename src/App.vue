
<template>
  <div id="app" style="height: 100%;">
    <router-view></router-view>
  </div>
  
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss" scoped>
@import "./styles/element/index.scss";
html,body,#app{
 		height: 100%;
 		width: 100%;
    margin: 0;
    padding: 0;
	}
  #app{
    // min-width: 1200px;
    position: relative;
    background: #F1F2F5
  }
</style>
