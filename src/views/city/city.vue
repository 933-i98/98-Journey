<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import useCityStore from '@/store/modules/city';
import CityGroup from './cpns/city-group.vue'


const router = useRouter()
const searchValue = ref('')
const cancelClick = () => {
    router.back()
}
const tabActive = ref()

const cityStore = useCityStore()
const { allCity } = storeToRefs(cityStore)
cityStore.fetchAllCityData()

const currentGroup = computed(() => allCity.value[tabActive.value])


</script>

<template>
    <div class="city">
        <div class="top">
            <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCity" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <template v-for="(value, key, index) in allCity">
                <city-group v-show="tabActive === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.city {
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }

    .top {
        position: relative;
        z-index: 9;
    }
}
</style>