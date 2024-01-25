<template>
  <div class="diff-bg other-bg">
     <Banner/>
    <div class="container">
      <HomeAbout/>
      <HomeGame/>
      <HomeExchange/>
      <div class="home-other p-b-120">
          <div class="home-other-part">
            <HomeNews/>
          </div>
        <div class="home-other-part">
            <HomeLeaderboard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Banner from "@/components/Banner";
import HomeAbout from "@/views/homeDetails/homeAbout";
import HomeGame from "@/views/homeDetails/homeGame";
import HomeExchange from "@/views/homeDetails/homeExchange";
import HomeNews from "@/views/homeDetails/homeNews";
import HomeLeaderboard from "@/views/homeDetails/homeLeaderboard";


export default {
  name: "Home",
  components:{
    Banner,
    HomeAbout,
    HomeGame,
    HomeExchange,
    HomeNews,
    HomeLeaderboard,
  },

}
</script>

<style scoped>
.home-other{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.home-other-part{
  width: 45%;
}

@media only screen and (min-width:768px) and (max-width:991px){
  .home-other-part{
    width: 100%;
    /*margin: 20px 0;*/
  }
}

@media only screen and (min-width:0px) and (max-width:767px){

 .home-other-part{
   width: 100%;
   margin: 20px 0;
 }

}

</style>