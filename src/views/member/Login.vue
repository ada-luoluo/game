<template>
  <div class="diff-bg">
    <div class="container padding-t-b-120">
      <div class="login">
        <h2 class="commom-menber-title">{{ $t("login.login") }}</h2>
        <div class="login-container common-border">
          <div class="login-form-bg common-border">
            <form>
               <div class="login-content">
               <div class="login-logo">
                   <img src="@/assets/img/logo.svg">
               </div>
               <div class="login-input">
                 <span>
                   <img src="@/assets/img/svg/tele.svg">
                 </span>
                <span style="position: relative">
                     <select  v-model="area_code" name="area_code" class="gender" style="width: 60px; position: absolute; top: 0; left: 0">
                       <option v-for="item in areaCode" :key="item.code" :value="item.code">+{{ item.code }}</option>
                     </select>
                     <input type="text" v-bind:placeholder="$t('login.telephone')" style="padding-left: 70px" autocomplete="off"
                            v-model="tel" name="tel" @keydown.enter="login">
                 </span>
                </div>
                <div class="login-input">
                 <span>
                   <img src="@/assets/img/svg/paw.svg">
                 </span>
                 <span>
                   <input type="password" v-bind:placeholder="$t('login.password')" v-model="password" name="password" @keydown.enter="login">
                 </span>
               </div>
               <div class="forget">
                 <router-link to="/forget">{{ $t("login.forget") }}</router-link>
               </div>
               <button class="login-btn" type="button" @click="login">{{ $t("login.login") }}</button>
               <router-link to="/register">
               <button class="creat-btn" type="button">
                 <router-link to="/register">{{ $t("login.create") }}</router-link>
               </button>
               </router-link>
             </div>
            </form>

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

import {getAreaCode, login} from "@/network/main";
export default {
  name: "Login",
  data(){
    return {
      areaCode:[],
      area_code:'852',
      tel:'',
      password:'',
      is_app:'2',
      message:false,
    }
  },
  created() {
    //区号
    getAreaCode().then(res =>{
      this.areaCode = res.data.data;
    })
   },
  methods:{
    login(){
      //必填
      if (this.tel == ''){
        this.message = true
        this.messageTxt = this.$t('tips.telRequired')
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
      params.append('password',this.password)
      params.append('is_app',this.is_app)

      login(params).then((res)=>{
        if (res.data.code ==200){
           localStorage.setItem('token', res.data.data.access_token);//保存token
           setTimeout(() => {
            // this.message = true
            // this.messageTxt = this.$t('tips.loginSuccess')
            // this.message = false;
             location.reload();
           }, 2000)

           this.$router.push('/personal');
        }else {
          this.message = true
          this.messageTxt = res.data.message
          setTimeout(() => {
            this.message = false;
          }, 2000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>