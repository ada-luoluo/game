<template>
<div class="diff-bg other-bg">
  <div class="container">
    <div class="terms padding-t-b-120">
      <h1>{{ $t("menu.privacy") }}</h1>
      <Editor :content="content"></Editor>
    </div>
  </div>
</div>
</template>

<script>

import Editor from "@/components/Editor";
import { getPrivacy } from "@/network/main";

export default {
  name: "Privacy",
  components:{
    Editor
  },
  data(){
    return{
      content:''
    }
  },
  created() {
    getPrivacy().then(res =>{
      this.content = res.data.data.content;
    })
  },
}
</script>

<style scoped>

</style>