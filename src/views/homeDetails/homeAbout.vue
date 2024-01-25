<template>
<div class="home-about padding-t-b-120">
  <h1 class="common-home-title"> {{ $t("menu.about") }}</h1>
  <div class="about-content">
    <p v-html="description"></p>
    <div class="common-btn">
      <router-link to="/about"> {{ $t("content.viewMore") }}</router-link>
    </div>
 </div>
  <div class="white-common">
    <div class="black-common">
      <img :src="image">
    </div>
  </div>
</div>
</template>

<script>

import {getAbout} from "@/network/main";

export default {
  name: "homeAbout",
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

}
</script>

<style scoped>
.home-about{
  background: #161516 url("~@/assets/img/home_img01.png") top right no-repeat;
  background-size: 100%;
}
.home-about h1.common-home-title{
  text-align: left;
}
.about-content{
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.about-content p{
  width: 80%;
  color: var(--color-tint);
  line-height: 26px;
  overflow: hidden;

  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  overflow:hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;

}

@media only screen and (min-width:0px) and (max-width:767px){
  .about-content{
    padding:15px 0;
    flex-wrap: wrap;

  }
  .about-content p{
    width: 100%;

  }

  .about-content .common-btn{
    margin-top: 10px;
  }

  .home-about h1{
    padding-top: 20px;
  }


}






</style>