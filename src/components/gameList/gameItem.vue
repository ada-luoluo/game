<template>
<div class="game-li">
  <div class="white-common">
    <div class="black-common">
      <div class="game-img">
        <div class="game-coin">
          <img src="@/assets/img/svg/coin.svg">{{ listItem.token }}
        </div>
        <img :src="listItem.image">

      </div>
      <div class="game-name">
        <p>{{ listItem.title }}</p>
      </div>
      <div class="game-view common-btn"  @click="itemClick">
       {{ $t("content.viewIntroduction") }}
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default {
  name: "Item",
  props: {
    listItem: {
      type:Object, //返回对象
      default() {
        return {}
      }
    }
  },
  methods:{
    itemClick() {
      this.$router.push('/introDetails/' + this.listItem.id)//传递id
    }
  }
}
</script>

<style>
.game-li{
  list-style: none;
  flex: 0 0 auto;
  width: 25%!important;
}
.game-li .white-common{
  background: transparent;
  border: none;
  box-shadow: none;
}

.game-li .black-common{
  flex-wrap: wrap;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 12px;
}


.game-li:hover .white-common{
  background: #FFFFFF;
  border: 1.5px solid var(--color-high-text);
  box-shadow: 0px 0px 6px rgba(255, 226, 254, 0.17);
}

.game-li:hover .black-common{
  background: #000;
  border: 1.5px solid var(--color-high-text);
}


.game-li:hover .game-view {
  background: var(--color-high-text);
  border:1px solid var(--color-high-text);
}

.game-img{
  position: relative;
}
.game-coin{
  position: absolute;
  top: 10px;
  right: 10px;
  background: #0F0F0F;
  border-radius: 20px;
  padding: 5px 10px;
  display: flex;
  justify-items: center;
}

.game-name{
  width: 100%;
  padding: 15px 0;
}
.game-name p{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.game-view{
  width: 100%;
}


@media only screen and (min-width:0px) and (max-width:767px){
  .game-li{
    width: 50%!important;
  }

  .exchange-gold-no img{
    margin-right: 5px!important;
  }

  .exchange-last{
     font-size: 13px;
  }

}

</style>