<template>
  <div id="message-panel">
    <!-- <div class="notice">
    </div> -->
    <div class="message-list">
    </div>
    <div v-show="isTeacher" class="xx">
      <el-switch @change="changeSwitch" v-model="value1" inactive-text="全体禁言" >
      </el-switch>    
    </div>
    <div class="message-sender">
    </div>
  </div>
</template>

<script>
import userRoleMap from './common/roleMap'
const auth = BJY.auth;
const store = BJY.store;
const eventEmitter = BJY.eventEmitter;

export default {
  data () {
    return {
      value1: false,
      stop: false,
      isTeacher: auth.isTeacher()
    }
  },
  methods: {
    changeSwitch () {
      var _this = this
      eventEmitter.trigger(eventEmitter.MESSAGE_SEND_FORBID_ALL_CHANGE_TRIGGER, {
        value: _this.value1,
      });
      eventEmitter.trigger(eventEmitter.SPEAK_APPLY_FORBID_ALL_CHANGE_TRIGGER, {
        value: _this.value1,
      });
    },
    stopSay () {
      var _this = this
      this.stop = !this.stop
      console.log('222222222222222');
      eventEmitter.trigger(eventEmitter.MESSAGE_SEND_FORBID_ALL_CHANGE_TRIGGER, {
        value: _this.stop,
      });
      eventEmitter.trigger(eventEmitter.SPEAK_APPLY_FORBID_ALL_CHANGE_TRIGGER, {
        value: _this.stop,
      });
      console.log(eventEmitter,' sss');
    }
  },
  created () {
    // 收到新消息时tab栏对应tab给出提示
    eventEmitter.on(
      eventEmitter.MESSAGE_RECEIVE,
      function (e, date) {
        var element = $('#btn-message-list')
        if (!element.hasClass('active')) {
          element.addClass('has-new')
        }
      }
    )
  },
  mounted () {
    // 公告
    // BJY.Notice.create({
    //   element: $('#message-panel .notice'), // 父容器
    //   replace: false,
    //   defaultContent: '这里空空如也...', // 默认无公告时显示文本
    //   maxLength: 140, // 公告文本最大长度
    //   contentPlaceholder: '请输入公告正文内容', // 公告文本编辑框提示
    //   linkPlaceholder: '请输入公告跳转链接（可选）', // 公告链接编辑框提示
    //   linkErrorHint: 'URL 格式错误', // url 错误提示
    //   canEdit: auth.isTeacher() || auth.isAssistant()
    // })
    // 创建消息列表组件
    BJY.MessageList.create({
      element: $('#message-panel .message-list'),
      renderEmoji: function (name, url) {
        if (BJY.isAlicloudImage(url)) {
          return '<img ondragstart="return false" src="' +
                        (url + '@100w_1e_1l.png') +
                        '" srcset="' +
                        (url + '@200w_1e_1l.png') +
                        ' 2x">'
        }
        return '<img ondragstart="return false" src="' + url + '">'
      },
      renderImage: function (url) {
        if (BJY.isAlicloudImage(url)) {
          return '<img ondragstart="return false" src="' +
                        (url + '@100w_1e_1l.png') +
                        '" srcset="' +
                        (url + '@200w_1e_1l.png') +
                        ' 2x">'
        }
        return '<img ondragstart="return false" src="' + url + '">'
      },
      renderUser: function (user, width, height) {
        return {
          id: user.id,
          name: user.name,
          number: user.number,
          // 头像需压缩
          avatar: BJY.compressImage({
            url: user.avatar,
            width: width,
            height: height
          }),
          avatar2x: BJY.compressImage({
            url: user.avatar,
            width: width * 2,
            height: height * 2
          }),
          // 根据用户类型，配置角色的英文和本地语言
          role: userRoleMap[user.type].en,
          localRole: userRoleMap[user.type].cn,
          type: user.type
        }
      },
      loadDistance: 0
    })
    // 创建消息发送组件
    BJY.MessageSender.create({
      element: $('#message-panel .message-sender'),
      canSendEmoji: true,
      canSendImage: true,
      multiline: true,
      messageMaxLength: 140,
      placeholder: '请输入...',
      emotionList: {
        emotionPerRow: 6,
        rowPerPage: 4
      },
      imageUploader: {
          action: '/web/doc/uploadChatFile',
          data: {
            room_id: store.get('class.id'),
            token: store.get('token')
          },
          fileName: 'Filedata'
      },
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
#message-panel {
  width: 100%;
  height: 100%;

  // .notice {
  //   position: absolute;
  //   top: 0;
  //   z-index: 1;
  //   background: #fff;
  //   width: 100%;
  //   border-top: 1px solid #ddd;
  // }

  .bjy-message-list {
    bottom: 130px;
    height: unset;
    top: 32px;
  }
  .xx {
    position: absolute;
    bottom: 132px;
    right: 10px;
    z-index: 9;
  }

  .bjy-message-sender {
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
  .el-switch__label {
    color: #fff;
  }
  .bjy-send-emoji {
    background: none;
    color: #FFCA36;
    border: 0px;
  }
  .bjy-send-image {
    background: none;
    // color: #FFCA36;
    border: 0px;
  }
  .bjy-message-list {
    background: #262C38 !important;
    bottom: 163px;
    top: 0px;
  }
  .bjy-input {
    color: #fff;
    border: 1px solid #6E7583;
    border-radius: 4px;
  }
  .message-sender {
    padding: 10px;
    background: #313847;
    border: 1px solid #474F5D;
    border-radius: 4px;
  }
}
</style>
