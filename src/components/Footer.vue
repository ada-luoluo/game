<template>

    <div class="bottom-line common-border"></div>
    <div class="bottom">
         <div class="container">
             <div class="bottom-logo">
               <img src="@/assets/img/logo.svg">
             </div>
             <div class="bottom-links v-line">
             <router-link to="/about" :class="{'active': $route.path === '/about'}">
               {{ $t("menu.about") }}
             </router-link>
             <router-link to="/introduce" :class="{'active': $route.path === '/introduce'}">
               {{ $t("menu.introduce") }}
             </router-link>
             <router-link to="/exchange" :class="{'active': $route.path === '/exchange'}">
               {{ $t("menu.exchange") }}
             </router-link>
               <router-link to="/leaderboard/1" :class="{'active': $route.path === '/leaderboard/1'}">
               {{ $t("menu.leaderboard") }}
             </router-link>
             <router-link to="/news" :class="{'active': $route.path === '/news'}">
               {{ $t("menu.news") }}
             </router-link>
             <router-link to="/contact"  :class="{'active': $route.path === '/contact'}">
               {{ $t("menu.contact") }}
             </router-link>
             <router-link to="/serve"  :class="{'active': $route.path === '/serve'}">
               {{ $t("menu.serve") }}
             </router-link>
             <router-link to="/privacy"  :class="{'active': $route.path === '/privacy'}">
               {{ $t("menu.privacy") }}
             </router-link>
             <router-link to="/disclaimer"  :class="{'active': $route.path === '/disclaimer'}">
               {{ $t("menu.disclaimer") }}
             </router-link>
           </div>
             <div class="bottom-info v-between">
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
                 <div class="bottom-qrcode v-between">
                     <div class="apps">
                       <div class="white-common">
                         <div class="black-common">
                           <a href="https://apps.apple.com/hk/app/6447547171" target="_blank">
                             <img src="@/assets/img/ios.png" >
                           </a>
                         </div>
                       </div>
                       <div class="apps-txt">
                         <a href="https://apps.apple.com/hk/app/6447547171" target="_blank">
                         <img src="@/assets/img/home_banner_img02.png">
                         </a>
                       </div>
                     </div>
                   <div class="apps">
                     <div class="white-common">
                       <div class="black-common">
                       <a href="https://play.google.com/store/apps/details?id=com.chinasky.onebyoneGames" target="_blank">
                         <img src="@/assets/img/android.png" >
                       </a>
                       </div>
                     </div>
                     <div class="apps-txt">
                       <a href="https://play.google.com/store/apps/details?id=com.chinasky.onebyoneGames" target="_blank">
                       <img src="@/assets/img/home_banner_img03.png">
                       </a>
                     </div>
                   </div>
                   </div>

             </div>
             <div class="bo-copyright">
               <p>© 2023 1x1 games. All rights reserved.</p>
             </div>
         </div>
    </div>

</template>

<script>
import {getContact} from "@/network/main";
export default {
  name: "Footer",
  data(){
    return {
      address:{},
      tel:{},
      email:{},
    }
  },
  created() {
    getContact().then(res =>{
      this.address = res.data.data.address;
      this.tel = res.data.data.tel;
      this.email = res.data.data.email;
    })
  },
}
</script>

<style scoped>
.bottom-line{
   height: 3px;
}
.bottom{
  background: #0F0F0F;
}
.bottom-logo{
  display: flex;
  justify-content: center;
  padding: 50px 20px;
}

.bottom-logo img{
  width: 70px;
}

.bottom-links{
  justify-content: space-between;
}

.bottom-links a{
  font-size: 14px;
}

.bottom-links a:hover{
  color: var(--background);
}

.bottom-info{
  align-items: center;
  padding: 50px 0;
  border-bottom: 1px solid #4A4A4A;
}
.bottom-info-text div{
  display: flex;
  align-items: center;
}
.bottom-info-text div img{
 margin-right: 10px;
 padding: 5px 0;
}
/**/
.bottom-qrcode{
  width: 260px;
}
.apps{
  width: 120px;
}

.apps-txt{
  margin-top: 10px;
}

.apps-txt img{
  height: 36px;
}

.bo-copyright p{
  font-size: 14px;
  color: #C2C2C2;
  padding: 15px 0;
  text-align: center;
}

@media only screen and (min-width:0px) and (max-width:1199px){
  .bottom-logo, .bottom-links, .bottom-info-text{
   display: none;
  }

  .bottom-info{
   justify-content: center;
    padding: 20px 0;
  }

}

/************************************************************************/





</style>