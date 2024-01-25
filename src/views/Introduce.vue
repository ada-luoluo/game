<template>
  <div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("menu.introduce") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/page-icon-01.svg">
      </template>
    </page-banner>

    <div class="padding-t-b-120">
      <div class="container">
         <GameList :gamesList="gamesList"></GameList>

        <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :show-pagination="showPagination"
            @goto-page="onPageChange"
        />

      </div>
    </div>

  </div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import GameList from "@/components/gameList/gameList";
import Pagination from "@/components/Pagination";

import {getGames} from "@/network/main";

export default {
  name: "Introduce",
  components:{
    pageBanner,
    GameList,
    Pagination
  },
  data(){
    return{
      gamesList:[],
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    }
  },
  created() {
    this.getGames();
  },
  methods:{
    getGames(){
      getGames(this.currentPage).then(res =>{
        this.gamesList = res.data.data.data;
        this.totalPages = res.data.data.last_page;
        this.showPagination = this.totalPages > 1; // 是否显示分页
      })
    },
    //点击分页按钮
    onPageChange(page) {
      this.currentPage = page;
      this.getGames();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  }
}
</script>

<style scoped>

</style>