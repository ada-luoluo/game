<template>



<div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("menu.about") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/page-icon-01.svg">
      </template>
    </page-banner>

  <div class="container ab-bg">
    <div class="about-page padding-t-b-120">
      <div class="about-title">
        <div class="white-common">
          <div class="black-common">
            <span>{{ $t("content.game") }}</span>
          </div>
        </div>
      </div>
      <div class="">
        <div class="editor">
         <p v-html="processedContent"></p>
        </div>
        <div class="white-common">
          <div class="black-common">
            <img :src="image">
          </div>
        </div>

      </div>

    </div>

  </div>


</div>
</template>

<script>
import pageBanner from "@/components/pageBanner";

import {getAbout} from "@/network/main";

export default {
  name: "About",
  components:{
    pageBanner,
  },
  data(){
    return{
      description:'',
      image:'',
    }
  },
  created() {
    getAbout().then(res =>{
      this.description = res.data.data.content;
      this.image = res.data.data.image;
     })
  },
  computed: {
    processedContent() {
      return this.description.replace(/\r?\n/g, "<br>");
    }
  },
}
</script>

<style scoped>
.about-title{
   width: 240px;
   margin-bottom: 50px;
}

.about-title span{
  font-size: 40px;
  display: block;
  text-align: center;
  padding: 15px 0;
}

.ab-bg{
  background:url("~@/assets/img/home_img01.png") top right no-repeat;
}

@media only screen and (min-width:0px) and (max-width:767px){
  .about-title{
      margin-bottom: 20px;
  }
  .about-title span{
    font-size: 22px;
    display: block;
    text-align: center;
    padding: 15px 0;
  }
  .about-title{
    width: 100%;
  }
   .about-title span{
      font-size: 20px;
    }

}



</style>