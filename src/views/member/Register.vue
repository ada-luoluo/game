<template>
  <div class="diff-bg">
    <div class="container padding-t-b-120">
      <div class="login">
        <h2 class="commom-menber-title">{{ $t("login.register") }}</h2>
        <div class="login-container common-border register-container">
          <div class="login-form-bg common-border">

            <form style="width: 100%">
             <div class="login-content">
              <div class="reg-input-bar">
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/tele.svg">
                   </span>
                  <span style="position: relative">

                    <select  v-model="register.area_code" name="area_code" class="gender" style="width: 60px; position: absolute; top: 0; left: 0">
                       <option v-for="item in areaCode" :key="item" :value="item.code">+{{ item.code }}</option>
                     </select>
                     <input type="text" v-bind:placeholder="$t('login.telephoneInput')"
                            style="padding-left: 70px" autocomplete="off"
                            v-model="register.tel" name="tel">
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
                     <input type="text" v-bind:placeholder="$t('login.verificationCode')"
                            v-model="register.verification_code"
                            name="verification_code"
                            autocomplete="off">
                   </span>
                </div>
              </div>
              <div class="reg-input-bar">
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/paw.svg">
                   </span>
                  <span>
                     <input type="password" v-bind:placeholder="$t('login.passwordInput')"
                            v-model="register.password" name="password" autocomplete="off">
                   </span>
                </div>
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/paw.svg">
                   </span>
                  <span>
                     <input type="password" v-bind:placeholder="$t('login.passwordSure')"
                            v-model="register.password_confirmation" name="password" autocomplete="off">
                   </span>
                </div>
              </div>
              <div class="reg-input-bar">
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-05.svg">
                   </span>
                  <span>
                     <input type="text" v-bind:placeholder="$t('login.name')"
                            v-model="register.name" name="name" autocomplete="off">
                   </span>
                </div>
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-06.svg">
                   </span>
                  <span>

                 <datepicker  v-model="date" :format="format" :disabled-dates="disabledDates" name="birthday"  hide-input-icon></datepicker>

                 </span>
                </div>
              </div>
              <div class="reg-input-bar">
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-07.svg">
                   </span>
                  <span>
                     <select class="gender" v-model="register.sex" name="sex">
                         <option value="3">{{ $t("login.chooseSex") }}</option>
                         <option value="1">{{ $t("member.male") }}</option>
                         <option value="2">{{ $t("member.female") }}</option>
                         <option value="0">{{ $t("member.secret") }}</option>
                     </select>
                   </span>
                </div>
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-08.svg">
                   </span>
                  <span>
                     <select class="gender" v-model="register.age_range_id" name="age_range_id" >
                        <option value="0.5">{{ $t("login.chooseAge") }}</option>
                        <option v-for="(value, key, index) in generation" :key="index" :value="key">{{ value }}</option>
                     </select>
                   </span>
                </div>
              </div>
              <div class="reg-input-bar">
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-09.svg">
                   </span>
                  <span>
                     <input type="text" v-bind:placeholder="$t('login.email')"
                            v-model="register.email" name="email" autocomplete="off">
                   </span>
                </div>
                <div class="login-input">
                   <span>
                     <img src="@/assets/img/svg/Framereg-10.svg">
                   </span>
                  <span>
                    <input type="text" v-bind:placeholder="$t('login.code')"
                           v-model="register.invite_code" name="invite_code" autocomplete="off">
                   </span>
                </div>
              </div>
              <div class="reg-radio">
                <input type="checkbox" name="agree" id="agree" v-model="agree" required>
                {{ $t("login.agree") }}
                <router-link to="/serve"  class="lh-span">{{ $t("menu.serve") }}</router-link>、
                <router-link to="/privacy" class="lh-span">{{ $t("menu.privacy") }}</router-link>{{ $t("login.and") }}
                <router-link to="/disclaimer" class="lh-span">{{ $t("menu.disclaimer") }}</router-link>
              </div>


              <button class="login-btn" type="button" @click="registerClick">{{ $t("login.create") }}</button>
              <button class="creat-btn">
                <router-link to="/login">{{ $t("login.loginNow") }}</router-link>
              </button>
            </div>
         </form>

          </div>
        </div>
      </div>
    </div>

<!-- 同意隱私條款彈窗-->
    <div class="message" v-if="message" >
      <p>{{ messageTxt }}</p>
    </div>

<!--註冊成功彈窗-->
    <Dialog  v-if="showModal"  title="" @close="showModal = false">
      <p>{{ $t("login.regSuccess") }}</p >
      <router-link to="/login">
        <button style="margin-top:30px">{{ $t("content.iKnow") }}</button>
      </router-link>
    </Dialog>

  </div>


</template>

<script>
import { ref } from 'vue'
import Dialog from "@/components/Dialog";

import { getAreaCode, getGeneration, sendCode, registerForm} from "@/network/main";

export default {
  name: "Register",
  components:{
    Dialog
  },
  data() {
    return {
      register:{
        name: '',
        area_code: '852',
        tel:'',
        verification_code:'',
        password:'',
        password_confirmation:'',
        birthday:'',
        age_range_id:'0.5',
        sex:'3',
        invite_code:'',
        email:'',
      },
      showModal: false, //
      areaCode:[],
      generation:[],
      agree:false,
      message:false,
      messageTxt:'',
      isSending: false,
      countdown: 60,
    };
  },
  setup() {
   //date format 日期轉化
    const date = ref(new Date());
    console.log(date)
    const format = (date) => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
   return {
      date,
      format,
    };
  },
  mounted() {
    // 在页面加载时判断链接中是否带有邀请码
    const invite_code = this.$route.params.invite_code
    this.register.invite_code = invite_code
    if (invite_code) {
      // 如果链接中有邀请码，则将邀请码赋值给输入框
      this.register.invite_code = invite_code
    }
    //默认显示昨天
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    this.date = yesterday;
  },
  created() {
    //区号
    getAreaCode().then(res =>{
      this.areaCode = res.data.data;
     })
    //年龄段
    getGeneration().then(res =>{
      this.generation = res.data.data;
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
      return passwordRegex.test(this.register.password);
    },
    //日期插件--今天和今天之后的日期都不可选择
    disabledDates() {
      return (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      }
    }
  },
  methods:{

 //
  openLink(path) {
    window.open(path, '_blank')
  },


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
      params.append('tel',this.register.tel)
      params.append('area_code',this.register.area_code)
      //發送驗證碼
      sendCode(params).then((res)=>{
        console.log(res)
        // alert(1)
      }).catch(err=> {
        console.log(err)
      })
     },



    //註冊
    registerClick() {

      //必填
      if (this.register.tel == ''){
        this.message = true
        this.messageTxt = this.$t('tips.telRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.register.verification_code == ''){
        this.message = true
        this.messageTxt = this.$t('tips.codeRequired')
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
      if (this.register.password == ''){
        this.message = true
        this.messageTxt = this.$t('tips.passwordRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.register.password_confirmation == ''){
        this.message = true
        this.messageTxt = this.$t('tips.passwordRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.register.password !== this.register.password_confirmation){
        this.message = true
        this.messageTxt = this.$t('tips.different')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.register.name == ''){
        this.message = true
        this.messageTxt = this.$t('tips.nameRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }

      //判斷不可選擇今天和今天之後的日期
      // const selectedDate = new Date(this.date);
      // const currentDate = new Date();
      // if (
      //     selectedDate.getFullYear() >= currentDate.getFullYear() &&
      //     selectedDate.getMonth() >= currentDate.getMonth() &&
      //     selectedDate.getDate() >= currentDate.getDate()
      // ){
      //   this.message = true
      //   this.messageTxt = this.$t('tips.birthdayRequired')
      //   setTimeout(() => {
      //     this.message = false
      //   }, 3000)
      //   return
      // }

      if (this.register.age_range_id == '' || this.register.age_range_id === '0.5'){
        this.message = true
        this.messageTxt = this.$t('tips.ageRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if (this.register.sex == '' || this.register.sex === '3'){
        this.message = true
        this.messageTxt = this.$t('tips.sexRequired')
        setTimeout(() => {
          this.message = false;
        }, 3000)
        return false
      }
      if(!this.agree) {
        this.message = true
        this.messageTxt = this.$t('tips.agreeRequired')
        setTimeout(() => {
          this.message = false
        }, 3000)
         return
      }



      let params = new URLSearchParams();
      params.append('tel',this.register.tel)
      params.append('area_code',this.register.area_code)
      params.append('name',this.register.name)
      params.append('verification_code',this.register.verification_code)
      params.append('password',this.register.password)
      params.append('password_confirmation',this.register.password_confirmation)
      params.append('birthday',this.format(this.date))
      params.append('age_range_id',this.register.age_range_id)
      params.append('sex',this.register.sex)

      //邀請碼和郵箱有值才傳
      if (this.register.email){
        params.append('email',this.register.email)
      }

      if (this.register.invite_code){
        params.append('invite_code',this.register.invite_code)
      }


      registerForm(params).then((res)=>{
        if (res.data.code == 200){
          this.showModal = true //彈出領取實力卡的提示
        }else {
          this.message = true
          this.messageTxt = res.data.message
          setTimeout(() => {
            this.message = false
          }, 3000)
        }

       })
   },

 },


}
</script>

<style>
.dp__input{
  border: none!important;
}
.dp__clear_icon{
  display: none!important;
}

.dp__button{
  display: none!important;
}


.login-input input{
  color: #9E9E9E;
}

.login-input input::-webkit-input-placeholder { /* WebKit browsers */
  color: #9E9E9E;
}

span.lh-span{
  cursor: pointer;
  color: #fff;
}


</style>