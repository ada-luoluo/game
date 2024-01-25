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
              <h3>{{ $t("member.replacePassword") }}</h3>
              <div class="info-2-li">
                <span>{{ $t("member.oldPassword") }}：</span>
                <span class="info-input">
                <input type="password" class="common-input" v-bind:placeholder="$t('member.oldPasswordInput')" v-model="old_password" name="old_password">
              </span>
              </div>
              <div class="info-2-li">
                <span>{{ $t("member.newPassword") }}：</span>
                <span class="info-input">
                <input type="password" class="common-input" v-bind:placeholder="$t('member.newPasswordInput')" v-model="password" name="password">
              </span>
              </div>
              <div class="info-2-li">
                <span>{{ $t("member.newPasswordAgain") }}：</span>
                <span class="info-input">
                <input type="password" class="common-input" v-bind:placeholder="$t('member.newPasswordAgainInput')" v-model="password_confirmation" name="password_confirmation">
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

import { UpdatePassword } from "@/network/main";

export default {
  name: "Password",
  components:{
    pageBanner,
    personalNav
  },
  data(){
    return{
      old_password:'',
      password:'',
      password_confirmation:'',
      message:false,
      messageTxt:'',
    }
  },
  methods:{
    sure(){

      //判斷
      if (this.old_password == ''){
        return false
      }

      if (this.password == ''){
        return false
      }
      if (this.password_confirmation == ''){
        return false
      }

      if (this.password !== this.password_confirmation){
        this.message = true
        this.messageTxt = this.$t('tips.different')
        setTimeout(() => {
          this.message = false;
        }, 2000)
        return false
      }

      let params = new URLSearchParams();
      params.append('old_password',this.old_password)
      params.append('password',this.password)
      params.append('password_confirmation',this.password_confirmation)

      UpdatePassword(params).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.message = true
          this.messageTxt = this.$t('tips.success')
          setTimeout(() => {
            this.message = false;
            this.$router.push('/personal');
          }, 3000)

        }
      }).catch(err=> {
        console.log(err)
      })
     }
  }
}

</script>

<style scoped>
.info-other{
  margin-top: 0;
}

.info-other .dark-btn{
  margin-top: 20px;
}

</style>