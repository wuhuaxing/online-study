<template>
  <div id="app">
    <v-head></v-head>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
    import vHead from '@/components/common/head.vue'
    import vFooter from '@/components/common/footer.vue'

    export default {
        name: 'app',
        components: {
            vHead,
            vFooter
        }
    }
</script>

<style lang="scss" scoped>
@import './assets/common/vars.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  padding-top: $head-h;
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
