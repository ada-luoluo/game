<template>
<div class="other-bg">
  <page-banner>
    <template #banner-name>
      {{ $t("menu.introduce") }}
    </template>
    <template #banner-icon>
      <img src="@/assets/img/svg/page-icon-01.svg">
    </template>
  </page-banner>


  <div class="container">
    <router-link to="/introduce">
      <div class="back">
        <img src="@/assets/img/svg/back.svg"> {{ $t("content.back") }}
       </div>
    </router-link>

    <div class="game-intro p-b-120">
      <div class="white-common">
        <div class="black-common">

          <div class="intro-1">
            <div class="game-pic">
              <img :src="image">
            </div>

            <div class="intro-txt">
              <h3>{{ title }}</h3>
              <p>{{ $t("content.need") }}</p>
              <div class="intro-coin">
                <img src="@/assets/img/svg/coin.svg">{{ token }}
              </div>
              <div class="intro-more-txt">
                <p v-html="processedContent"></p>
              </div>
            </div>

          </div>

          <div class="intro-line common-border"></div>

          <div class="intro-2">
            <h3>{{ $t("content.images") }}</h3>
            <div class="intro-video" v-if="video != null">
              <iframe :src="video"  frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            <div class="intro-pic">
              <div class="row">
                <div class="intro-img" v-for="item in images" :key="item">
                  <img :src="item">
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>

</div>

</template>

<script>
import pageBanner from "@/components/pageBanner";

import {getGamesDetail} from "@/network/main";

export default {
  name: "introDetails",
  components:{
    pageBanner,
  },
  data() {
    return {
      id: null,
      title: '',
      image: '',
      images:[],
      token:'',
      video:'',
      description: '',
     }
  },
  created() {
      this.id = this.$route.params.id; //拿到id
      getGamesDetail(this.id).then(res =>{
        this.title = res.data.data.title;
        this.image = res.data.data.image;
        this.images =res.data.data.images;
        this.token = res.data.data.token;
        this.video = res.data.data.video_link;
        this.description = res.data.data.description;
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


.game-intro .black-common{
  flex-wrap: wrap;
  padding: 40px;
}

.intro-1, .intro-2, .intro-line{
  width: 100%;
}

.intro-1{
  display: flex;
  justify-content: space-between;
}

.intro-1 .game-pic{
   width: 290px;
   margin-right: 30px;
}


.intro-1 .intro-txt{
   width: calc(100% - 310px)
}

.game-intro h3{
 font-size: 20px;
  padding-bottom: 30px;
}

.game-intro p{
  color: #E1E1E1;
}

.intro-1 .intro-txt .intro-coin{
  padding: 10px 0;
  display: flex;
  align-items: center;
 font-size: 26px;
  font-weight: bold;
}

.intro-line{
  height: 3px;
  margin: 40px 0;
}

.intro-video iframe{
  width: 100%;
  height: 430px;
  margin-bottom: 20px;
}


.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -.5);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}

.row>* {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: 10px;
  margin-bottom: 10px;
}

.intro-img{
  width: 50%;
}

@media only screen and (min-width:0px) and (max-width:767px){
  .game-intro .black-common{
     padding: 20px;
  }
  .intro-1{
    flex-wrap: wrap;
  }

  .intro-1 .intro-txt{
    width: 100%;
  }
  .intro-1 .game-pic{
    margin-bottom: 20px;
  }
  .game-intro h3 {
    font-size: 18px;
    padding-bottom: 15px;
  }

  .intro-line{
     margin: 20px 0;
  }

  .intro-video iframe{
    height: 300px;
     margin-bottom: 0;
  }

  .intro-img{
    width: 100%;
  }


}




</style>