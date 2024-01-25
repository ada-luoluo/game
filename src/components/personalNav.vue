<template>
<div class="nav">
  <div class="white-common">
    <div class="black-common">
      <div class="nav-li">
        <ul>
          <li>
            <router-link to="/personal" :class="{'active': $route.path === '/personal'}">{{ $t("member.personalInformation") }}</router-link>
          </li>
          <li>
            <router-link to="/gold" :class="{'active': $route.path === '/gold'}">{{ $t("member.myCoin") }}</router-link>
          </li>
          <li>
            <router-link to="/integral" :class="{'active': $route.path === '/integral'}">{{ $t("member.myIntegral") }}</router-link>
          </li>
          <li>
            <router-link to="/gift" :class="{'active': $route.path === '/gift'}">{{ $t("member.gift") }}</router-link>
          </li>
          <li>
            <router-link to="/invite" :class="{'active': $route.path === '/invite'}">{{ $t("member.invite") }}</router-link>
          </li>
        </ul>
      </div>
     </div>
  </div>
</div>

</template>

<script>
export default {
  name: "personalNav"
}
</script>

<style scoped>
.nav-li ul{
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}
.nav-li ul li{
  list-style: none;
  padding: 0 30px;
}

.nav-li ul li a{
  /*padding-bottom: 10px;*/
  position: relative;
}
.nav-li ul li a.active:after {
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

.black-common{
   justify-content: flex-start;
}


@media only screen and (min-width:0px) and (max-width:767px){
  .nav-li ul{
   flex-wrap: wrap;
    padding: 10px;
  }
  .nav-li ul li{
    list-style: none;
    padding: 0 10px;
    margin: 15px 0;
    width: 50%;
  }

}



</style>