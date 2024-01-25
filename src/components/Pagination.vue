<template>
  <div class="pagination">

    <!-- 显示分页 -->
    <ul v-if="showPagination">
      <li :class="{ disabled: currentPage === 1 }">
        <button @click="gotoPage(currentPage - 1)" :disabled="currentPage === 1">
          <img src="@/assets/img/svg/left.svg">
        </button>
      </li>

      <li v-for="page in pages" :key="page" :class="{ active: page === currentPage }"  @click.prevent="gotoPage(page)">
        <a>{{ page }}</a>
      </li>

      <li :class="{ disabled: currentPage === totalPages }">
        <button @click="gotoPage(currentPage + 1)" :disabled="currentPage === totalPages">
          <img src="@/assets/img/svg/right.svg">
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: { type: Number, required: true }, // 当前页码
    totalPages: { type: Number, required: true }, // 总页数
    showPagination: { type: Boolean, required: true }, // 是否显示分页
  },

  computed: {
    pages() {
      // 生成页码数组
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
  },
  methods: {
    gotoPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('goto-page', page);
      }
    },
  },
}
</script>

<style scoped>
/*.pagination{*/
/*  padding-bottom: 60px;*/
/*}*/
.pagination ul{
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination ul li{
  list-style: none;
  padding: 5px 10px;
  border: 1px solid #fff;
  border-radius: 2px;
  margin: 10px;
  cursor: pointer;
}

.pagination ul li.active{
  background: var(--background);
  border-color:  var(--background);
}

.pagination button{
   background: none;
}

.pagination li.disabled{
  border-color: #333;
  cursor:not-allowed;
}

.pagination li.disabled button{
  cursor:not-allowed;
}

@media only screen and (min-width:0px) and (max-width:767px){
  /*.pagination{*/
  /*  padding-bottom: 20px;*/
  /*}*/
}

</style>