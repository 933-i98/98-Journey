<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control :titles="titles" v-if="showTabControl" class="tabs" @itemClick="tabClick" />
    <van-nav-bar title="房屋详情" left-text="旅途" :left-arrow="true" @click-left="onClickLeft" />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos name="描述" :top-infos="mainPart.topModule" :ref="getSectionRef" />
      <detail-facility name="设施" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
        :ref="getSectionRef" />
      <detail-landlord name="房东" :landlord="mainPart.dynamicModule.landlordModule" :ref="getSectionRef" />
      <detail-comment name="评论" :comment="mainPart.dynamicModule.commentModule" :ref="getSectionRef" />
      <detail-notice name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" :ref="getSectionRef" />
      <detail-map name="地图" :position="mainPart.dynamicModule.positionModule" :ref="getSectionRef" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/service/modules/detail.js'
import { ref, computed } from 'vue'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import TabControl from '@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll'


const route = useRoute()
const router = useRouter()
const onClickLeft = () => router.back()
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

const sectionEls = ref({})
const titles = computed(() => {
  return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if (index !== 0) {
    instance = instance - 44
  }

  detailRef.value.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 11;
  top: 0;

}


.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>