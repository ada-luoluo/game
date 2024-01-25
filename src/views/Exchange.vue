<template>
  <div class="other-bg">

    <div class="page-banner">
      <div class="container">
        <div class="page-banner-content">
          <div class="page-banner-name">
             <!--未登录-->

             <!--已登录-->
             <div class="logged" v-if="token">
               <p>{{ $t("content.currentPoints") }}</p>
               <h1>{{ myIntegral }}</h1>
             </div>
            <div class="no-login" v-else>{{ $t("menu.exchange") }}</div>

            <div class="other-links">
              <div class="links-1"  @click="showModal = true">
                <div class="links-padding">
                  {{ $t("member.integralNotice") }} >
                </div>
              </div>

              <div class="links-1"  v-if="token">
                <div class="links-padding">
                  <router-link to="/gift">
                    {{ $t("member.gift") }} >
                  </router-link>
                </div>
              </div>
              <div class="links-1"  v-if="token">
                <div class="links-padding">
                  <router-link to="/integral">
                    {{ $t("member.records") }} >
                  </router-link>
                </div>
              </div>

            </div>
          </div>
          <div class="page-banner-icon">
            <img src="@/assets/img/svg/gift.svg">
          </div>
        </div>
      </div>
    </div>
    <div class="page-line common-border"></div>




    <div class="container">
       <div class="padding-t-b-120">
         <div class="exchangeCate">
           <div class="exchangeCateList">
           <!--   category_id为null时,动态给"全部"加上active, 点击某个分类时,点击的id与当前分类的id一致时,给那个分类动态加active          -->
             <router-link to="/exchange" :class="{ active:category_id == null }"> {{ $t("content.all") }}</router-link>
             <a v-for="(item) in cate" :key="item" @click="CateList(item.id)"
                :class="{ active:item.id == category_id }">
               {{ item.title }}
             </a>

           </div>

         </div>

         <div class="interval">
           <div class="interval-input">
             <input type="text" class="common-input" placeholder="0" v-model="points_start"
                    v-on:blur="sendData"
                    @keydown.enter="sendData"
             >
             <span>{{ $t("content.integral") }}</span>
           </div>
           <span class="interval-line"></span>
           <div class="interval-input">
             <input type="text" class="common-input" placeholder="0"  v-model="points_end"
                    v-on:blur="sendData"
                    @keydown.enter="sendData"
             >
             <span>{{ $t("content.integral") }}</span>
           </div>
         </div>

         <ExchangeList :list="list"></ExchangeList>

         <Pagination
             :current-page="currentPage"
             :total-pages="totalPages"
             :show-pagination="showPagination"
             @goto-page="onPageChange"
         />

       </div>
    </div>


    <!--  弹窗  -->
    <Dialog  v-if="showModal"  v-bind:title="$t('member.integralNotice')" buttonName="" @close="showModal = false">
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
        <button  @click="showModal = false"> {{ $t("content.iKnow") }}</button>
    </Dialog>
 </div>

</template>

<script>
// import { debounce } from 'lodash'
import ExchangeList from "@/components/exchangeList/exchangeList";
import Dialog from "@/components/Dialog";
import Pagination from "@/components/Pagination";
import {getKnow, getGiftCate, getCateList, getPersonalInfo} from "@/network/main";

export default {
  name: "Exchange",
  components:{
    ExchangeList,
    Dialog,
    Pagination,
  },
  data() {
    return {
      showModal: false,
      toKnow:[],
      cate:[],
      list:[],
      category_id:null,
      myIntegral:'',
      token: null,
      points_start:null,
      points_end:null,
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    };
  },

  mounted() {
    // 在组件挂载后获取token
    this.token = localStorage.getItem('token')
    if (this.token !== null){
      //当前积分
      getPersonalInfo().then(res =>{
        this.myIntegral = res.data.data.points;
      }).catch(err=> {
        console.log(err)
        this.token = false
      })

    }
  },
  created() {
   //积分须知
    getKnow().then(res =>{
      this.toKnow = res.data.data;
    })
    //分类
    getGiftCate().then(res =>{
      this.cate = res.data.data;
    })
    //点击显示不同分类的数据
    this.getCateList();

  },
  methods:{
    //获取分类下的数据
    getCateList() {
      //不要全部的接口,只要没传category_id就是全部的数据!!!
      this.category_id = this.$route.query.category_id;
      const { category_id, currentPage, points_start, points_end } = this;
      getCateList(category_id, currentPage, points_start, points_end).then(res =>{
        this.list = res.data.data.data;
        this.totalPages = res.data.data.last_page;
        this.showPagination = this.totalPages > 1; // 是否显示分页
      })
    },

    sendData() {
      this.currentPage = 1; // 重置当前页码为1
      this.getCateList(); // 调用getCateList函数获取搜索结果
    },

    //点击获取当前分类id
    CateList(id) {
      this.category_id = id;
      this.currentPage = 1; // 重置当前页码为1
      this.getCateList(); // 调用getCateList函数获取分类下的数据
      this.$router.push({
        path: '/priceDetails',
        query: {
          category_id: id,
        }
      })
    },
    //点击分页按钮
    onPageChange(page) {
      this.currentPage = page;
      this.getCateList(); // 调用getCateList函数获取当前页的数据
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
 },

}
</script>

<style scoped>
.exchangeCate{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  position: relative;
}
.exchangeCateList a{
  /*margin: 10px 40px 0 10px;*/
  cursor: pointer;
  position: relative;
}
.exchangeCateList a.active:after{
  content: '';
  display: block;
  width: 24px;
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
.allCate{
  margin-left: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 40px;
}
.allCate .allCate-btn img{
  margin-right: 10px;
}
.allCate .allCateList{
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  background: #272727;
  padding: 20px;
  display: none;
  z-index: 2;
}
.allCate .allCateList a{
  font-size: 16px;
  border: 1px solid #FFFFFF;
  border-radius: 16px;
  padding:5px 10px;
  margin: 10px;
}
.allCate:hover .allCateList{
  display: block;
}
.interval{
  display: flex;
  align-items: center;
  justify-content: center;
 padding-top: 40px;
}
.interval-input{
  width: 150px;
  height: 34px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}
.interval-input span{
  position: absolute;
  line-height: 34px;
  top: 0;
  right: 10px;
  font-size: 12px;
  color: #C2C2C2;
}
.interval-line{
  width: 10px;
  height: 1px;
  background: #D9D9D9;
  margin: 0 10px;
}

.exchangeCateList{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.exchangeCateList{
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -.5);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}


.exchangeCateList>*{
  flex-shrink: 0;
  width: 10%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: 10px;
  margin-bottom: 10px;
}

.exchangeCateList a{
   text-align: center;
}
@media only screen and (min-width:768px) and (max-width:991px){
  .exchangeCateList>*{
    width: 15%;
  }
}

@media only screen and (min-width:0px) and (max-width:767px){

  .allCate{
    margin-left: 0;
  }
  .allCate .allCateList{
    background: #000;
    z-index: 9999;
  }
  .allCate .allCateList a{
    font-size:12px;
    padding:5px 10px;
    margin: 5px;
  }
  .allCate .allCateList{
    padding: 10px;
  }

  .interval{
    padding-top: 20px;
  }

  .exchangeCateList>*{
    width: 25%;
  }


}



</style>