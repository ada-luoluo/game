<template>
<div class="home-exchange p-b-120">
  <h1 class="common-home-title">{{ $t("menu.exchange") }}</h1>
  <ExchangeList :list="list"></ExchangeList>

  <div class="game-view-more">
    <div class="common-btn">
      <router-link to="/exchange">{{ $t("content.viewMore") }}</router-link>
    </div>
  </div>


</div>
</template>

<script>
import ExchangeList from "@/components/exchangeList/exchangeList";

import {getALLExchange} from "@/network/main";

export default {
  name: "homeExchange",
  components:{
    ExchangeList
  },
  data() {
    return {
      list:[],
    };

  },
  created() {
    getALLExchange().then(res =>{
      this.list = res.data.data.data.slice(0, 8)//首页只显示8条数据
    })
  }

}
</script>

<style scoped>

</style>