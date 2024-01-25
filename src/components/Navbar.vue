<template>
  <div class="nav">

    <div class="index-nav">
      <div class="index-nav-frame clearfix">
        <div class="nav-small" tabindex="-1" v-on:click="show = !show">
          <div class="nav-small-focus" tabindex="-1">
          </div>
          <img src="@/assets/img/svg/menu.svg" />
        </div>
        <div v-if="show" class="mobile-nav-only">

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/about" :class="{'active': $route.path === '/about'}">
              {{ $t("menu.about") }}
            </router-link>
          </div>

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/introduce" :class="{'active': $route.path === '/introduce'}">
              {{ $t("menu.introduce") }}
            </router-link>
          </div>

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/exchange" :class="{'active': $route.path === '/exchange'}">
              {{ $t("menu.exchange") }}
            </router-link>
          </div>

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/leaderboard/1" :class="{'active': $route.path === '/leaderboard/1'}">
              {{ $t("menu.leaderboard") }}
            </router-link>
          </div>

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/news" :class="{'active': $route.path === '/news'}">
              {{ $t("menu.news") }}
            </router-link>
          </div>

          <div class="index-nav-frame-line" tabindex="-1" @click="mobileClick">
            <router-link to="/contact"  :class="{'active': $route.path === '/contact'}">
              {{ $t("menu.contact") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
 </div>

</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      show: false,
      isShow:true,
    }
  },
  created() {
    //判断屏幕宽度,是否默认显示下拉
    if(window.innerWidth >= 768){
      this.show= true;
    }else{
      this.isShow= false;
    }
  },
  methods: {
    mobileClick() {  //手机端导航点击后默认不显示下拉
      if(window.innerWidth < 767){
        this.show= false;
      }
    },
  },
}
</script>

<style scoped>
/***导航***/

.index-nav{
  height: 40px;
  box-sizing: border-box;
}

.index-nav-frame-line{
  color: #000000;
  float: left;
  position: relative;
  display: block;
  outline: none;
  cursor: pointer;
  line-height: 40px;
  text-align: left;
  font-size: 16px;
  padding: 0 30px;
  /*font-weight: bold;*/
}

.index-nav-frame-line-li a{
  display: block;
}

.index-nav-frame-line-li:hover a{
  color: white;
}
.index-nav-frame-line-li:hover a span{
  background: #fff;
}


.index-nav-frame-line:hover {
  height:auto;
  opacity: 1;
}


.index-nav-frame-line a.active:after {
  content: '';
  display: block;
  width: 24px;
  height: 2px;
  background-color: #fff;
  border: 1px solid var(--color-high-text);
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}


.nav-small{
  display: none;
}


@media only screen and (max-width:767px) {
  .index-nav-frame-line{
    line-height: 44px;
  }
  .index-nav-frame-line-li a{
    display: block;
    color: white;
  }
  .nav-small{
    display: block;
  }
  .nav-small:focus~.index-nav-frame-line{
    height: auto;

    border-bottom: 1px solid #000;
  }
  .nav-small:focus .nav-small-focus{
    display: block;
  }
  .index-nav-frame{
    width: 100%;
  }
  .index-nav-frame-line{
    width: 100%;
    overflow: hidden;
  }


  .index-nav-frame-line:focus{
    height: auto;
    border-bottom: 1px solid #ccc;
  }
  .index-nav-frame-line:focus{
    height:auto;
    opacity: 1;
  }
  .index-nav-frame-line:focus {
    color: #B63B4D;
  }

  .index-nav-frame-line:focus{
    display: block;
  }
  .index-nav{
    height: 0;
  }
  .index-nav-frame-line{
    padding: 10px 30px;
    background:rgba(0,0,0,.9);
     border-bottom: 1px solid #fff;
  }
  .nav-small{
    display: block;
  }

  .nav-small{
    width: 36px;
    height: 36px;
   z-index: 2;
  }
  .nav-small img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .nav-small-focus{
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
  }
  .nav-small-focus:focus{
    display: none;
  }
  .mobile-nav-only{
    position: absolute;
    top: 45px;
    left: 0;
  }



  .nav-small-focus img{
    background: #fff;
  }

}


@media only screen and (max-width:767px) {
  .nav{
    width: 100%;
    position: absolute;
    left: 0;
    top: 72px;
    z-index: 99;
  }
}

/**/

@media only screen and (min-width:992px) and (max-width:1160px){
  .index-nav-frame-line {
    padding: 0 10px;
  }
}

@media only screen and (min-width:768px) and (max-width:991px){

  /*.index-nav-frame-line {*/
  /*  padding: 0 5px;*/
  /*  font-size: 14px;*/
  /*}*/

}


</style>