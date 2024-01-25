<template>
  <div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("member.personalCenter") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/person.svg">
      </template>
    </page-banner>
    <div class="container">
      <div class="padding-t-b-120">
        <personalNav></personalNav>

        <div class="gold">
           <div class="white-common">
             <div class="black-common">
               <div class="gold-content">
                 <div class="gold-top">
                     <div class="gold-top-left">
                       <p>{{ $t("member.myCoin") }}</p>
                       <h2>{{ myGold }}</h2>
                     </div>
                 </div>

                 <div class="gold-status">
                   <div @click="onStatusChange(undefined)" :class="{ active: status !== 1 && status !== 0 }"> {{ $t('content.all') }}</div>
                   <div @click="onStatusChange(1)" :class="{ active: status == 1}">{{ $t('member.increase') }}</div>
                   <div @click="onStatusChange(0)" :class="{ active: status == 0}">{{ $t('member.reduce') }}</div>
                 </div>

                 <div class="gold-data">
                   <div class="gold-data-list">
                     <div class="gold-data-li" v-for="item in filteredRecords" :key="item.id">
                       <div class="gold-date">
                         {{ item.created_at }}
                       </div>
                       <div class="gold-number">
                         <span v-if="item.status === 1">+ {{item.token}}</span>
                         <span class="count" v-else>- {{item.token}}</span>
                       </div>
                     </div>
                   </div>
                 </div>

                <!--       分页          -->
                 <Pagination
                     :current-page="currentPage"
                     :total-pages="totalPages"
                     :show-pagination="showPagination"
                     @goto-page="onPageChange"
                 />

               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";
import Pagination from "@/components/Pagination";

import {getPersonalInfo, getGoldRecords} from "@/network/main";

export default {
  name: "Gold",
  components:{
    pageBanner,
    personalNav,
    Pagination
  },
  data(){
    return{
      myGold:'',
      records:[],
      status: undefined, // 初始状态为空
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    }
  },
  created() {
    //我的代币
    getPersonalInfo().then(res =>{
      this.myGold = res.data.data.token;
    })
    //代币记录
    this.fetchData();
  },
  methods:{
    //获取数据
    fetchData(status) {
      this.status = status
      getGoldRecords(this.currentPage,this.status).then(res =>{
        this.records = res.data.data.data;
        this.status = status;
        this.currentPage = res.data.data.current_page;
        this.totalPages = res.data.data.last_page;
        this.showPagination = this.totalPages > 1; // 是否显示分页
        })
    },

    //点击分页按钮
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData(this.status);
      window.scrollTo(0, 0);
    },
    onStatusChange(status) {
      this.status = status;
      this.currentPage = 1;
      this.fetchData(status);
    },

  },
  computed: {
    filteredRecords() {
      if (this.status !== undefined) {
        return this.records.filter((item) => item.status === this.status);
      } else {
        return this.records;
      }
    },
  },

}
</script>

<style scoped>
.gold-status{
  display: flex;
  margin-top: 40px;
}

.gold-status div {
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.gold-status div.active:after {
  content: '';
  display: block;
  width: 10px;
  height: 2px;
  background-color: #fff;
  border: 1px solid var(--color-high-text);
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

@media only screen and (min-width:0px) and (max-width:767px){
  .gold-status{
    justify-content: space-between;
  }

  .gold-status div {
    margin-right: 0;
  }

}


</style>