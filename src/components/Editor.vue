<template>
   <div class="editor" v-html="processedContent"></div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    content: {
       type:Object, //返回对象
      default() {
        return {}
      }
    },
  },
  computed: {
    processedContent() {
      return this.content.replace(/\r?\n/g, "<br>");
    }
  }
}
</script>

<style scoped>

</style>