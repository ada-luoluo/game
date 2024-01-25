<template>
  <div class="home-news-list home-game-container" v-for="item in List" :key="item">
    <NewsItem :listItem="item"></NewsItem>
   </div>
</template>

<script>
import NewsItem from "@/components/newsList/newsItem";

export default {
  name: "newsList",
  components:{
    NewsItem
  },
  props: {
    List: {
      type: Array,
      default() {
        return []
      }
    },
  }
}
</script>

<style scoped>

</style>