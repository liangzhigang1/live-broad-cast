<template>
  <div id="app">
    <!-- <Loading /> -->
    <div ref="main" id="main">
      <div class="wrap">
        <div class="left">
          <div class="main">
            <TeacherPlayer v-show="!showStartBtn" />
            <img v-if="showStartBtn" src="../src/assets/img/8.png" alt="">
            <div class="start">
              <el-button @click="handleClassStart" style="width: 140px;height: 30px" type="primary" v-if="showStartBtn" icon="el-icon-video-play">上课</el-button>
            </div>
          </div>
          <!-- 文档列表 -->
          <div class="doc-manage"> 
            <div @click="showKejian = !showKejian" style="text-align: center;color: #999999;" class="doc-manage-icon">
              <div>
                <span v-if="showKejian" style="font-size: 10px" class="iconfont">&#xeca5;</span>
                <span v-if="!showKejian" style="font-size: 10px" class="iconfont">&#xeca6;</span>
              </div>
              <div>我</div>
              <div>的</div>
              <div>课</div>
              <div>件</div>
            </div>
            <div v-show="showKejian" class="doc-manage-main">
              <div class="title">
                课件
              </div>
              <div style="text-align: center">
                <div class="img-main">
                  
                </div>
                <div class="img-title">
                  文件名加后三个...jpg
                </div>
                <div class="img-main">

                </div>
                <div class="img-title">
                  文件名加后十三个...jpg
                </div>
                <div class="img-main">

                </div>
                <div class="img-title">
                  文件名加后三个...jpg
                </div>
              </div>
              <div class="doc-manage-upload">
                <el-button style="width: 140px;height: 30px" type="primary" icon="el-icon-folder-opened">课件上传</el-button>
              </div>          
            </div>
          </div>
          <div style="display:flex" class="footer">
            <div style="flex: 0 0 0px">
              <SettingPanel />
            </div>
            <div style="flex: 1">
              <FunctionPanel />
            </div>
            
          </div>
        </div>
        <div class="right">
          <div v-if="huDong" :style="{ marginLeft: showKejian ? '3px' : ''}"  class="hu-dong">
            <div @click="showHuDong" class="shousuo">
                <span style="color: #999999;font-size: 20px" class="iconfont">&#xeca5;</span>
            </div>
            <div style="width: 240px;height: 200px;border: 1px solid #474F5D;background: #fff;margin: 0px 10px">
            </div>
            <!-- 互动区 -->
            <InteractionPanel />
          </div>
        </div>
        <div v-if="!huDong" @click="showHuDong" class="shousuo1">
            <span style="color: #999999;font-size: 20px" class="iconfont">&#xeca6;</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// loading组件，进教室之前的准备工作
import Loading from "./components/Loading.vue";
// 白板组件
import WhiteBorad from "./components/WhiteBoard.vue";
// 设置面板：扬声器、麦克风、摄像头、设置
import SettingPanel from "./components/SettingPanel";
// 交互面板：用户列表、聊天、发言列表
import InteractionPanel from "./components/InteractionPanel";
// 老师播放器
import TeacherPlayer from "./components/TeacherPlayer";
// 功能面板：直播间的一些功能，举手、屏幕共享、弹幕之类
import FunctionPanel from "./components/FunctionPanel";
// 模态框组件，在老师端发起互动后显示
import ModalPanel from "./components/ModalPanel";
// 跑马灯组件
import HorseLamp from "./components/HorseLamp";
// 文档列表
import DocList from "./components/Doc/DocList";
// 话术
import language from "./language/main.js";
// swiper
import swiper from './components/swiper'

const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;
const store = BJY.store;
const config = BJY.config;

export default {
  name: "app",
  components: {
    Loading,
    WhiteBorad,
    SettingPanel,
    InteractionPanel,
    TeacherPlayer,
    FunctionPanel,
    HorseLamp,
    ModalPanel,
    DocList,
    swiper
  },
  data() {
    return {
      mediaPlayer: null,
      loaded: false,
      webrtc: 1,
      isTeacher: false,
      showStartBtn: false,
      work: null,
      src: require('../src/assets/img/8.png'),
      huDong: true,
      showKejian: true,
    };
  },
  mounted() {
    /**
     * flash的奇怪特性（普通大班课使用了flash）；
     * 需要在页面中插入一个大尺寸的flash才会自动播放，否则将会导致无法上麦和视频无法自动播放的问题
     */
    var url = "//live-cdn.baijiayun.com/js-sdk/1.15.0/player/extension/flash.swf";
    var html = BJY.createSWF("temp", "", url);

    var swf = $(html);
    $("body").prepend(swf);
    swf.css({
      position: "absolute",
      top: 0,
      width: 398,
      height: 298,
      opacity: 0,
    });
    // 判断是否支持flash
    if (!this.supportFlash() && !this.webrtc) {
      this.$Dialog
        .show({
          title: "提示",
          content: `网页Flash插件加载不成功，请重新<a class="opt-button"
            href="http://www.adobe.com/go/getflashplayer">启用flash</a>`,
          confirmText: "关闭",
        })
        .then(() => {
          console.log("flash启用");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // webrtc 添加页面交互
    if (this.webrtc) {
      this.$Dialog
        .show({
          title: "提示",
          content: `正在进入教室。。。`,
          confirmText: "确认",
        })
        .then(() => {
          console.log("教室内首次交互完成");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  created() {
    // 绑定事件
    let $body = $("body");
    store.watch(
      "class.started",
      (started) => {
        this.showStartBtn = auth.isTeacher() && !started;
      },
      true
    );
    eventEmitter
      .one(eventEmitter.CLASSROOM_CONNECT_TRIGGER, (event, data) => {
        // 初始化扩展
        var extension = BJY.getExtension();
        // 如果您使用的是webrtc拓展的话，请确保引入了realtimecat.js这个依赖，否则此处会报undefined：RTCat
        extension.init().then(() => {
          eventEmitter.trigger(eventEmitter.CLASSROOM_CONNECT_TRIGGER, data);
        });
        return false;
      })
      .on(eventEmitter.CLASSROOM_CONNECT_FAIL, () => {
        alert(language.ROOM_SERVER_CONNECT_FAIL);
      })
      .on(eventEmitter.LOGIN_CONFLICT, () => {
        alert(language.LOGIN_CONFLICT);
      })
      .on(
        eventEmitter.MESSAGE_SEND_FORBID_ALL_CHANGE,
        function (event, data) {
            console.log('xxxxxxxxxx', data);
            if (data.forbidAll) {
                // 是否全体禁言
            } else {
              data.forbidAll = true
            }
        }
    )
      // 监听初始化事件，初始化组件
      // 请将所有的组件创建逻辑写于此回调函数之中
      .one(eventEmitter.VIEW_RENDER_TRIGGER, () => {
        // 注意，在VIEW_RENDER_TRIGGER事件触发后再去加载教室里面的组件
        store.set("class.xx", true);
        this.loaded = true;
        this.isTeacher = auth.isTeacher();
        eventEmitter.trigger(eventEmitter.DOC_ALL_REQ);

        if (auth.isTeacher() || auth.isAssistant()) {
          store.set("class.speakState", config.SPEAK_STATE_FREE);
        } else {
          store.set("class.speakState", config.SPEAK_STATE_LIMIT);
        }

        if (auth.isPresenter() && store.get("class.started")) {
          setTimeout(() => {
            var player = BJY.Player.instances[BJY.store.get("user.id")];
            BJY.userPublish.setDevice(player, !player.videoOn, !player.audioOn);
          }, 1000);
        }

        if (auth.isStudent()) {
          $body.addClass("student");
        }

        // 初始化webRTC的屏幕扩展
        // 如果你需要使用到webrtc屏幕共享的话，记得在index.html里面引入对应的js依赖
        if (auth.isWebRTC()) {
          BJY.ScreenShareExtensionWebrtc.init();
        }

      })
      .one(eventEmitter.LOADING_PANEL_END, () => {
        // 进度条加载完成再显示ui
        $("#main").css("opacity", 1);
      })
      .on(eventEmitter.CLASS_END, () => {
        // 下课后所有人自动关闭音视频
        eventEmitter.trigger(eventEmitter.MEDIA_SWITCH_TRIGGER, {
          audioOn: false,
          videoOn: false,
        });
      })
      .on(eventEmitter.CLASS_START, () => {
        // 老师上课自动打开音视频
        if (auth.isPresenter()) {
          setTimeout(() => {
            var player = BJY.Player.instances[BJY.store.get("user.id")];
            BJY.userPublish.setDevice(player, !player.videoOn, !player.audioOn);
          }, 1000);
        }
      })
      .on(eventEmitter.CLASSROOM_CONNECT_SUCCESS, (event, data) => {
        // data.reconnect 是否为断线重连
      })
      // 踢出教室
      .on(eventEmitter.COMMAND_RECEIVE, (event, data) => {
        if (data.command && data.command.command_type === 'logout' && data.toId === store.get('user.id')) {
          alert('你已被踢出教室');
          location.reload();
        }
      });

    // 初始化教室
    this.init();
  },
  methods: {
    showHuDong () {
      console.log('11111112432432')
      this.huDong = !this.huDong
    },
    open () {
        if (!this.mediaPlayer) {
            this.mediaPlayer = BJY.NewMediaPlayer.create({
                element: $('#media-player1'),
                volume: 100,
                // 是否可以拖动，默认为false
                draggale: true,
                // 可拖动区域的选择符，默认为Body元素
                draggableRectSelector: 'body',
                replace: false,
                onCloseButtonClick: () => {
                    this.close()
                },
                onMinimizeButtonClick: () => {
                    this.visible = false;
                },
                onPlayFileFail: function () {
                    alert('打开文件失败');
                }
            });
        }
    },
    close () {
        this.mediaPlayer = null;
    },
    init() {
      // 默认demo教室-学生端
      var options = {
        prefixName: "e83228320",
        // env: "production",
        room_id: "21031850330453",
        user_number: "31",
        user_avatar: "https%3A%2F%2Falioss.shejizhizi.com%2Fwkapi%2Fdefault.jpg",
        user_name: "mobile_64aff661cfd",
        user_role: 0,
        sign: "9d4acc9037e55d8bd22d12c98c604a6a",
        webrtc: 1,
      };

      if (location.href.includes("teacher=1")) {
        options = Object.assign(options, {
          user_name: "mobile_b15a9cc5176",
          user_role: 1,
          user_number: "24",
          user_avatar: "https%3A%2F%2Fwkapi.shejizhizi.com%2Fstatic%2Favatar%2Fdefault.jpg",
          sign: "a4397c64fb6c2e13562578b793c35e96",
        });
      }
      console.log('options', options);
      var classOption = {
        // 必须为字符串
        id: options.room_id,
        // 学生默认限制发言
        speakState: BJY.config.SPEAK_STATE_LIMIT,
      };
      if (Number(options.webrtc)) {
        classOption.webrtcType = Number(options.webrtc);
      }
      this.webrtc = classOption.webrtcType;

      //
      BJY.init({
        // env: options.env,
        privateDomainPrefix: options.prefixName,
        // privateDomainPrefix: 'e83228320',
        class: classOption,
        user: {
          number: options.user_number,
          avatar: decodeURIComponent(options.user_avatar),
          name: decodeURIComponent(options.user_name),
          type: Number(options.user_role),
        },
        teacher: {
          number: options.user_number,
          avatar: decodeURIComponent(options.user_avatar),
          name: decodeURIComponent(options.user_name),
          type: Number(options.user_role),
        },
        sign: options.sign,
      });
    },
    // 支持解析输入的url进教室
    urlParser(url) {
      var params = {};
      if (url) {
        try {
          var queryStr = url.split("?")[1];
          var paramList = queryStr.split("&");
          paramList.forEach((item) => {
            var pair = item.split("=");
            params[pair[0]] = pair[1];
          });
          // 区分环境
          params.env = this.getEnv(url);
          // 个性域名
          params.prefixName = url.split(".")[0].split("//")[1];
        } catch (e) {
          alert("url格式错误，已进入默认教室");
        }
      }
      return params;
    },
    getEnv(url) {
      // 获取环境
      let hostName = url.match(/\/\/(.*)\./)[1];
      if (
        /test/.test(hostName) ||
        /localhost/.test(hostName) ||
        /\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostName)
      ) {
        return "test";
      }
      if (/beta/.test(hostName)) {
        return "beta";
      }
      if (/www/.test(hostName)) {
        return "";
      }
      return "";
    },
    supportFlash() {
      var swf;
      var plugins = navigator.plugins;

      if (plugins && plugins.length > 0) {
        swf = plugins["Shockwave Flash"];
      } else if (document.all) {
        // eslint-disable-next-line no-undef
        swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      }
      return !!swf;
    },
    handleClassStart() {
      eventEmitter.trigger(eventEmitter.CLASS_START_TRIGGER);
    },
    swiperClick (params) {
      this.work = params
      this.mediaPlayer ? this.close() : this.open()
      console.log('111111', this.mediaPlayer);
      console.log('this.work', this.work);
    }
  },
};
</script>



<style lang="scss">
@import "./assets/iconfont/iconfont.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
    /* 清除浏览器默认边距 */
  * {
      margin: 0;
      padding: 0;
  }
   #main {
    width: 100%;
    height: 100%;
   }
  .wrap {
      display: flex;
      width: 100%;
      height: 100%;
      background: #11131A;
      .shousuo1 {
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 74px;
        line-height: 74px;
        background: #000000;
        opacity: 0.3;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }
  }
  .left {
    height: 100%;
    flex: 1;
    background: #11131a;
    position: relative;
    .main {
      height: calc(100% - 140px);
      width: 100%;
      padding: 2% 10%;
      position: relative;
      .start {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        width:100%;
        height:100%;
        display:block;
      }
    }
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 40px;
      background-color: #313847;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      align-items: center;
      font-size: 15px;
      color: #bdc6cf;
      z-index: 0;
    }
    .doc-manage {
      height: calc(100% - 40px);  
      position: absolute;
      right: 0%;
      top: 0%;
      // z-index: 100;
      display: flex;
      .doc-manage-icon {
        margin-top: 100px;
        flex:0 0 21px;
        width: 21px;
        height: 96px;
        background: #2D3342;
        border-radius: 4px 0px 0px 4px;
        cursor: pointer;
      }
      .doc-manage-main {
        flex: 1;
        position: relative;
        background: #313847;
        width: 160px;
        // height: 100%;
        padding-bottom: 100px;
        .title {
          padding: 10px 5px;
          color: #fff;
          font-size: 15px
        }
        .img-main {
          width: 150px;
          height: 94px;
          border: 1px solid #04AEFF;
          margin: 0 auto;
          background: #7F8B9D
        }
        .img-title {
          width: 167px;
          height: 23px;
          font-size: 12px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #04AEFF;
        }
        .doc-manage-upload {
          position: absolute;
          left: 6%;
          bottom: 20px;
          width: 178px;
          height: 38px;
        }
      }
    }
  }
  .right {
    position: relative;
    height: 100%;
    flex:0 0 0px;
    display: flex;
    .hu-dong {
      width: 260px;
      height: 100%;
      background: #313847;
      position: relative;
      flex: 1;
      .shousuo {
        position: absolute;
        top: 50%;
        left: 7%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 74px;
        line-height: 74px;
        background: #000000;
        opacity: 0.3;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }
    }  
  }
}
</style>
