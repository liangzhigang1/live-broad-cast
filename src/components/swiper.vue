 <template>
  <div style="position: relative;width: 100%" class="swiper-container1">
    <div style="position:relative" class="right-left-base-info-content">
            <swiper ref="mySwipe1r" :options="swiperOptions">
              <swiper-slide v-for="(item, index) in [1,2,3,4,5,6,7,8]" :key="index">
                <div style="background: pink;height: 140px;width: 100%">
                  {{ item }}
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
    };
  },
};
</script>
<style lang="scss" >

</style>
