<template>
  <div id="app">
    <div id="header">
      <router-link to="/" id="logo">
        <img src="./assets/logo.png">
        <span>Vynil-vue</span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
  background-color: #fff;
  height: 40px;
  padding: 10px 0;
  z-index: 2;
}

#logo {
  display: inline-block;
  font-size: 1.5em;
  line-height: 40px;
  font-weight: 500;
  text-decoration: none;
  color: #2c3e50;
}

#logo img {
  vertical-align: middle;
  margin-right: 6px;
  width: 40px;
  height: 40px
}

</style>
