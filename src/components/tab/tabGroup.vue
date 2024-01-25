<template>
  <div class="tab-group">

<!--    <div ref="barRef" class="tab-bar" :style="{ width: widthRef + 'px' }"></div>-->
    <div ref="titsRef" class="tab-header" layout="row" layout-wrap>
      <div
          ref="titRef"
          :class="[{ active: activeKey == item.props.actKey }, 'tab-nav']"
          v-for="(item, index) in tabTitLists"
          :key="item"
          @click="onTabClick($event, item, index)"
      >
        {{ item.props.label }}
      </div>
    </div>
    <div class="tab-panel">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, provide } from "vue";
export default {
  props: {
    defaultKey: {
      type: String,
      default: "1",
    },
  },
  setup(props, context) {
    const tabTitLists = context.slots.default();
    let activeKey = ref(props.defaultKey); //当前key
    provide("activeKey", activeKey);

    const barRef = ref(null);
    const titRef = ref(null);
    let widthRef = ref();
    onMounted(() => {
      // 设置状态线初始化宽度
      widthRef.value = titRef.value.clientWidth;
    });
    function onTabClick(event, tab) {
      activeKey.value = tab.props.actKey;
    }
    return {
      tabTitLists,
      barRef,
      titRef,
      widthRef,
      onTabClick,
      activeKey,
    };
  },
};
</script>
<style >
.tab-nav {
  color: #fff;
  line-height: 40px;
  display: inline-block;
  margin-right: 3em;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  position: relative;
}
.tab-nav.active:after  {
  content: '';
  display: block;
  width: 10px;
  height: 2px;
  background-color: #fff;
  border: 1px solid var(--color-high-text);
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
 }
.tab-header:after {
   content: "";
   width: 100%;
   border-bottom: 2px solid #ddd;
 }
.tab-panel{
  padding: 15px 0;
}
@media only screen and (min-width:0px) and (max-width:767px){
  .tab-nav{
    margin-right: 1.8em;
  }



}
</style>
