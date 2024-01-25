
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
                    <p>{{ $t("member.myIntegral") }}</p>
                    <h2>{{ myIntegral }}</h2>
                  </div>
                  <div class="gold-top-right"  @click="showModal = true">
                    <p>{{ $t("member.integralNotice") }}  >   </p>
                  </div>

                </div>

                <div class="gold-status">
                  <div @click="onStatusChange(undefined)" :class="{ active: status !== 1 && status !== 0 }"> {{ $t('content.all') }}</div>
                  <div @click="onStatusChange(1)" :class="{ active: status == 1}">{{ $t('member.increase') }}</div>
                  <div @click="onStatusChange(0)" :class="{ active: status == 0}">{{ $t('member.reduce') }}</div>
                </div>

                <div class="gold-data">
                  <div class="gold-data-list">
                    <div class="gold-data-li"  v-for="item in filteredRecords" :key="item.id">
                      <div class="gold-date">
                        {{ item.created_at }}
                      </div>
                      <div class="gold-number">
                        <span v-if="item.status === 1">+ {{item.points}}</span>
                        <span class="count" v-else>- {{item.points}}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!--分页-->
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

    <Dialog  v-if="showModal"  :title="$t('member.integralNotice')" @close="showModal = false">
      <div class="toKnow">
        <ul>
          <li v-for="item in toKnow" :key="item">
            <div class="title-toKnow">
              <h4><img src="@/assets/img/svg/kin.svg">{{ item.title }}</h4>
            </div>
            <p v-html="item.content.replace(/[\r\n]/g, '<br>')"></p>
          </li>
        </ul>
      </div>
      <button  @click="showModal = false"> 我知道了</button>
    </Dialog>

  </div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";
import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";

import {getPointsRecords, getKnow, getPersonalInfo} from "@/network/main";

export default {
  name: "Integral",
  components:{
    pageBanner,
    personalNav,
    Dialog,
    Pagination,
  },
  data() {
    return {
      showModal: false,
      records:[],
      toKnow:[],
      myIntegral:'',
      status: undefined, // 初始状态为空
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    }
  },
  created() {
    //默认全部积分记录
    this.fetchData();

    //我的积分
    getPersonalInfo().then(res =>{
      this.myIntegral = res.data.data.points;
    })
    //积分须知
    getKnow().then(res =>{
      this.toKnow = res.data.data;
    })

  },
  methods: {
    fetchData(status) {
      this.status = status
      getPointsRecords(this.currentPage,this.status).then(res =>{
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



</style>

