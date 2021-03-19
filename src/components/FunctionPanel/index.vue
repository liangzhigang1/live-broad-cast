<template>
  <div class="function-panel">
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe60a;</span>
      播放
      </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe6b0;</span>
      录制
      </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe675;</span>
      屏幕分享
      </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe62d;</span>
      发布作业
      </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe603;</span>
      允许举手
    </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe61e;</span>
      评价
    </div>
    <div class="panel-item" v-if="!isStudent">
      <span style="font-size: 20px" class="iconfont">&#xe627;</span>
      更多
    </div>
    <div style="position: absolute;right: 0;margin-right: 10px;display: flex;">
      <div class="panel-item" v-if="!isStudent">
        退出课堂
      </div>
      <div class="panel-item" v-if="!isStudent">
        <span style="font-size: 20px" class="iconfont">&#xe627;</span>
          下课
      </div>
    </div>
  </div>
</template>

<script>
import language from "../../language/main";
import SpeakApplyMenu from "./SpeakApplyMenu";
import ShareScreenMenu from "./ShareScreenMenu";
import Record from "./Record";

let store = BJY.store;
let eventEmitter = BJY.eventEmitter;
let auth = BJY.auth;

export default {
  components: {
    SpeakApplyMenu,
    ShareScreenMenu,
    Record,
  },
  data() {
    return {
      statusTip: "",
      language: language,
      isStudent: auth.isStudent(),
      barrage: null,
      isBarrageOn: false,
      cdnList: [],
      currentNode: 1,
      canSwitchCdn: !BJY.auth.isWebRTC(),
    };
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
.function-panel {
  display: flex;
  align-items: center;
  .panel-item {
    background: #313847;
    border: 1px solid #4b5767;
    display: flex;
    align-items: center;
    justify-content:center;
    width: 100px;
    margin-left: 30px !important;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>
