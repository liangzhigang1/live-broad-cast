<!-- 跑马灯组件，此组件不需要预置dom，只需在创建的时候指定挂载dom（即要在哪个dom里面跑） -->
<template>
  <div :style="{width: show ? '160px' : '0px'}" class="bjy-sidebar" :class="{ 'bjy-active': show }">
    <div @click="show = !show" class="bjy-toggle-btn">文档列表</div>
    <div class="bjy-doc-list"></div>
    <div class="upload-doc">
      <el-button type="primary" icon="el-icon-folder-opened" @click="showKeJian">课件上传</el-button>
    </div>
    <doc-manage ref="docManage"></doc-manage>
  </div>
</template>

<script>
import DocManage from './DocManage'
let store = BJY.store;
import language from "../../language/main";

export default {
  components: {
    DocManage,
    language
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    showKeJian () {
      if (!store.get("class.started")) {
          // 针对教室状态给出相应的提示，你可以使用任何你喜欢的UI来处理他们，这里我使用的是自定义的全局tip，下同
          this.$Toast(language.TIP_CLASS_NOT_START);
          return;
        }
      this.$refs.docManage.open()
    }
  },
  mounted() {
    var xx = BJY.Catalogue.create({
      element: $(".bjy-doc-list"),
      thumbnailWidth: 100,
      // hasWhiteboard: true,
    });
    store.set("class.catalogue", xx);
  },
};
</script>

<style lang="scss" scoped>
.bjy-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  left: 0;
  // width: 160px;
  background: #fff;
  // box-shadow: 5px -5px 5px 5px #aaa;
  
  &.bjy-active {
    left: -160px;
  }

  .bjy-toggle-btn {
    position: absolute;
    left: -24px;
    top: 100px;
    width: 24px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 0;
    text-align: center;
    background: #2D3342;
    color: #fff;
    // z-index: 99999 !important;
    // border: 1px solid #4a4a4a;
    cursor: pointer;
  }
  .upload-doc {
    position: absolute;
    left: 16px;
    bottom: 20px;
    text-align: center;
    color: #fff;
    .el-button {
      padding: 9px 24px !important;
    }
  }
}
</style>
