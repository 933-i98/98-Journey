<template>
    <div class="home">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar />
        </div>
        <home-content />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useHomeStore from '@/store/modules/home'
import homeNavBar from './cpns/home-nav-bar.vue'
import homeSearchBox from './cpns/home-search-box.vue'
import hyRequest from '@/service/request/index'
import homeCategories from '../home/cpns/home-categories.vue'
import homeContent from '../home/cpns/home-content.vue'
import useScroll from '@/hooks/useScroll'
import SearchBar from '@/components/search-bar/search-bar.vue'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
    }
})

const isShowSearchBar = ref(false)
watch(scrollTop, (newTop) => {
    isShowSearchBar.value = newTop > 400
})


</script>

<style scoped>
.home {
    padding-bottom: 50px;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    z-index: 9;

}
</style>