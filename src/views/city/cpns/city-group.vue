<template>
    <div class="city-group">
        <van-index-bar :index-list="indexList">
            <van-index-anchor index="热门"></van-index-anchor>
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
                </template>
            </div>

            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group"></van-index-anchor>
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import useCityStore from '@/store/modules/city';
import { computed } from 'vue'
import { useRouter } from 'vue-router';

const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})

const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
    //选中当前城市
    cityStore.currentCity = city

    //返回上一级
    router.back()
}

</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 10px;
    padding-right: 25px;


    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        background-color: #fff4ec;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        margin: 6px 0;
    }
}
</style>