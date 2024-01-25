<template>
<div class="home-leaderboard">
  <div class="other-common-title">
    <h1 class="common-home-title">{{ $t("menu.leaderboard") }}</h1>
    <div class="common-btn">
      <router-link to="/leaderboard">{{ $t("content.viewMore") }}</router-link>
    </div>
  </div>

  <div class="home-leaderboard-box">
       <div class="white-common">
         <div class="black-common">
           <div class="leaderboard-top">
             <div class="game-list-container">
              <div class="leaderboard-game-name"  @click="showDropdown = !showDropdown">
                {{ title }}  <img src="@/assets/img/svg/down.svg">
              </div>
             <div class="game-list" v-if="showDropdown">
               <ul>
                 <li v-for="item in gamesList" :key="item.id" :class="{ active:item.id == id }"
                     @click="handleClick(item.id)" :id="item.id">
                   {{ item.title }}
                 </li>
               </ul>
             </div>
             </div>

             <div class="game-rang-type">
               <div  @click="fetchData(1)" :class="{ active: month === 1 }">
                 {{ $t("content.monthlyRanking") }}
               </div>
               <div class="" @click="fetchData()" :class="{ active: month !== 1}">
                 {{ $t("content.allRanking") }}
               </div>
             </div>
           </div>
           <div class="leaderboard-game-rang">
             <LeaderboardList :Leaderboard="Leaderboard" :unit="unit"></LeaderboardList>
           </div>
         </div>
       </div>
  </div>

</div>
</template>

<script>

import LeaderboardList from "@/components/leaderboard/leaderboardList";
import { getLeaderboard, getGamesDetail, getAllGames} from "@/network/main";

export default {
  name: "homeLeaderboard",
  components:{
    LeaderboardList,
  },
  data(){
    return {
      showDropdown: false,
      id:1,
      gamesList:[],
      Leaderboard:[],
      title:'',
      unit:'',
      self:'',
      month: 1, // 默认显示月排名.如果是undefined,默认不显示月排名或总排名
    }
  },
  created() {
    // 默认显示月排名
    this.fetchData(1);
    //遊戲詳情
    this.getGamesDetail();

    //游戏列表
    getAllGames().then(res =>{
      this.gamesList = res.data.data;
    })

  },
  methods:{
    //遊戲詳情接口拿取遊戲名稱和單位
    getGamesDetail(){
       getGamesDetail(this.id).then(res =>{
         this.title = res.data.data.title;
         this.unit = res.data.data.unit;
         console.log(this.unit)
       })
    },
    //點擊下拉列表拿取id,將id傳遞,再次調用接口重新渲染遊戲名稱和排行榜數據
    handleClick(id) {
      this.id = id;
      this.showDropdown = false;
      this.getGamesDetail();
      this.fetchData(this.month)//拿到id後調用fetchData方法得到數據
     },

    fetchData(month) {

      if (month) {  //月排名
        getLeaderboard(this.id, 1, month).then(res => {
          this.Leaderboard = res.data.data.list.data;
          this.month = month;
          this.self = res.data.data.self;//自身排名
        });
      } else { //总排名
        getLeaderboard(this.id, 1).then(res => {
          this.Leaderboard = res.data.data.list.data;
          this.month = month;
          this.self = res.data.data.self;//自身排名
        });
      }
    },

  },

}
</script>

<style scoped>
.home-leaderboard-box{
  margin-top: 40px;
}

.home-leaderboard-box .black-common{
  flex-wrap: wrap;
  padding: 20px;
}
.leaderboard-top{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.leaderboard-game-name{
  background: rgba(255, 255, 255, 0.1);
  border-radius: 53px;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;

}
.leaderboard-game-name img{
  margin-left: 5px;
}

.game-rang-type{
  background: rgba(255, 255, 255, 0.1);
  border-radius: 53px;
  font-size: 14px;
  padding: 10px 10px;
  display: flex;
}
.game-rang-type div{
  border-radius: 53px;
  padding:5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.game-rang-type div.active{
  background: var(--color-high-text);
}

.leaderboard-game-rang{
  width: 100%;
  height: 500px;
  margin: 10px 0;
  overflow-y:auto
}

.game-list{
  height: 500px;
  overflow-y:auto
}

.leaderboard-game-rang::-webkit-scrollbar, .game-list::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.leaderboard-game-rang::-webkit-scrollbar-thumb, .game-list::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.4);
}
.leaderboard-game-rang::-webkit-scrollbar-track, .game-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
  border-radius: 0;
  background: rgba(255,255,255,0.2);
}
.game-list-container{
  position: relative;
}

.game-list{
  background: #000;
  padding: 0;
  position: absolute;
  top:36px;
  left: 0;
  z-index: 3;
}

.game-list ul li{
  list-style: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 15px;
  margin: 5px 0;
}

.game-list ul li:hover{
  background: var(--background);
}


@media only screen and (min-width:0px) and (max-width:767px){

  .home-leaderboard-box{
    margin-top: 20px;
  }

  .leaderboard-top{
     flex-wrap: wrap;
  }

  .game-list-container{
    width: 100%;
  }
  .leaderboard-game-name{
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .game-list{
    width: 100%;
  }

}

</style>