<template>
  <div class="leaderboard-li">
    <div class="v-h">
      <div class="rang-number">
        {{ index }}
      </div>
      <div class="rang-member v-h">
        <div style="position: relative">
          <div class="crown" v-if="index === 1">
            <img src="@/assets/img/List_img07.png">
          </div>
          <div class="crown" v-else-if="index === 2">
            <img src="@/assets/img/List_img08.png">
          </div>
          <div class="crown" v-else-if="index === 3">
            <img src="@/assets/img/List_img09.png">
          </div>

          <img :src="listItem.avatar || defaultAvatarUrl"  class="user-avatar">

        </div>
        <div>
          <b>
            {{ listItem.name }}
          </b>
          <p class="time-pc">{{ $t("content.time") }}：<br/>{{ listItem.end_date }}</p>
        </div>
      </div>
    </div>

    <div class="rang-point">
      <div>
        {{ listItem.score }}<span>{{ unit }}</span>
      </div>
      <div>
        <span>{{ $t("content.gameTime") }}: {{ listItem.seconds }} {{ $t("content.second") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAvatarUrl from "@/assets/img/personal_img07.png";

export default {
  name: "leaderboardItem",
  data() {
    return {
      defaultAvatarUrl: defaultAvatarUrl,
    }
  },
  props: {
    listItem: {
      type:Object, //返回对象
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      required: true
    },
    unit: {
      type:Object,
      default() {
        return {}
      }
    },
  },
}
</script>

<style>
.leaderboard-li{
  width: 100%;
  padding: 30px 20px 30px 20px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}

.rang-number{
  font-size: 20px;
  color: var(--color-high-text);
  margin-right: 20px;
  font-weight: bold;
}

.rang-member img{
  width: 50px;
  margin-right: 10px;
  border-radius: 100%;
}

.rang-member b{
  font-size: 18px;
}

.rang-member p{
  font-size: 12px;
  color: #DAF1FF;
  padding-top: 5px;
}

.rang-point{
  font-size: 20px;
  font-weight: bold;
  text-align: right;
}

.rang-point span{
  color: #fff;
  font-size: 14px;
  padding-left: 5px;

}

img.user-avatar{
  height: 50px;
  border-radius: 100%;
}

.crown{
  position: absolute;
  top: -13px;
  left: -13px;
}

.crown img{
  width: 30px;
}


@media only screen and (min-width:0px) and (max-width:767px){
.leaderboard-li{
  flex-wrap: wrap;
  padding: 20px 10px 20px 10px;
}

.rang-point{
   width: 100%;
  text-align: right;
}
.rang-point{
  display: flex;
  margin: 10px 0 0 0;
 justify-content: flex-end;
}

  .rang-point div:nth-child(2) span{
    margin-left: 10px;
  }

  .rang-number{
    margin-right: 20px;
  }

  .user-avatar{
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }


}



</style>