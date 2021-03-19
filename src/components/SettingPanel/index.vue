<template>
  <div id="setting">
    <CameraMenu />
    <MicMenu />
    <SpeakerMenu />
    <div style="margin-left: 10px;height: 20px;width: 1px;border-left: 1px solid #474E5C;"></div>
    <div style="margin-left: 10px;"><span style="font-size: 20px" class="iconfont">&#xe60d;</span></div>
    <div style="margin-left: 10px;height: 20px;width: 1px;border-left: 1px solid #474E5C;"></div>
    <div style="margin-left: 10px;"><span style="font-size: 18px" class="iconfont">&#xe62d;</span></div>
  </div>
</template>

<script>
import MicMenu from "./MicMenu";
import SpeakerMenu from "./SpeakerMenu";
import CameraMenu from "./CameraMenu";

export default {
  components: {
    MicMenu,
    SpeakerMenu,
    CameraMenu,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
#setting {
  display: flex;
  align-items: center;
}
</style>
