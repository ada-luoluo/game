<template>
  <div class="game-li">
    <div class="white-common">
      <div class="black-common">
        <div class="game-img">
          <img :src="listItem.image">
        </div>
        <div class="game-name">
          <p>{{ listItem.title }}</p>
        </div>
        <div class="exchange-gold">
          <div class="exchange-gold-no">
            <img src="@/assets/img/svg/kin.svg">{{ listItem.points }}
          </div>
          <div class="exchange-last">
            {{ $t("content.remaining") }} {{ listItem.inventory }}
          </div>
        </div>
        <div class="game-view common-btn"  @click="itemClick" :id="listItem.id" >
         {{ $t("content.exchange") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exchangeItem",
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
      this.$router.push('/exchangeDetails/' + this.listItem.id)//传递id
      console.log(this.listItem.id)
    }
  },
}
</script>

<style scoped>
.exchange-gold{
  width: 100%;
  padding: 0 0 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.exchange-gold-no{
  font-size: 20px;
  color: #FFC300;
  font-weight: bold;
}
.exchange-gold-no img{
  margin-right: 10px;
}

.exchange-last{
  color: #9E9E9E;
}
</style>