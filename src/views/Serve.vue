<template>
  <div class="diff-bg other-bg">
    <div class="container">
      <div class="terms padding-t-b-120">
        <h1>{{ $t("menu.serve") }}</h1>
        <Editor :content="content"></Editor>
      </div>
    </div>
  </div>
</template>

<script>

import Editor from "@/components/Editor";
import { getServe } from "@/network/main";

export default {
  name: "Serve",
  components:{
    Editor
  },
  data(){
    return{
      content:''
    }
  },
  created() {
    getServe().then(res =>{
      this.content = res.data.data.content;
    })
  },
}
</script>

<style scoped>

</style>