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
        <div class="personal-info-content">
          <div class="white-common">
            <div class="black-common">


              <div class="info-2  info-other">
                <h3>{{ $t("member.replaceTelephone") }}</h3>
                <div class="info-2-li">
                  <span>{{ $t("member.newNumber") }}：</span>
                  <span class="info-input" style="position: relative">
                     <select  v-model="area_code" name="area_code" class="gender" style="width: 80px; position: absolute; top: 0; left: 0">
                       <option v-for="item in areaCode" :key="item.code" :value="item.code">+{{ item.code }}</option>
                     </select>
                     <input class="common-input" type="text" v-bind:placeholder="$t('member.newNumberInput')"  style="padding-left: 90px" autocomplete="off"
                            v-model="tel" name="tel" >
              </span>
                </div>
                <div class="info-2-li">
                  <span>{{ $t("member.verificationCode") }}：</span>
                  <span class="info-input" style="position: relative">
                    <div class="send-code" style="padding-right: 10px">
                      <a @click="sendCode">{{ buttonText }}</a>
                    </div>
                     <input type="text" class="common-input" v-bind:placeholder="$t('member.codeInput')" v-model="verification_code">
                  </span>
                </div>
                <div class="info-2-li">
                  <span>{{ $t("member.loginPassword") }}：</span>
                  <span class="info-input">
                <input type="password" class="common-input" v-bind:placeholder="$t('member.loginPasswordInput')" v-model="password">
              </span>
                </div>

                <div class="info-2-li">
                  <span></span>
                  <span>
                <button class="common-btn dark-btn" type="button" @click="sure">{{ $t("member.sure") }}</button>
              </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!--tips-->
    <div class="message" v-if="message" >
      <p>{{ messageTxt }}</p>
    </div>

  </div>
</template>


<script>

import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";

import { getAreaCode, TelCode, UpdateTel } from "@/network/main";

export default {
  name: "exchangeTele",
  components:{
    pageBanner,
    personalNav
  },
  data(){
    return{
      areaCode:[],
      area_code:'852',
      tel:'',
      password:'',
      verification_code:'',
      message:false,
      messageTxt:'',
      isSending: false,
      countdown: 60,
    }

  },
  created() {
    //区号
    getAreaCode().then(res =>{
      this.areaCode = res.data.data;
    })
  },
  computed: {
    buttonText() {
      if (this.isSending) {
        return `${this.countdown}s`;
      }
      return this.$t('member.getCode');
    }
  },
  methods:{
    //發送驗證碼
    sendCode() {
      //判断电话号码不为空
      if (this.tel == ''){
        this.message = true
        this.messageTxt = this.$t('tips.telRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }

      this.isSending = true;
      const timer = setInterval(() => {
        if (this.countdown === 0) {
          clearInterval(timer);
          this.isSending = false;
          this.countdown = 60;
        } else {
          this.countdown--;
        }
      }, 1000);

      let params = new URLSearchParams();
      params.append('tel',this.tel)
      params.append('area_code',this.area_code)

      //發送驗證碼
      TelCode(params).then((res)=>{
        console.log(res)
      }).catch(err=> {
        console.log(err)
      })
    },

    //提交修改
    sure() {
      //必填
      if (this.tel == ''){
        this.message = true
        this.messageTxt = this.$t('tips.telRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.verification_code == ''){
        this.message = true
        this.messageTxt = this.$t('tips.codeRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.password == ''){
        this.message = true
        this.messageTxt = this.$t('tips.passwordRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }

      let params = new URLSearchParams();
      params.append('area_code',this.area_code)
      params.append('tel',this.tel)
      params.append('verification_code',this.verification_code)
      params.append('password',this.password)
      UpdateTel(params).then((res)=>{
        console.log(res)
        if ( res.data.code == 200){
          this.message = true
          this.messageTxt = this.$t('tips.success')
          setTimeout(() => {
            this.message = false;
            this.$router.push('/personal');
          }, 3000)
         }
      })
    },
  },

}
</script>

<style scoped>
.info-other{
  margin-top: 0;
}
.info-other .dark-btn{
  margin-top: 20px;
}
.gender{
  color: #9e9e9e;
}


</style>