<template>
<div class="home-game p-b-120">
  <h1 class="common-home-title">{{ $t("menu.introduce") }}</h1>
  <GameList :gamesList="gamesList"></GameList>
  <div class="game-view-more">
    <div class="common-btn">
      <router-link to="/introduce">{{ $t("content.viewMore") }}</router-link>
    </div>
  </div>
</div>
</template>

<script>
import GameList from "@/components/gameList/gameList";

import {getGames} from "@/network/main";

export default {
  name: "homeGame",
  components:{
    GameList
  },
  data(){
    return{
      gamesList:[],
    }
  },
  created() {
    getGames().then(res =>{
      this.gamesList = res.data.data.data.slice(0, 8)//首页只显示前8条数据
    })
  },

}
</script>

<style>
.game-view-more{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>