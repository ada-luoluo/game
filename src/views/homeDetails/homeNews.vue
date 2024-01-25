<template>
<div class="home-news">
  <div class="other-common-title">
    <h1 class="common-home-title">{{ $t("menu.news") }}</h1>
    <div class="common-btn">
      <router-link to="/news">{{ $t("content.viewMore") }}</router-link>
    </div>
  </div>
    <NewsList :List="List"></NewsList>
</div>
</template>


<script>
import NewsList from "@/components/newsList/newsList";

import {getNews} from "@/network/main";

export default {
  name: "homeNews",
  components:{
    NewsList
  },
  data(){
    return{
      List:[],
    }
  },
  created() {
    getNews().then(res =>{
      this.List = res.data.data.data.slice(0, 6)//首页只显示前6条数据
    })
  },
}
</script>

<style>

.home-news .other-common-title{
  padding-bottom: 10px;
}

.other-common-title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.new-content p{
  overflow: hidden;
 text-overflow: ellipsis;
 display: -webkit-box;
  -webkit-line-clamp: 2;
 overflow:hidden;
 /*! autoprefixer: off */
 -webkit-box-orient: vertical;
}

.new-date p{
  color: #C2C2C2;
  font-size: 14px;
  padding-top: 5px;
}

.home-news .home-news-list{
  margin: 30px 0!important;
}


@media only screen and (min-width:0px) and (max-width:767px){
  .home-news .home-news-list{
    margin: 10px 0!important;
  }
}

</style>