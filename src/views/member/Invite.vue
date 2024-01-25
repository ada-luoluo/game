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
            <div class="info-2 invite-more">
              <h3>{{ $t("member.invite") }}</h3>
              <div class="info-2-li">
                <span>{{ $t("member.shareLink") }}：</span>
                <span class="info-input only-txt">
                 https://www.1x1games.com/register/{{ invite_code }}
                </span>
                <span class="change-btn">
                  <button class="common-btn dark-btn"  @click="copyOrderId1(`https://www.1x1games.com/register/${invite_code}`)">
                    {{ $t("member.copy") }}
                  </button>
                </span>
              </div>
              <div class="info-2-li">
                <span>{{ $t("member.code") }}：</span>
                <span class="info-input only-txt">
                {{ invite_code }}
                </span>
                <span class="change-btn">
                  <button class="common-btn dark-btn" @click="copyOrderId2(invite_code)">{{ $t("member.copy") }}</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
  </div>

  <div class="message" v-if="message" >
     <p>{{ $t("member.copySuccess") }}</p>
  </div>


</div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";

import {getPersonalInfo} from "@/network/main";

export default {
  name: "Invite",
  components:{
    pageBanner,
    personalNav
  },
  data(){
    return {
      message:false,
      invite_code:'',
    }
  },
  created() {
    getPersonalInfo().then(res =>{
      this.invite_code = res.data.data.invite_code;
    })
  },

  methods:{
    copyOrderId2(orderId) {
      let input = document.createElement("input"); // 创建input对象
      input.value = orderId; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.message = true
      if (this.message) {
        setTimeout(() => {
          this.message = false
        }, 2000)
      }
    },

    copyOrderId1(content) {
      let input = document.createElement("input"); // 创建input对象
      input.value = content; // 设置复制内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.message = true
      if (this.message) {
        setTimeout(() => {
          this.message = false
        }, 2000)
      }
    }
  },
}
</script>

<style scoped>
.only-txt{
  background: #000;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
}


@media only screen and (min-width:0px) and (max-width:767px) {
  .invite-more .info-2-li {
    flex-wrap: wrap;
  }
  .invite-more .info-2-li .only-txt {
    width: 100%;
    margin: 10px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .invite-more .info-2-li .change-btn {
    margin-left: 0;
    margin-bottom: 10px;
  }

}

</style>