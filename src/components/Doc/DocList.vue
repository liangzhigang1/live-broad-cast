<!-- 跑马灯组件，此组件不需要预置dom，只需在创建的时候指定挂载dom（即要在哪个dom里面跑） -->
<template>
  <div>
    <div style="margin-bottom: 50px;text-align: center">
      <el-button type="primary" @click="showKeJian">课件上传</el-button>
    </div>
    <div class="bjy-sidebar" :class="{ 'bjy-active': show }">
      <div id="catalogue">
        <div class="placeholder"></div>
      </div>
    </div>
    <doc-manage ref="docManage"></doc-manage>
  </div>
</template>

<script>
import DocManage from './DocManage'
export default {
  components: {
    DocManage
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    showKeJian () {
      this.$refs.docManage.open()
    }
  },
  mounted() {
    BJY.Catalogue.create({
      element: $("#catalogue .placeholder"),
      thumbnailWidth: 100,
      // hasWhiteboard: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.bjy-sidebar {
  // position: relative;
  position: absolute;
  top: 50px;
  bottom: 0;
  z-index: -1;
  left: 0;
  width: 160px;
  background: #fff;
  // box-shadow: 5px -5px 5px 5px #aaa;

  &.bjy-active {
    // left: -160px;
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
    background: #fff;
    color: #4a4a4a;
    border: 1px solid #4a4a4a;
    cursor: pointer;
  }
}
</style>
