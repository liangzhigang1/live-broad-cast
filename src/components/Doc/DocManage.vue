<template>
  <div v-show="visible" id="doc-manage">
    <div style="position: relative">
      <div @click="visible = false" style="cursor: pointer;position: absolute;top: 5px;right: 8px;z-index: 10;">
        <i style="font-size: 20px;color: #9fa8b5;font-weight: 700" class="el-icon-close"></i>
      </div>
    </div>
    <div id="bjy-document-manage"></div>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;
import { _bindDocApi, _deleteDocApi } from '../../api/doc/docApi'
let store = BJY.store;

export default {
  components: {},
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    swap(presenterCameraNode, whiteboardNode) {
      var presenterCameraParentNode = presenterCameraNode.parentNode;
      var whiteboardParentNode = whiteboardNode.parentNode;
      var presenterCameraPlaceholder = document.createElement("div");
      var whiteboardPlaceholder = document.createElement("div");

      presenterCameraParentNode.insertBefore(
        presenterCameraPlaceholder,
        presenterCameraNode
      );
      whiteboardParentNode.insertBefore(whiteboardPlaceholder, whiteboardNode);

      whiteboardNode &&
        presenterCameraParentNode.insertBefore(
          whiteboardNode,
          presenterCameraPlaceholder
        );
      presenterCameraNode &&
        whiteboardParentNode.insertBefore(presenterCameraNode, whiteboardPlaceholder);

      presenterCameraParentNode.removeChild(presenterCameraPlaceholder);
      whiteboardParentNode.removeChild(whiteboardPlaceholder);
    },
    // 切换ppt与主讲视频位置，如需同步切换，可通过自定义信令实现
    pptVideoSwitch() {
      const presenterDom = $(".bjy-player-theme-default")[0];
      const whiteboardDom = $(".bjy-whiteboard")[0];
      this.swap(presenterDom, whiteboardDom);
      eventEmitter.trigger(eventEmitter.WINDOW_RESIZE);
    },
  },
  created() {
    eventEmitter
      .on(eventEmitter.DOC_REMOVE, (event, data) => {
        console.log('1', data);
        // BJY.DocumentManage.methods.deleteDoc(data)
        BJY.Catalogue.methods.getCurrentFileIndex(data.number)
      }).
      on(eventEmitter.DOC_ATTACH_REQ, (event, data) => {
        console.log('2', data);
        // BJY.DocumentManage.methods.deleteDoc(data)
        // BJY.Catalogue.methods.getCurrentFileIndex(data.number)
      }).
      on(eventEmitter.DOC_IMAGE_LOAD_END, (event, data) => {
        console.log('10', data);
        console.log('111111', event);

        // BJY.DocumentManage.methods.deleteDoc(data)
        // BJY.Catalogue.methods.getCurrentFileIndex(data.number)
      })
  },
  mounted() {
    console.log('eventEmitter', eventEmitter);
    var _this = this;
    // 上传文件最大字节
    var MAXSIZE = 1000000 * 5;
    // 创建文档管理组件
    BJY.DocumentManage.create({
      // 父容器
      element: $('#bjy-document-manage'),
      // 文档操作按钮是图标还是文字
      // needIconButton: true,
      // canPreviewFile: true,
      // allowLoginCloudDisk: true,
      // canUploadZipFile: true,
      // hasCloudTab: true,
      // hasHomeworkTab: true,
      // needIconButton: true,


      // 上传文件最大字节
      maxSize: MAXSIZE,
      // 上传失败回调
      // onFileUploadFail: function (data) {
      //     // data.isPPT 上传的文件是否是 PPT
      //     alert('上传失败');
      // },
      // // 文件大小错误
      // onFileSizeError: function (data) {
      //     // data.isPPT 上传的文件是否是 PPT
      //     alert('上传文件太大');
      // },
      // // 文件类型错误
      // onFileTypeError: function (data) {
      //     // data.isPPT 上传的文件是否是 PPT
      //     alert('文件类型错误');
      // },
      // // 文件名错误
      // onFileNameError: function (data) {
      //     // data.isPPT 上传的文件是否是 PPT
      //     alert('文件名错误');
      // },
      // // 点击文件 item 回调
      // onFileItemClick: function (data) {
      //     // data.index  文档在列表中的索引
      //     // data.doc 文档对象
      //     console.log('111111222222222222222211222222222');
      // },
      // onMediaFileOpenClick: function () {
      //     // data.index  文档在列表中的索引
      //     // data.doc 文档对象
      //     console.log('22222222');
      // },
      // onFilePreviewClick: function () {
      //     // data.index  文档在列表中的索引
      //     // data.doc 文档对象
      //     console.log('33333333');
      // },
      onFileOpenClick: function (data) {
        // data.index  文档在列表中的索引
        // data.doc 文档对象
        console.log('4444444444', data);
        console.log('444444444', store.get("class.xx"));
        if (store.get("class.xx") == true) {
          _this.pptVideoSwitch();
        }
        store.set("class.xx", false);

        // let xx = `fid=${data.id}&partner_id=83228320&room_id=21032159047031&timestamp=1615996147&partner_key=dBn3oMMrE68/kijw20wg6JGHWGUcUkwh2Fi57N9r26v4R3QbWYQ66/IUchj/pyzlKM9l1WjgNEnLqCWFc2Lzvtp6xhlI`
        // console.log('12312312', _this.$md5(xx))
        // let sign = _this.$md5(xx)
        // let params = { partner_id: 83228320, room_id: 21032159047031, fid: data.id, timestamp: 1615996147, sign: sign}
        // _bindDocApi(params).then((response) => {
        //   console.log('response' , response);
        // })
        // eventEmitter.trigger(eventEmitter.DOC_FIT_CHANGE_TRIGGER)
        // eventEmitter.trigger(eventEmitter.DOC_ALL_REQ);
        // BJY.Catalogue.changeSize()

        // eventEmitter.trigger(eventEmitter.WINDOW_RESIZE);
        // BJY.Catalogue.methods.getCurrentFileIndex(data.number)
        // console.log('BJY.Catalogue', BJY.Catalogue.methods.changePage(data,data));
        console.log('BJY.DocumentManage', BJY.DocumentManage.methods.deleteDoc(data));
      },
      // onTabChange: function () {
      //     // data.index  文档在列表中的索引
      //     // data.doc 文档对象
      //     console.log('444444444');
      // },
      // onFilePreviewClick: function (params) {
      //   console.log('111131231231231231231231333', params);
      // },
      onDocDeleteClick: function (data) {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('55555555', data);
          let xx = `fid=${data.doc.id}&partner_id=83228320&room_id=21032159047031&timestamp=1615996147&partner_key=dBn3oMMrE68/kijw20wg6JGHWGUcUkwh2Fi57N9r26v4R3QbWYQ66/IUchj/pyzlKM9l1WjgNEnLqCWFc2Lzvtp6xhlI`
          console.log('12312312', _this.$md5(xx))
          let sign = _this.$md5(xx)
          let params = { partner_id: 83228320, room_id: 21032159047031, fid: data.doc.id, timestamp: 1615996147, sign: sign}
          _deleteDocApi(params).then((response) => {
            console.log('response' , response);
          })
      },
    });
    setTimeout(() => {
      console.log('BJY.DocumentManage', BJY.DocumentManage);
    }, 1000);
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
#doc-manage {
  position: fixed;
  left: 50%;
  top: 50%;
  height: 600px;
  width: 600px;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  z-index: 11110;
  background-color: red;
  // background: #2B313E !important;
}
.bjy-document-manage {
  background: #2B313E !important;
}
.bjy-header {
  background: #2B313E !important;
}
.bjy-body {
  background: #2B313E !important;
}
.bjy-document-selected-header {
  background: #2B313E !important;
}
.bjy-document-selected {
  border: 0px !important;
  border-radius: 0px !important;
}
.bjy-document-list {
  background: #2B313E !important;
  color: #fff;
}
.bjy-document-item {
  color: #fff !important;
}
.bjy-search-input {
  color: #fff !important;
}
.local-upload {
  background: #2B313E !important;
}
.bjy-btn-upload {
  color: #fff !important;
}
</style>
