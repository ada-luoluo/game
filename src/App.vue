<template>

  <loading v-if="loading" ></loading>
  <Header/>

  <keep-alive>
    <router-view :key="$route.fullPath" v-if="$route.meta.keepalive"/>
  </keep-alive>
  <router-view :key="$route.fullPath" v-if="!$route.meta.keepalive"/>

  <Footer/>

</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    Loading,
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  beforeRouteUpdate(to, from, next) {
    this.loading = true
    next()
  }
})
</script>

<style>
@import "assets/css/main.css";
</style>
