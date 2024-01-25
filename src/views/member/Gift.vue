
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
                    <h2>{{ $t("member.gift") }}</h2>
                  </div>
                  <div class="gold-top-right">
                    <p @click="showModal = true">{{ $t("member.pickUpDetails") }}  ></p>
                  </div>
                </div>


                <div class="gold-status">
                  <div @click="onStatusChange(undefined)" :class="{ active: status == undefined }"> {{ $t('content.all') }}</div>
                  <div @click="onStatusChange(0)" :class="{ active: status == 0}">{{ $t('member.toBeUsed') }}</div>
                  <div @click="onStatusChange(1)" :class="{ active: status == 1}">{{ $t('member.used') }}</div>
                  <div @click="onStatusChange(2)" :class="{ active: status == 2}">{{ $t('member.expired') }}</div>
                </div>


                <div class="gold-data">
                  <div class="gold-data-list">
                    <div class="gift-details" v-for="(item, index) in filteredRecords" :key="item.id">
                      <div class="white-common">
                        <div class="black-common">
                          <div class="gift-img">
                            <div class="only-date" v-if="item.status === 0">
                              {{ $t("member.validityPeriod") }}：{{ item.diff_days }}
                              {{$t("member.days") }}
                            </div>
                            <img :src="item.gift_coupon.image">
                          </div>
                          <div class="gift-txt">
                            <h3>{{ item.gift_coupon.title }}</h3>
                            <p>{{ $t("member.exchangeTime") }}：{{ item.exchange_date }}</p>
                            <p v-if="item.status === 1">{{ $t("member.usedTime") }}：{{ item.used_date }}</p>
                            <p v-if="item.status === 2">{{ $t("member.expirationTime") }}：{{ item.expiration_date }}</p>
                            <a @click="used(index)" v-if="item.status === 0" style="cursor: pointer">{{ $t("member.use") }}</a>
                          </div>
                          <div class="gift-state">
                            <!--  圖片顯示放在了語言包 -->
                            <img v-bind:src="$t('member.imageExpiration')"  v-if="item.status === 2">
                            <img v-bind:src="$t('member.imageUsed')"  v-if="item.status === 1">
                          </div>
                        </div>
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


    <Dialog  v-if="showModal"  :title="$t('member.pickUpDetails')"  @close="showModal = false">
      <div class="toKnow">
        <ul>
          <li v-for="item in details" :key="item">
            <div class="title-toKnow">
              <h4><img src="@/assets/img/svg/gift-s.svg">{{ item.title }}</h4>
            </div>
            <p v-html="item.content.replace(/[\r\n]/g, '<br>')"></p>
          </li>
        </ul>
      </div>
      <button  @click="showModal = false">  {{ $t("content.iKnow") }} </button>
    </Dialog>


    <!--    使用弹窗   -->
    <div class="other-pop"  v-if="showModal2">
      <div class="other-pop-content" style="position: relative; width: inherit;">
        <div class="pop-close" @click="popClick()" style="right: 20px">x</div>
        <div class="bg-pop">
          <div class="bg-top">

              <div class="pop-content-part">
                <div class="pop-content-img">
                  <img :src="currentItem.gift_coupon.image">
                </div>
                <div class="pop-content-txt">
                  <h3>{{ currentItem.gift_coupon.title }}</h3>
                  <span>
                  <img src="@/assets/img/svg/kin.svg">{{ currentItem.gift_coupon.points }}
                </span>
                </div>
              </div>

          </div>
          <div class="bg-bottom">
              <img :src="currentItem.qrcode">
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";

import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";

import {getPickUpDetail, getGiftList} from "@/network/main";

export default {
  name: "Integral",
  components:{
    pageBanner,
    personalNav,
    Dialog,
    Pagination
  },
  data() {
    return {
      showModal: false,
      showModal2:false,
      details:[],
      list:[],
      currentItem: '',
      status: undefined, // 初始状态为空
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    };
  },
  created() {
    //领取细节
    getPickUpDetail().then(res =>{
      this.details = res.data.data;
    })
    //
    this.fetchData();

    //礼品券列表
    // getGiftList().then(res =>{
    //   this.list = res.data.data.data;
    // })
  },
  methods: {
    fetchData(status) {
      this.status = status
      getGiftList(this.currentPage,this.status).then(res =>{
        this.list = res.data.data.data;
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
      //点击使用
      used(index){
      // console.log(index)
        this.showModal2 = true;
        this.currentItem = this.list[index];
      },
      popClick(){
        this.showModal2 = false;
        // location.reload()
      },
  },
  computed: {
    filteredRecords() {
      if (this.status !== undefined) {
        return this.list.filter((item) => item.status === this.status);
      } else {
        return this.list;
      }
    },
  },
}
</script>

<style>

.gold-data-list{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.gift-details{
  width: 48%;
  margin: 15px 0;
}

.gift-img{

  position: relative;
}

.only-date{
  width: 84px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  color: #E77A74;
  line-height: 20px;
  padding-left: 2px;
  background:  url("~@/assets/img/coupon_img02.png") no-repeat;
  background-size: 100%;
}

.gift-img img{
  width: 95px;
  padding: 5px;
  max-width: inherit!important;
}

.gift-state img{
  width: 85px;
  max-width: inherit!important;
}


.gift-txt{
   width: calc(100% - 180px);
  padding: 0 10px;
}

.gift-txt h3{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.gift-txt p{
  color: #E1E1E1;
  font-size: 12px;
  line-height: 18px;
}

.gift-txt a{
  display: inline-block;
  padding: 7px 15px;
  margin-top: 10px;
  background: var(--background);
}

/*pop*/

.bg-pop{
   width: 385px;
}
.bg-top{
  background:  url("~@/assets/img/a.png")  no-repeat;
  background-size: 100%;
  padding: 15px 20px 25px 20px;
}
.bg-bottom{
  padding: 57px 10px;
  background:  url("~@/assets/img/b.png")  no-repeat;
  background-size: 100%;
}

.bg-bottom img{
  width: 250px;
  display: block;
  margin: 0 auto;
}

@media only screen and (min-width:0px) and (max-width:992px){
  .gift-details{
    width: 100%;
   }
  .gift-details .black-common{
     padding: 5px;
  }

}

@media only screen and (min-width:0px) and (max-width:767px){

  .bg-pop{
    width: 100%;
  }


  .gift-state img{
    width: 100%;
  }

  .gift-state{
    display: none;
  }

  .gift-txt {
    width: calc(100% - 100px);
  }


}


</style>