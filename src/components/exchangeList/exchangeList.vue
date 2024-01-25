<template>
  <div class="home-game-container">
    <div class="row">

     <ExchangeItem v-for="item in list" :key="item" :listItem="item"></ExchangeItem>

    </div>

  </div>
</template>

<script>

import ExchangeItem from "@/components/exchangeList/exchangeItem";

export default {
  name: "exchangeList",
  components:{
    ExchangeItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
  }
}
</script>

<style scoped>
.home-game-container {
  padding: 40px 0;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -.5);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}

.row>* {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: 20px;
  margin-bottom: 20px;
}

@media only screen and (min-width:0px) and (max-width:767px){
  .home-game-container{
    padding: 20px 0;
  }

  .row>* {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .row{
    margin-left: 0;
    margin-right: 0;
  }

}


</style>