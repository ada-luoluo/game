<template>
  <div class="diff-bg other-bg">
    <div class="container">
      <div class="terms padding-t-b-120">
        <h1>{{ $t("menu.disclaimer") }}</h1>
        <Editor :content="content"></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import { getDisclaimer } from "@/network/main";

export default {
  name: "Disclaimer",
  components:{
    Editor
  },
  data(){
    return{
      content:' '
    }
  },
  created() {
    getDisclaimer().then(res =>{
      this.content = res.data.data.content;
    })
  },

}
</script>

<style scoped>

</style>