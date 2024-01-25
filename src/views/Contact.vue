<template>
  <div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("menu.contact") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/contact.svg">
      </template>
    </page-banner>


    <div class="container">
     <div class="padding-t-b-120">

       <div class="contact">
         <div class="map">

           <iframe :src="map" :key="map" style="border:0;" llowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe>

         </div>
         <div class="company-info">
           <h1>{{ $t("content.game") }}</h1>
           <p>{{ $t("content.trouble") }}</p>
           <div class="bottom-info-text">
               <div>
                 <img src="@/assets/img/svg/bo-1.svg">{{ address }}
               </div>
               <div>
                 <img src="@/assets/img/svg/bo-2.svg">{{ tel }}
               </div>
               <div>
                 <img src="@/assets/img/svg/bo-3.svg">{{ email }}
               </div>
             </div>
         </div>
       </div>

       <div class="contact-form">
         <div class="white-common">
           <div class="black-common">
             <h1>{{ $t("menu.contact") }}</h1>
             <form ref="myForm">
               <div class="contact-form-content">
               <div class="contact-input">
                 <p>{{ $t("content.name") }}<span>*</span></p>
                 <input class="common-input" type="text" v-model="contact.name">
               </div>
               <div class="contact-input">
                 <p>{{ $t("content.telephone") }}<span>*</span></p>
                 <input class="common-input" type="text" v-model="contact.tel">
               </div>
               <div class="contact-input">
                 <p>{{ $t("content.email") }}<span>*</span></p>
                 <input class="common-input" type="text" v-model="contact.email">
               </div>
             </div>
             <div class="contact-textarea">
               <p>{{ $t("content.message") }}<span>*</span></p>
               <textarea class="message-txt" v-model="contact.message"></textarea>
             </div>

             <div class="contact-btn-groups">
                 <button class="clear" type="button" @click="clear">{{ $t("content.reset") }}</button>
                 <button class="submit" type="button" @click="submit">{{ $t("content.submit") }}</button>
              </div>
             </form>
             </div>
         </div>
       </div>
     </div>
   </div>

    <div class="message" v-if="message" >
      <p>{{ messageTxt }}</p>
    </div>

  </div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import {getContact , contactForm} from "@/network/main";

export default {
  name: "Contact",
  data(){
    return {
      message:false,
      messageTxt:{},
      map:{},
      address:{},
      tel:{},
      email:{},
      contact:{
        name:'',
        tel:'',
        email:'',
        message:'',
      },
     }
  },
  components:{
    pageBanner
  },
  created() {
    getContact().then(res =>{

      this.address = res.data.data.address;
      this.tel = res.data.data.tel;
      this.email = res.data.data.email;
      this.map = res.data.data.map_link;
      // location.reload();
    })
  },
  methods:{
    submit(){
      let params = new URLSearchParams();
      params.append('name',this.contact.name)
      params.append('tel',this.contact.tel)
      params.append('email',this.contact.email)
      params.append('message',this.contact.message)
      contactForm(params).then(res =>{
        this.message = true
        if(res.data.code ==200){
          this.messageTxt = this.$t('content.send')
           setTimeout(() => {
              location.reload();
            }, 2000)
        }else {
          this.messageTxt = res.data.message
          setTimeout(() => {
            this.message = false
          }, 2000)
        }
      })
    },
    clear(){
       const form = this.$refs.myForm
       form.reset()
    }
  },
  mounted() {
    // 在页面加载完成后执行刷新操作

  }
}
</script>

<style scoped>
.contact{
  display: flex;
  align-items: center;
}
.map iframe{
  width: 600px;
  height: 320px;
  margin-right: 30px;
}
.company-info p{
  padding: 10px 0;
}
.bottom-info-text{
  margin-top: 20px;
}

.bottom-info-text div {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.bottom-info-text div img{
  margin-right: 10px;
}

.contact-form{
  padding-top: 60px;
}

.black-common{
  flex-wrap: wrap;
  padding: 40px;
}



.contact-form-content{
  width: 100%;
  margin-top: 40px;
}

.contact-form-content{
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.contact-input{
  background: #1F1F1F;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: 32%;
}

.contact-input p{
  color: #E1E1E1;
  line-height: 60px;
  width: 70px;
}
.contact-input p span, .contact-textarea p span{
  color: #FF6A6A;
}

.common-input{
  /*width: calc(100%- 50px)!important;*/
  height: 60px;
}

.contact-textarea{
  width: 100%;
  background: #1F1F1F;
  padding: 20px;
  margin-top: 20px;
}

.contact-textarea p{
  color: #E1E1E1;
}
.contact-textarea .message-txt{
  color: #fff;
  width: 100%;
  height: 100px;
  margin-top: 10px;
  background: transparent;
  resize: none;
}


.contact-btn-groups{
  width: 100%;
  padding-top: 40px;
  display: flex;
  align-content: center;
  justify-content: flex-end;
}

.contact-btn-groups button{
   margin-left: 40px;
   padding: 10px 40px;
   background: transparent;
   border: 1px solid #fff;
   color: #fff;
   font-size: 16px;
}
.submit{
  border: 1px solid var(--background)!important;
  background: var(--background)!important;
}

@media only screen and (min-width:768px) and (max-width:992px){
.contact{
flex-wrap: wrap;
}
  .map{
    width: 100%;

  }
  .map iframe{
    width: 100%;
    margin-bottom: 20px;
    margin-right: 0;
  }

}


@media only screen and (min-width:0px) and (max-width:767px){
  .contact{
    flex-wrap: wrap;
  }
  .map{
    width: 100%;

  }
  .map iframe{
    width: 100%;
    margin-bottom: 20px;
    margin-right: 0;
  }

  .black-common{
    padding: 20px;
  }

  .contact-form-content{
    flex-wrap: wrap;
  }

  .contact-btn-groups{
    width: 100%;
    padding-top: 20px;
  }

  .contact-btn-groups button{
    margin-left: 20px;
    padding: 10px 20px;
   }

  .contact-input{
    margin: 10px 0;
  }

  .contact-form h1, .company-info h1{
    font-size: 18px;
  }

  .contact-form-content{
    margin-top: 10px;
  }


  .contact-input{
    width: 100%;
  }


}


</style>