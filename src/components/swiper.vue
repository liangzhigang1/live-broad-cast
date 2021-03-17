 <template>
  <div style="position: relative;width: 100%" class="swiper-container1">
    <div style="position:relative" class="right-left-base-info-content">
            <swiper ref="mySwipe1r" :options="swiperOptions">
              <swiper-slide v-for="(item, index) in workList" :key="index">
                <div @click="showWork(item)" style="background: pink;height: 140px;width: 100%">
                  <span v-if="item.type == 'ppt'">ppt</span>
                  <span v-if="item.type == 'png'">png</span>
                  <span v-if="item.type == 'mp3'">mp3</span>
                  <span v-if="item.type == 'mp4'">mp4</span>
                </div>
              </swiper-slide>
              
            </swiper>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/swiper-bundle.css";
import 'swiper/swiper.scss'

export default {
  name: "PortalSetting",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar"
        },
        watchSlidesProgress: true,
        grabCursor: true,
        parallax: true,
        uniqueNavElements: false,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            //当屏幕宽度大于等于320
            slidesPerView: 6,
            spaceBetween: 10
          },
          1080: {
            //当屏幕宽度大于等于768
            slidesPerView: 6,
            spaceBetween: 10
          },
          1280: {
            //当屏幕宽度大于等于320
            slidesPerView: 5,
            spaceBetween: 10
          },
          1570: {
            //当屏幕宽度大于等于768
            slidesPerView: 5,
            spaceBetween: 10
          },
          1864: {
            //当屏幕宽度大于等于1280
            slidesPerView: 6,
            spaceBetween: 10
          }
        }
      },
      workList: [
        {studentName: '张三', type: 'ppt', src: '../assets/img/大数据监控大屏参考.pptx'},
        {studentName: '李四', type: 'png', src: '../assets/img/8.png'},
        {studentName: '王五', type: 'mp3', src: '../assets/img/dfh.mp3'},
        {studentName: '赵六', type: 'mp4', src: '../assets/img/exampleobject.mp4'},
      ]
    };
  },
  methods: {
    showWork (item) {
      console.log('11111', item);
      this.$emit('swiperClick', item)
    }
  }
};
</script>
<style lang="scss" >

</style>
