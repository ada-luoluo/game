<template>
<div class="banner">
 <div class="banner-txt">
    <div class="container">
       <div class="download-content">
         <div class="download-content-logo">
           <img src="@/assets/img/logo.svg">
           <h1>{{ $t("content.download") }}</h1>
         </div>

         <div class="banner-code">
           <div class="apps">
             <div class="apps-txt">
               <a href="https://apps.apple.com/hk/app/6447547171" target="_blank">
               <img src="@/assets/img/home_banner_img02.png">
               </a>
             </div>
             <div class="white-common">
               <div class="black-common">
                 <a href="https://apps.apple.com/hk/app/6447547171" target="_blank">
                  <img src="@/assets/img/ios.png" >
                 </a>
               </div>
             </div>

           </div>
           <div class="apps">
             <div class="apps-txt">
               <a href="https://play.google.com/store/apps/details?id=com.chinasky.onebyoneGames" target="_blank">
               <img src="@/assets/img/home_banner_img03.png">
               </a>
             </div>
             <div class="white-common">
               <div class="black-common">
                 <a href="https://play.google.com/store/apps/details?id=com.chinasky.onebyoneGames" target="_blank">
                    <img src="@/assets/img/android.png" >
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  </div>

  <img src="@/assets/img/banner-2.jpg">
</div>
</template>

<script>
export default {
  name: "banner"
}
</script>

<style scoped>
.banner{
  position: relative;
}
.banner-txt{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.download-content{

  padding-top: 80px;
}

.download-content-logo img{
  width: 80px;
}

.download-content-logo h1{
  padding: 20px 0 40px 0;
  font-size: 60px;
}

.banner-code{
  display: flex;
}

.banner-code .apps{
  width: 160px;
  margin-right: 30px;
}

.banner-code .apps-txt img{
  height: 56px;
  margin-bottom: 20px;
}
@media only screen and (min-width:768px) and (max-width:1199px){
  .download-content-logo img{
    display: none;
  }

  .download-content-logo h1{
    padding: 10px 0;
    font-size: 30px;
  }


  .banner-code .apps{
    width: 120px;
    margin-right: 20px;
  }
  .banner-code .apps-txt img{
    height: 36px;
    margin-bottom: 10px;
  }

  .download-content{
     padding-top: 30px;
  }



}


@media only screen and (min-width:0px) and (max-width:767px){
  .download-content-logo img{
    display: none;
  }

  .download-content-logo h1{
    padding: 10px 0;
    font-size:24px;
  }

  .banner{
    /*padding-top: 60px;*/
  }

  .banner-code .apps{
    width: 100px;
    margin-right: 20px;
  }

  .banner-code .apps-txt img{
     height: 30px;
     margin-bottom: 5px;
  }

  .download-content{
    padding: 0;
  }

}


</style>