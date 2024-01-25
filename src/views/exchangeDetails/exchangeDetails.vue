<template>
<div class="other-bg">


  <div class="page-banner">
    <div class="container">
      <div class="page-banner-content">
        <div class="page-banner-name">

          <!--已登录-->
          <div class="logged" v-if="token">
            <p>{{ $t("content.currentPoints") }}</p>
            <h1>{{ myIntegral }}</h1>
          </div>
          <!--未登录-->
          <div class="no-login" v-else>{{ $t("menu.exchange") }}</div>

          <div class="other-links">
            <div class="links-1">
              <div class="links-padding" @click="showModal3 = true">
                {{ $t("member.integralNotice") }} >
              </div>
            </div>

            <div class="links-1" v-if="token">
              <div class="links-padding">
                <router-link to="/gift"> {{ $t("member.gift") }} ></router-link>
              </div>
            </div>
            <div class="links-1" v-if="token">
              <div class="links-padding">
                <router-link to="/integral"> {{ $t("member.records") }} ></router-link>
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
        <router-link to="/exchange">
          <div class="back">
           <img src="@/assets/img/svg/back.svg"> {{ $t("content.back") }}
          </div>
        </router-link>

        <div class="p-b-120">
          <div class="exchange-more">
            <div class="white-common">
              <div class="black-common">

                <div class="intro-1">
                  <div class="game-pic">
                    <img :src="image">
                  </div>

                  <div class="intro-txt">
                    <h3>{{ title }}</h3>

                    <div class="intro-coin">
                      <img src="@/assets/img/svg/kin.svg">{{ points }}
                      <span>
                        {{ $t("content.remaining") }}
                        {{ inventory }}
                      </span>
                    </div>
                    <div class="intro-more-txt">
                      <p v-html="description"></p>
                    </div>
                    <div class="ex-btn" v-if="integralNo">
                      <div class="insufficient">
                        {{ $t("content.integralNo") }}
                      </div>
                    </div>
                   <div class="ex-btn" v-else>
                         <div class="common-btn"  @click="showModal = true; canExchange()">{{ $t("content.exchange") }}</div>
                    </div>
                  </div>
                </div>
             </div>
            </div>
          </div>
        </div>
      </div>


<!--兑换按钮弹窗-->
  <Dialog  v-bind:title="$t('content.giftExchange')"  @close="showModal = false" v-if="showModal" >
    <p style="text-align: center;padding: 10px 0">{{ $t("content.question") }}</p >
    <div class="modal-groups">
      <button class="modal-groups-1"  @click="showModal = false">{{ $t("content.cancel") }}</button>
      <button class="modal-groups-2"  @click="showModal = false; other()" >{{ $t("content.yes") }}</button>
    </div>
  </Dialog>


<!--  确认后弹窗-->
  <div class="other-pop"  v-if="showModal2">
    <div class="other-pop-content">
      <div class="white-common">
        <div class="black-common">
          <div class="pop-top">
            <h3>{{ $t("content.exchangeSuccess") }}</h3>
            <div class="pop-close" @click="popClick()">
              x
            </div>
          </div>
          <div class="pop-content">
            <div class="pop-content-part">
              <div class="pop-content-img">
                <img :src="image">
              </div>
              <div class="pop-content-txt">
                 <h3>{{ title }}</h3>
                <span>
                  <img src="@/assets/img/svg/kin.svg">{{ points }}
                </span>
              </div>
            </div>
          </div>
          <div class="pop-btn">
            <router-link to="/gift">
               <button class="common-btn">{{ $t("content.look") }}</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--  &lt;!&ndash;  积分须知弹窗  &ndash;&gt;-->
  <Dialog  v-if="showModal3"  v-bind:title="$t('member.integralNotice')" buttonName="" @close="showModal3 = false">
    <div class="toKnow">
      <ul>
        <li v-for="item in toKnow" :key="item">
          <div class="title-toKnow">
            <h4><img src="@/assets/img/svg/kin.svg">{{ item.title }}</h4>
          </div>
          <p v-html="item.content"></p>
        </li>

      </ul>
    </div>
    <button  @click="showModal = false"> {{ $t("content.iKnow") }}</button>
  </Dialog>



</div>
</template>

<script>

import Dialog from "@/components/Dialog";

import {getExchangeMore, getGiftExchange, getKnow, getPersonalInfo} from "@/network/main";

export default {
  name: "exchangeDetails",
  components:{
    Dialog
  },
  data() {
    return {
      id: null,
      image:'',
      points:'',
      inventory:'',
      title:'',
      description:'',
      showModal: false,
      showModal2:false,
      showModal3:false,
      myIntegral:'',
      toKnow:[],
      token: null,
      integralNo:false,
    };
  },
  created() {
    // 在组件挂载后获取token
    this.token = localStorage.getItem('token')
    if (this.token !== null){
      //当前积分
      getPersonalInfo().then(res =>{
        this.myIntegral = res.data.data.points;
        //积分不足,不可兑换
        if(this.myIntegral <= this.points){
          this.integralNo = true
        }
      }).catch(err=> {
        console.log(err)
        this.token = false
      })
    }
    //积分须知
    getKnow().then(res =>{
      this.toKnow = res.data.data;
    })
    //礼品券详情
      this.id = this.$route.params.id; //拿到id
      getExchangeMore(this.id).then(res =>{
      this.title = res.data.data.title;
      this.points = res.data.data.points;
      this.inventory = res.data.data.inventory;
      this.image = res.data.data.image;
      this.description = res.data.data.description;
    })
  },
  methods:{
    //兑换前判断是否登录
    canExchange(){
      if (this.token !== null){
        return
      }else {
        this.$router.push('/login');
      }
    },
    //点击兑换
    other(){
      this.id = this.$route.params.id; //拿到id
      getGiftExchange(this.id).then(res =>{
        this.showModal2 = true;
        console.log(res)
      }).catch(err=> {
        console.log(err)
      })
    },
    popClick(){
      this.showModal2 = false;
    }
  },
  computed: {
    processedContent() {
      return this.description.replace(/\r?\n/g, "<br>");
    }
  },

}
</script>

<style scoped>

.exchange-more .intro-1{
  display: flex;
  padding: 20px;
}

.exchange-more .intro-txt{
  width:100%;
  margin-left: 20px;
}

.exchange-more .intro-coin {
  padding: 20px 0;
}


.exchange-more .intro-coin{
   font-size: 26px;
   color: #FFEB33;
   font-weight: bold;
}

.exchange-more .intro-coin img{
  width: 20px;
  margin-right: 10px;
}


.exchange-more .intro-coin span{
  font-size: 14px;
  color: #C2C2C2;
  font-weight: normal;
  padding-left:40px;
}

.exchange-more .intro-more-txt p{
  color: #C2C2C2;
}
.ex-btn{
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.ex-btn .common-btn{
  cursor: pointer;
}

.modal-groups{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top:1px solid #4A4A4A;
  padding-top: 10px;
  margin-top: 20px;
}

.modal-groups button{
  width: 50%;
  color: #fff;
  background: transparent;
  font-size: 18px;
  position: relative;
  margin: 0!important;
}

.modal-groups-1{
  border-right:1px solid #4A4A4A;
}

.modal-groups-2{
   color: var(--background)!important;
}

.modal-overlay footer button{
  display: none!important;
}

.pop-content-img img{
  width: 70px;
}

.insufficient{
  background: #818181;
  font-size: 14px;
  padding: 10px 30px;
  border: 1px solid #818181;
}

@media only screen and (min-width:0px) and (max-width:767px){
  .exchange-more .intro-1{
    display: flex;
    flex-wrap: wrap;
  }

  .exchange-more .intro-coin {
    padding: 10px 0;
  }

  .exchange-more .intro-txt{
    margin-left: 0;
    margin-top: 20px;
  }


}

</style>