<template>
  <div class="other-bg">
    <page-banner>
      <template #banner-name>
        {{ $t("menu.leaderboard") }}
      </template>
      <template #banner-icon>
        <img src="@/assets/img/svg/king.svg">
      </template>
    </page-banner>

    <div class="container">
      <div class="padding-t-b-120">
        <div class="leaderboard-content">
          <div class="white-common">
            <div class="black-common">
              <div class="leaderboard-content-left">
                <div class="leaderboard-cate">
                  {{ $t("content.choose") }}  <img src="@/assets/img/svg/down.svg">
                </div>
                <div class="leaderboard-cate-list">
                  <ul>
                    <li v-for="item in gamesList" :key="item.id" :class="{ active:item.id == id }"
                        @click="handleClick(item.id)">
                     <div class="white-common">
                       <div class="black-common">
                         <img :src="item.image">
                         <span>{{ item.title }}</span>
                       </div>
                     </div>
                    </li>

                  </ul>
                </div>
              </div>
              <div class="leaderboard-content-right">
                <div class="leaderboard-right-top">
                  <div class="leaderboard-game-name">
                    {{ title }}
                  </div>
                  <div class="game-rang-type">
                    <div  @click="fetchData(1)" :class="{ active: month === 1 }">
                      {{ $t("content.monthlyRanking") }}
                    </div>
                   <div class="" @click="fetchData()" :class="{ active: month !== 1}">
                     {{ $t("content.allRanking") }}
                   </div>
                 </div>
                  <div class="refresh" @click="refreshData()">
                    <img src="@/assets/img/svg/refresh.svg"> {{ $t("content.refresh") }}
                  </div>
                </div>

                <div class="own" v-if="self">
                  <div class="own-part">
                    <div class="leaderboard-li">
                      <div class="v-h">
                        <div class="rang-number" style="color: #fff">
                          {{ self.key }}
                        </div>
                        <div class="rang-member v-h">
                          <div style="position: relative">
                           <!--加皇冠-->
                            <div class="crown">
                              <img src="@/assets/img/List_img07.png"  v-if="self.key === 1">
                              <img src="@/assets/img/List_img08.png"  v-if="self.key === 2">
                              <img src="@/assets/img/List_img09.png"  v-if="self.key === 3">
                            </div>
                            <img :src="self.avatar"  class="my-avatar">
                          </div>
                          <div>
                            <b>{{ self.name}}</b>
                            <p>{{ $t("content.time") }}：{{ self.end_date }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="rang-point">
                        <div>
                          {{ self.score }}
                          <span>{{ unit }}</span>
                        </div>
                        <div>
                          <span>{{ $t("content.gameTime") }}: {{ self.seconds }} {{ $t("content.second") }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="leaderboard-all-list">
                  <LeaderboardList :Leaderboard="Leaderboard" :unit="unit"></LeaderboardList>
                </div>

                 <!--  分頁 -->
                <Pagination
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    :show-pagination="showPagination"
                    @goto-page="onPageChange"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageBanner from "@/components/pageBanner";
import LeaderboardList from "@/components/leaderboard/leaderboardList";
import Pagination from "@/components/Pagination";

import {getLeaderboard, getGamesDetail, getAllGames} from "@/network/main";

export default {
  name: "List",
  components:{
    pageBanner,
    LeaderboardList,
    Pagination,
  },
  data(){
    return{
      gamesList:[],
      id:1,
      Leaderboard:[],
      title:'',
      unit:'',
      self:'',
      month: 1, // 默认显示月排名.如果是undefined,默认不显示月排名或总排名
      currentPage: 1, // 当前页码
      totalPages: 1, // 总页数
      showPagination: false, // 是否显示分页
    }
  },
  created() {
    // 默认显示月排名
    this.fetchData(1);

    //游戏列表
    getAllGames().then(res =>{
      this.gamesList = res.data.data;
    })

    this.id = this.$route.params.id; //拿到id
    //遊戲詳情
    getGamesDetail(this.id).then(res =>{
      this.title = res.data.data.title;
      this.unit = res.data.data.unit;
      console.log(this.unit)
    })

  },
  methods:{
    handleClick(id) {
      this.$router.push(`/leaderboard/${id}`) //获取路由参数传递id
    },

    fetchData(month) {
      this.id = this.$route.params.id; //拿到id
      if (month) {  //月排名
        getLeaderboard(this.id,  this.currentPage, month).then(res => {
          this.Leaderboard = res.data.data.list.data;
          this.month = month;
          this.self = res.data.data.self;//自身排名
          //
          this.currentPage = res.data.data.list.current_page;
          this.totalPages = res.data.data.list.last_page;
          this.showPagination = this.totalPages > 1; // 是否显示分页
        });
      } else { //总排名
        getLeaderboard(this.id, this.currentPage).then(res => {
          this.Leaderboard = res.data.data.list.data;
          this.month = month;
          this.self = res.data.data.self;//自身排名
          //
          this.currentPage = res.data.data.list.current_page;
          this.totalPages = res.data.data.list.last_page;
          this.showPagination = this.totalPages > 1; // 是否显示分页
        });
      }
    },
    //刷新數據
    refreshData() {
      if (this.month === 1) {
        this.fetchData(1);
      } else {
        this.fetchData();
      }
    },
    //点击分页按钮
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData(this.month);
      window.scrollTo(0, 0);
    },
   },

}
</script>

<style scoped>

.leaderboard-content-left{
  width: 260px;
  padding: 20px;
}
.leaderboard-cate{
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

}
.leaderboard-cate img{
   margin-left: 10px;
  width: 14px;
}

.leaderboard-cate-list ul li{
  width: 100%;
  list-style: none;
  margin: 5px 0;
  cursor: pointer;
}
.leaderboard-cate-list ul li img{
   width: 36px;
  margin-right: 10px;
}

.leaderboard-cate-list ul li span{
  line-height: 36px;
}
.leaderboard-cate-list ul li .white-common{
  border:1.5px solid transparent;
  background: transparent;
}
.leaderboard-cate-list ul li .black-common{
  align-items: normal!important;
   justify-content: left;
  border:1.5px solid transparent;
  background: rgba(255, 255, 255, 0.1);
}

.black-common{
  align-items: normal;
}

.leaderboard-cate-list ul li:hover .white-common, .leaderboard-cate-list ul li.active .white-common{
  background: #FFFFFF;
  border: 1.5px solid var(--color-high-text);
}
.leaderboard-cate-list ul li:hover .black-common, .leaderboard-cate-list ul li.active .black-common{
  background: #000;
  border: 1.5px solid var(--color-high-text);
}

.leaderboard-content-right{
  width: calc(100% - 260px);
  padding: 20px;
}
.leaderboard-right-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.leaderboard-game-name{
  font-size: 26px;
  font-weight: bold;
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
.refresh{
 display: flex;
  align-items: center;
  cursor: pointer;
}
.refresh img{
   margin-right: 10px;
}

.leaderboard-all-list{
  margin: 20px 0;
}
.own{
  margin-top: 20px;
}
.own .leaderboard-li{
  background: linear-gradient(180deg, #6DACFA 0%, #76D6FF 100%), rgba(255, 255, 255, 0.1);
}

.my-avatar{
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

.my-avatar{
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.leaderboard-cate-list{
  height: 1300px;
  overflow-y:auto
}
.leaderboard-cate-list::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.leaderboard-cate-list::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.4);
}
.leaderboard-cate-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
  border-radius: 0;
  background: rgba(255,255,255,0.2);
}



@media only screen and (min-width:0px) and (max-width:767px){
  .leaderboard-content-left{
    width: 100%;
    padding: 0;
  }
  .leaderboard-content-right{
    width: 100%;
    padding: 0;
    margin-top: 0;
  }

  .black-common{
   flex-wrap: wrap;
  }


  .leaderboard-cate{
    font-size: 18px;
    margin-bottom: 10px;
  }
 .leaderboard-game-name{
   font-size: 20px;
    width: 100%;
   text-align: center;
  }

  .leaderboard-right-top{
    flex-wrap: wrap;
  }

  .game-rang-type{
    margin: 10px 0;
  }
  .leaderboard-cate-list{
    display:none
  }

  .leaderboard-content-left:hover .leaderboard-cate-list{
    display: block;
  }

}


</style>