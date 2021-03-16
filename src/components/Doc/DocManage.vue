<template>
  <div v-show="visible" id="doc-manage">
    <div id="bjy-document-manage"></div>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

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
  },
  created() {
  },
  mounted() {
    // 上传文件最大字节
    var MAXSIZE = 1000000 * 5;
    // 创建文档管理组件
    BJY.DocumentManage.create({
      // 父容器
      element: $('#bjy-document-manage'),
      // 文档操作按钮是图标还是文字
      needIconButton: true,
      canPreviewFile: true,
      allowLoginCloudDisk: true,
      canUploadZipFile: true,
      hasCloudTab: true,
      hasHomeworkTab: true,
      needIconButton: true,


      // 上传文件最大字节
      maxSize: MAXSIZE,
      // 上传失败回调
      onFileUploadFail: function (data) {
          // data.isPPT 上传的文件是否是 PPT
          alert('上传失败');
      },
      // 文件大小错误
      onFileSizeError: function (data) {
          // data.isPPT 上传的文件是否是 PPT
          alert('上传文件太大');
      },
      // 文件类型错误
      onFileTypeError: function (data) {
          // data.isPPT 上传的文件是否是 PPT
          alert('文件类型错误');
      },
      // 文件名错误
      onFileNameError: function (data) {
          // data.isPPT 上传的文件是否是 PPT
          alert('文件名错误');
      },
      // 点击文件 item 回调
      onFileItemClick: function (data) {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('111111222222222222222211222222222');
      },
      onMediaFileOpenClick: function () {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('22222222');
      },
      onFilePreviewClick: function () {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('33333333');
      },
      onFileOpenClick: function () {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('444444444');
      },
      onTabChange: function () {
          // data.index  文档在列表中的索引
          // data.doc 文档对象
          console.log('444444444');
      },
      // onDocDeleteClick: function () {
      //     // data.index  文档在列表中的索引
      //     // data.doc 文档对象
      //     console.log('55555555');
      // },
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
  background-color: #fff;
}
</style>
