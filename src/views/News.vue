<template>
  <div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("menu.news") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/news.svg">
      </template>
    </page-banner>


      <div class="padding-60">
        <div class="container">
            <div class="news-part row">
              <NewsList :List="List"></NewsList>
             </div>

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
import NewsList from "@/components/newsList/newsList";
import Pagination from "@/components/Pagination";

import {getNews} from "@/network/main";

export default {
  name: "News",
  components:{
    pageBanner,
    NewsList,
   Pagination
  },
  data(){
    return{
      List:[],
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    }
  },
  created() {
    this.getNews()
  },
  methods:{
    //獲取數據
    getNews(){
      getNews(this.currentPage).then(res =>{
        this.List = res.data.data.data;
        this.currentPage = res.data.data.current_page;
        this.totalPages = res.data.data.last_page;
        this.showPagination = this.totalPages > 1; // 是否显示分页
      })
    },
    //点击分页按钮
    onPageChange(page) {
      this.currentPage = page;
      this.getNews();
      window.scrollTo(0, 0);
    },
  }
}
</script>

<style>
.padding-60{
  padding: 60px 0;
}
.news-part{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding:40px 0;
}

.news-part.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -.5);
  /*margin-right: calc(var(--bs-gutter-x) * -.5);*/
  /*margin-left: calc(var(--bs-gutter-x) * -.5);*/
}

.news-part.row>* {
  flex-shrink: 0;
  width: 50%!important;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: 5px;
  margin-bottom: 5px;
}



@media only screen and (min-width:0px) and (max-width:767px){
  .news-part.row>* {
    width: 100%!important;
    padding-right: 0;
   }
  .padding-60{
    padding: 30px 0;
  }

}

</style>