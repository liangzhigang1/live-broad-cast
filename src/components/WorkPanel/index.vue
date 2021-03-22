 <template>
  <el-dialog :fullscreen="isFullscreen" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <div style="width: 100%;color: #fff">
      {{ works && works.studentName ? works.studentName : '' }}
    </div>
    <div v-if="works && works.type == 'png'" style="height: 100%;width: 100%">
      <img style="width: 100%;height: 100%" src="../../../src/assets/img/8.png" />
    </div>

    <div v-if="works && works.type == 'mp3'" style="height: 100%;width: 100%">
      <img style="width: 100%;height: 100%" src="../../../src/assets/img/8.png" />
      <AudioPlayer :audio-list="audioList"
                   :show-prev-button="false"
                   :show-next-button="false"
                   :before-play="onBeforePlay" />
    </div>

    <div v-if="works && works.type == 'mp4'" style="height: 100%;width: 100%">
      <video-player class="video-player vjs-custom-skin" 
                    ref="videoPlayer" 
                    :playsinline="true" 
                    :options="playerOptions">
      </video-player>
    </div>
  </el-dialog>
</template>
<script>
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

export default {
  name: "WorkPanel",
  components: {
    
  },
  props: {
    visible: { type: Boolean, default: false },
    work: { type: Object, default: () => { return {}; } },
  },
  watch: {
    visible (value) {
      this.dialogVisible = value;
    },
    work (value) {
      this.works = value
    }
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: require('../../assets/img/exampleobject.mp4') // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      isFullscreen: false,
      dialogVisible: this.visible,
      works: this.work,
      audioList: [
        require('../../assets/img/dfh.mp3')
      ]
    };
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible',false)
      done()
    },
    // 播放前做的事
    onBeforePlay(next) {
      console.log('这里可以做一些事情...')
      next() // 开始播放
    }
  }
};
</script>
<style lang="scss" >
.el-dialog {
  background: rgba($color: #000000, $alpha: 0.3) !important;
  margin-top: 11vh !important;
}
.el-dialog__title {
  color: #fff !important;
}
.el-dialog__body {
  padding: 0px 10px !important;
}
.audio__progress-point {
  background-color: rgb(255, 255, 255) !important;
  box-shadow: rgb(255, 255, 255) 0px 0px 10px 0px !important;
}
.audio__progress {
  background: #0e83c6 !important;
}
.audio__play-rate {
  color: rgb(255, 255, 255) !important;
}
.audio__play-icon {
  color: rgb(255, 255, 255) !important;
}
#icon-play-volume {
  color: rgb(255, 255, 255) !important;

}
.audio__play-rate__dropdown {
  color: #fff !important;
  background: rgba(0,0,0,0.3) !important;
  border: 0px !important;
}
.audio__play-volume-wrap {
    position: absolute;
    width: 10px !important;
    height: 88px !important;
    bottom: 20px !important;
    left: 5px !important;
    background-color: #ddd;
    border-radius: 10px;
}
.audio__play-volume {
    background-color: #5ebeed !important;
}
</style>
