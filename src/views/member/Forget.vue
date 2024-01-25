<template>
  <div class="diff-bg">
    <div class="container padding-t-b-120">
      <div class="login">
        <h2 class="commom-menber-title">{{ $t("login.login") }}忘記密碼</h2>
        <div class="login-container common-border">
          <div class="login-form-bg common-border">
            <div class="login-content">
              <div class="login-input">
                 <span>
                   <img src="@/assets/img/svg/tele.svg">
                 </span>
                <span style="position: relative">
                    <select v-model="area_code" name="area_code" class="gender" style="width: 60px; position: absolute; top: 0; left: 0">
                        <option v-for="item in areaCode" :key="item.code" :value="item.code">+{{ item.code }}</option>
                     </select>
                     <input type="text" v-bind:placeholder="手機號碼" style="padding-left: 70px" v-model="tel" name="tel" autocomplete="off">
                   </span>
              </div>
              <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-02.svg">
                   </span>
                <span style="position: relative">
                    <div class="send-code">
                       <a @click="sendCode">{{ buttonText }}</a>
                    </div>
                     <input type="text" placeholder="請輸入驗證碼" v-model="verification_code" autocomplete="off">
                   </span>
              </div>
              <div class="login-input">
                 <span>
                   <img src="@/assets/img/svg/paw.svg">
                 </span>
                <span>
                   <input type="password" placeholder="請輸入新密碼" v-model="password" name="password" autocomplete="off">
                 </span>
              </div>
              <div class="login-input">
                 <span>
                   <img src="@/assets/img/svg/paw.svg">
                 </span>
                <span>
                   <input type="password" placeholder="確認新密碼" v-model="password_confirmation" name="password_confirmation" autocomplete="off">
                 </span>
              </div>
              <button class="login-btn" type="button" @click="sure">確定</button>
             </div>
          </div>
        </div>
      </div>
    </div>

<!-- tips    -->
    <!--tips-->
    <div class="message" v-if="message" >
      <p>{{ messageTxt }}</p>
    </div>

  </div>
</template>

<script>


import {ForgetPassword, ForgetTelCode, getAreaCode} from "@/network/main";

export default {
  name: "Forget",
  data(){
    return{
      area_code:'852',
      areaCode:[],
      tel:'',
      verification_code:'',
      password:'',
      password_confirmation:'',
      isSending: false,
      countdown: 60,
      message:false,
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
    },
    isPasswordValid() {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/;
      return passwordRegex.test(this.password);
    }
  },
  methods: {
    //發送驗證碼
    sendCode() {
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
      ForgetTelCode(params).then((res)=>{
        console.log(res)
      }).catch(err=> {
        console.log(err)
      })
    },
    sure(){
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
      if (this.password_confirmation == ''){
        this.message = true
        this.messageTxt = this.$t('tips.passwordRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.password !== this.password_confirmation){
        this.message = true
        this.messageTxt = this.$t('tips.different')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }

      //密碼規則
      if (!this.isPasswordValid) {
        this.message = true
        this.messageTxt = this.$t('tips.passwordValid')
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
      params.append('password_confirmation',this.password_confirmation)
      ForgetPassword(params).then(res =>{
        if (res.data.code == 200){
          this.$router.push('/login');
        }
      })
    }
   },

}
</script>

<style scoped>

</style>