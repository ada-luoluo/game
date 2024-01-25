<template>
<div id="header">
  <div class="header-content" id="test">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/img/logo.svg">
      </router-link>
    </div>

    <Navbar/>

    <div class="top-right">

      <!--已登录-->
      <div class="top-logged" v-if="token">
        <div class="logged-info" @click="mShow = !mShow">
          <img :src="avatar || defaultAvatarUrl">
          <p class="m-name">{{ name }}</p>
          <span><img src="@/assets/img/svg/down.svg"></span>
        </div>
        <Transition>
        <div class="logged-nav" v-if="mShow">
          <ul>
            <li>
              <router-link to="/personal" :class="{'active': $route.path === '/personal'}"  @click="navClick">{{ $t("member.personalInformation") }}</router-link>
            </li>
            <li>
              <router-link to="/gold" :class="{'active': $route.path === '/gold'}"  @click="navClick">{{ $t("member.myCoin") }}</router-link>
            </li>
            <li>
              <router-link to="/integral" :class="{'active': $route.path === '/integral'}"  @click="navClick">{{ $t("member.myIntegral") }}</router-link>
            </li>
            <li>
              <router-link to="/gift" :class="{'active': $route.path === '/gift'}" @click="navClick">{{ $t("member.gift") }}</router-link>
            </li>
            <li>
              <router-link to="/invite" :class="{'active': $route.path === '/invite'}"  @click="navClick">{{ $t("member.invite") }}</router-link>
            </li>
            <li class="last-li-logged"  @click="other()">
              {{ $t("member.logout") }}
            </li>
          </ul>
        </div>
        </Transition>
     </div>

      <!--未登录-->
      <div class="member" v-else>
        <router-link to="/login">
          {{ $t("login.login") }}
        </router-link>
        <router-link to="/register" class="reg-btn">
          {{ $t("login.register") }}
        </router-link>
      </div>


      <div class="language">
        <div class="language-default" @click="show = !show">
          <img src="@/assets/img/svg/lang.svg">{{ langName }}
        </div>
        <Transition name="slide-fade">
         <div class="language-list" v-if="show">
          <ul>
            <li>
              <a @click="changeLanguage('hk')" :class="{active:language === 'hk'}">繁體中文</a>
            </li>
            <li>
              <a @click="changeLanguage('cn')" :class="{active:language === 'cn'}">简体中文</a>
            </li>
            <li>
              <a @click="changeLanguage('en')" :class="{active:language === 'en'}">ENGLISH</a>
            </li>
          </ul>
        </div>
        </Transition>
      </div>
    </div>
  </div>

</div>

</template>


<script>
import Navbar from "@/components/Navbar";
import i18n from "@/lang/index";
import defaultAvatarUrl from '@/assets/img/personal_img07.png'
import { getPersonalInfo, Logout, } from "@/network/main";

export default {
  name: "Header",
  components: {
    Navbar,
  },
  data() {
    return {
      language:localStorage.getItem("language") == null ? 'hk' :localStorage.getItem("language"), //判断当前语言,给当前语言加active
      langName:'',
      show:false,
      mShow:false,
      showModal:false,
      name:'',
      avatar:'',
      defaultAvatarUrl: defaultAvatarUrl,
      is_app:'2',
      token:null,
    }
  },

  created() {
    //导航吸顶
    window.onscroll = function () {

      const topScroll = document.documentElement.scrollTop;
      const header = document.getElementById("header");

      if (topScroll > 50) {
        header.style.background = '#0F0F0F';
      } else {
        header.style = ''
      }
    }

  },
  mounted() {
    // 从localStorage中读取选中的语言
    const savedLanguage = localStorage.getItem('changeLanguage');
    if (savedLanguage) {
      this.langName = savedLanguage;
    } else {
      this.langName = '繁體中文'; // 默认语言
    }
    console.log(savedLanguage)

   if (localStorage.getItem("language") == 'en' ) {
     document.documentElement.classList.add('en'); //单独给英文加class名
   }

    //判断是否登录
    this.token = localStorage.getItem('token');
   console.log(this.token)
    if (this.token !== null){
      getPersonalInfo().then(res =>{
        this.name = res.data.data.name;
        this.avatar = res.data.data.avatar;
      }).catch(err=> {
        console.log(err)
        this.token = false
      })
     }
  },
  methods: {
    navClick() {  //点击不显示下拉
      this.mShow = false;
    },
    //退出登錄
    other(){
      this.mShow = false;
      this.showModal = true;
      let params = new URLSearchParams();
      params.append('is_app',this.is_app)

      Logout(params).then((res)=>{
        // console.log(res)
        if(res.data.code == 200){
          localStorage.removeItem('token');
          setTimeout(() => {
            location.reload();
          }, 2000)
          this.$router.push('/');
         }
      }).catch(err=> {
        console.log(err)
      })
    },
    //语言切换
    changeLanguage(language) {
      localStorage.setItem("language", language)
      if (language == "hk") {
        i18n.global.locale = "hk";
        this.langName = '繁體中文';
      } else if (language == "cn") {
        i18n.global.locale = "cn";
        this.langName = '简体中文';
       } else if (language == "en") {
        i18n.global.locale = "en";
        this.langName = 'ENGLISH';
      }
      localStorage.setItem('changeLanguage', this.langName);
      location.reload();
    }
 }
}
</script>

<style scoped>


#header {
  height: 80px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
}
.header-content{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 10px 80px;
  border-bottom: 1px solid #A6A6A6;
}

.logo img{
 width: 43px;
}

.top-right{
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.member{
  display: flex;
  align-items: center;
}

.member a {
  font-size: 14px;
  padding: 10px 30px;
  border: 1px solid #fff;
  margin: 0 10px;
}

.member a.reg-btn{
  background: var(--background);
  border: 1px solid var(--background);
}

.language{
  position: relative;
  cursor: pointer;
}

.language-default{
  display: flex;
  font-size: 14px;
  align-items: center;
}

.language-default img{
   width: 24px;
  margin-right: 6px;
}

.language-list{
  width: 140px;
  position: absolute;
  top: 40px;
  left: 0;
  background: #272727;
  font-size: 14px;

}
.language-list ul{
  display: block;

}
.language-list ul li{
  text-align: center;
  list-style: none;
}

.language-list ul li a {
  display: block;
  padding: 15px 0;
}

.language-list ul li a.active{
   background: var(--background);
}

.top-logged{
  position: relative;
}

.logged-info{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logged-info img{
  width: 30px;
  margin-right: 10px;
}

.logged-info span{
   width: 8px; margin-left: 5px;
}
.logged-nav{
  width: 140px;
  position: absolute;
  top: 40px;
  left: 0;
  background: #272727;
  font-size: 14px;

}
.logged-nav ul{
  display: block;

}
.logged-nav ul li{
  text-align: center;
  list-style: none;
}

.logged-nav ul li:hover{
  background: var(--background);
}

.logged-nav ul li a{
  display: block;
  padding: 10px 0;

}

.logged-nav ul li a.active{

  background: var(--background);
}

.last-li-logged{
  height: 40px;
  line-height: 40px;
  cursor:pointer;
}

/*****************/
.modal-groups{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top:1px solid #4A4A4A;
  padding-top: 10px;
  margin-top: 20px;
}

.modal-groups button{
  width: 50%;
  color: #fff;
  background: transparent;
  font-size: 18px;
  position: relative;
  margin: 0!important;
}

.modal-groups-1{
  border-right:1px solid #4A4A4A;
}

.modal-groups-2{
  color: var(--background)!important;
}

.modal-overlay footer button{
  display: none!important;
}


.m-name {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


.logged-info img{
    width: 30px;
  height: 30px;
  border-radius: 100%;
}

@media only screen and (min-width:0px) and (max-width:1366px){
  .header-content{
     padding:10px;
  }
}

@media only screen and (min-width:768px) and (max-width:992px){
  .top-right{
    width: 240px;
    justify-content: flex-end;
  }
  .member a{
    font-size: 12px;
    padding: 10px 15px;
    margin: 0 5px;
  }

  .language{
    margin-left: 20px;
  }



}

@media only screen and (min-width:0px) and (max-width:767px){

    #header{
      height: 120px;
    }
    .header-content{
      flex-wrap: wrap;

    }


    .logo{
     width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo img{
      width: 36px;
    }

  .top-right{

    justify-content: flex-end;
    margin-top: 8px;
    margin-left: 40px;
  }

  .header-content{
    height: inherit;
  }
    .language-list{
      width: 100px;
    }
    .bo-copyright p{
      font-size: 12px;
    }

  .top-logged{
    margin-right: 10px;
    z-index: 999;
  }

  .language{
    padding-left: 20px;
    z-index: 999;
  }

  .member a{
    font-size: 12px;
    padding: 10px 15px;
    margin: 0 5px;
    z-index: 999;
  }


}




</style>