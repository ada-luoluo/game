<template>
  <div class="rang-list">

    <LeaderboardItem v-for="(item,index) in Leaderboard" :key="index" :listItem="item" :index="index+1" :unit="unit"></LeaderboardItem>

  </div>

</template>

<script>
import LeaderboardItem from "@/components/leaderboard/leaderboardItem";

export default {
  name: "leaderboardList",
  components:{
    LeaderboardItem
  },
  props: {
    Leaderboard: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      required: true
    },
    unit: {
      type:Object,
      default() {
        return {}
      }
    },
  }
}
</script>

<style scoped>

</style>