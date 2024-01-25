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
    <div class="personal-nav">
      <personalNav></personalNav>
    </div>
    <div class="personal-info-content">
      <div class="white-common">
        <div class="black-common">

          <div class="personal-info">
            <div class="personal-info-left">
              <div class="personal-img">
                <img :src="avatar || defaultAvatarUrl" class="personal-avatar">
                <div class="upload-img">
                  <img src="@/assets/img/svg/camera.svg" >
                </div>
                <div class="upload-img" style="opacity: 0;">
                  <input type="file" ref="imageInput" @change="handleImageChange"/>
                </div>
               </div>
              <div class="personal-1">
                <h3>{{ name }}
                  <span>
                   <img :src="getImageSrc()">
                 </span>
                </h3>
                <p>{{ $t("member.code") }}：{{ invite_code }}</p>
              </div>
            </div>
            <div class="personal-info-right" @click="codeShow()">
              <img :src="qrcode">
            </div>


          </div>

          <div class="info-2 other-input-11">
            <h3>{{ $t("member.personalInformation") }}</h3>

            <div class="info-2-li">
              <span>{{ $t("member.name") }}：</span>
              <span class="info-input">
                <input type="text" class="common-input" v-model="name" name="name"  @change="changeHandler('name', name)">
              </span>
            </div>

            <div class="info-2-li">
              <span>{{ $t("member.birth") }}：</span>
              <span class="info-input" id="birthday-container">
                {{ birthday }}
              </span>
            </div>

            <div class="info-2-li">
              <span>{{ $t("member.sex") }}：</span>
              <span class="info-input">
               <select v-model="sex" class="gender"  @change="changeHandler('sex', sex)">
                   <option value="1">{{ $t("member.male") }}</option>
                   <option value="2">{{ $t("member.female") }}</option>
                   <option value="0">{{ $t("member.secret") }}</option>
               </select>
              </span>
            </div>

            <div class="info-2-li">
              <span>{{ $t("member.age") }}：</span>
              <span class="info-input">
                <select v-model="age_range_id" class="gender" @change="changeHandler('age_range_id', age_range_id)">
                   <option v-for="(value, key, index) in generation" :key="index" :value="key">{{ value }}</option>
                </select>
              </span>
            </div>

            <div class="info-2-li">
              <span>Email：</span>
              <span class="info-input">
                <input type="text" class="common-input" v-model="email" name="email" @change="changeHandler('email', email)" autocomplete="off">
              </span>
            </div>

            <div class="info-2-li edit-btn">
              <span></span>
              <span>
                <button class="common-btn dark-btn" type="button" @click="update">{{ $t("member.modify") }}</button>
              </span>
            </div>
        </div>


            <div class="info-2 other-input-11">
              <h3>{{ $t("member.accountInfo") }}</h3>
              <div class="info-2-li">
                <span>{{ $t("member.phone") }}：</span>
                <span class="info-input">
                  <input type="text" class="common-input" readonly="readonly" v-model="tel">
                </span>
                <span class="change-btn">
                  <router-link to="/exchangeTele">
                    <button class="common-btn dark-btn">{{ $t("member.replace") }}</button>
                  </router-link>

                </span>
              </div>
              <div class="info-2-li">
                <span>{{ $t("member.password") }}：</span>
                <span class="info-input">
                  <input type="text" class="common-input" readonly="readonly" placeholder="*******">
                </span>
                <span class="change-btn">
                  <router-link to="/password">
                     <button class="common-btn dark-btn">{{ $t("member.replace") }}</button>
                  </router-link>

                </span>
              </div>
           </div>

        </div>
      </div>
    </div>
 </div>
</div>

<!-- 弹窗 -->

  <div class="other-pop"  v-if="showModal2">
    <div class="other-pop-content">
      <div class="white-common">
        <div class="black-common">
          <div class="pop-top">
            <div class="pop-close" @click="popClick()">
              x
            </div>
          </div>
          <div class="pop-content personal-content">
              <div class="personal-info-left">
                <div class="personal-img">
                  <img :src="avatar || defaultAvatarUrl" class="personal-avatar">
                </div>
                <div class="personal-1">
                  <h3>{{ name }}
                    <span id="sex">
                      <img :src="getImageSrc()">
                    </span>
                  </h3>
                  <p>{{ $t("member.code") }}：{{ invite_code }}</p>
                </div>
              </div>

              <div class="big-code">
                <img :src="qrcode">
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--  小彈窗-->
  <div class="message" v-if="message" >
    <p>{{ messageTxt }}</p>
  </div>



</div>
</template>

<script>

import pageBanner from "@/components/pageBanner";
import personalNav from "@/components/personalNav";
import defaultAvatarUrl from '@/assets/img/personal_img07.png'
import {getPersonalInfo, getGeneration, Update, UploadAvatar} from "@/network/main";

export default {
  name: "Personal",
  components:{
    pageBanner,
    personalNav
  },
  data(){
    return {
      showModal2:false,
      name:'',
      sex:'',
      age_range_id:'',
      email:'',
      area_code:'',
      tel:'',
      birthday:'',
      generation:[],
      invite_code:'',
      qrcode:'',
      avatar:null,
      defaultAvatarUrl: defaultAvatarUrl,
      isAvatarChanged: false,// // 是否更改了 avatar
      message:false,
      messageTxt:'',
      imageFile: null,//頭像文件
      path:'1',//1是頭像
      original:'',
      changes: {},
    };
  },
  created() {
    //年龄段
    getGeneration().then(res =>{
      this.generation = res.data.data;
    })
     //个人信息
    getPersonalInfo().then(res =>{
      console.log(res)
      this.name = res.data.data.name;
      this.sex = res.data.data.sex;
      this.age_range_id = res.data.data.age_range_id;
      this.email = res.data.data.email;
      this.invite_code = res.data.data.invite_code;
      this.tel = res.data.data.tel;
      this.birthday = res.data.data.birthday;
      this.qrcode = res.data.data.qrcode;
      this.avatar = res.data.data.avatar;
    })
  },
 methods:{
   getImageSrc() {
     if (this.sex === 1) {
       return require('@/assets/img/svg/male.svg');
     } else if (this.sex === 2) {
       return require('@/assets/img/svg/female.svg');
     } else {
       return require('@/assets/img/svg/secret.svg');
     }
   },

   //上傳頭像
   handleImageChange(event) {
     this.imageFile = event.target.files[0];
     this.uploadAvatar();
     this.isAvatarChanged = true;//修改了頭像
   },
   uploadAvatar() {
     const formData = new FormData();
     formData.append('file', this.imageFile);
     formData.append('path', this.path);
     UploadAvatar(formData).then((res)=>{
       this.avatar = res.data.data.url;
       this.original = res.data.data.original;
       console.log(this.original)
     }).catch(err=> {
       console.log(err)
     })
   },

   changeHandler(key, value) {
     // 记录修改的数据
     this.changes[key] = value;
   },

    //修改個人信息
   update(){
     //遍历表单数据,有修改的才提交
     let params = new URLSearchParams();
     for (const [key, value] of Object.entries(this.changes)) {
       params.append(key, value);
     }
     if (this.isAvatarChanged && this.avatar) { // 判断是否需要提交 avatar
       params.append('avatar', this.original);
     }

     Update(params).then((res)=>{
       console.log(res)
       if (res.data.code == 500){
         this.message = true
         this.messageTxt = this.$t('tips.fail')
         setTimeout(() => {
           this.message = false
         }, 3000)
         location.reload();
       }
       if (res.data.code == 200){
         this.message = true
         this.messageTxt = this.$t('tips.success')
         setTimeout(() => {
           this.message = false
         }, 3000)
         location.reload();
       }
     }).catch(err=> {
       console.log(err)
     })
  },

  popClick(){
     this.showModal2 = false;
   },
   codeShow(){
     this.showModal2 = true;
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

.big-code{
  margin-top: 20px;
  background: #fff;
  padding: 10px;
}

.personal-content{
  width: inherit;
}

.personal-info-right{
  cursor: pointer;
}

#birthday-container{
  height: 44px;
  background: #000;
  padding: 0 10px;
  line-height: 44px;
}

.upload-img{
  cursor: pointer;
}
.personal-avatar{
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.personal-img img{
  border-radius: 100%;
}

</style>