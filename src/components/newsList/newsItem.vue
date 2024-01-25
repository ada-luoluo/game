<template>
  <div class="news-li">
    <a v-bind:href="listItem.file" download target="_blank">
    <div class="white-common">
      <div class="black-common">
        <div class="new-date">
            <b>{{listItem.date}}</b>
          </div>
          <div class="new-content">
            <p>{{listItem.title}}</p>
          </div>
      </div>
    </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "newsItem",
  props: {
    listItem: {
      type:Object, //返回对象
      default() {
        return {}
      }
    }
  },

}
</script>

<style scoped>


.new-date{
  width: 100px;
}
.new-date b{
  color: #C2C2C2;
  font-size: 13px;

}

.new-content {
  width: calc(100% - 120px);

  padding-left: 20px;
  margin-left: 20px;
  border-left: 1px solid #9E9E9E;

}


.new-content p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow:hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
}


.news-li{
  width: 100%;
  margin-bottom: 15px;
}
.news-li .white-common{
  background: transparent;
  border:1.5px solid transparent;
  box-shadow: none;
}

.news-li .black-common{
  flex-wrap: nowrap;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.1);
  border:1.5px solid transparent;
  padding: 12px;
}


.news-li:hover .white-common{
  background: #FFFFFF;
  border: 1.5px solid var(--color-high-text);
  box-shadow: 0px 0px 6px rgba(255, 226, 254, 0.17);
  cursor: pointer;
}

.news-li:hover .black-common{
  background: #000;
  border: 1.5px solid var(--color-high-text);
}


</style>