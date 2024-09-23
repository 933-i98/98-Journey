<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 日期范围 -->
        <div class="section date-range bottom-gray-line" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">
                    共{{ stayDate }}晚
                </div>
            </div>
            <div class="end">
                <div class="date">
                    <span class="=tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" @confirm="onConfirm" />
        <!-- 价格/人选 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
        <div class="hot-suggest section">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item">{{ item.tagText.text }}</div>
            </template>
        </div>
        <!-- 搜索按钮 -->
        <div class="section search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import useCityStore from '@/store/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import { ref, computed } from 'vue'
import useHomeStore from '@/store/modules/home'
import useMainStore from '@/store/modules/main';



const router = useRouter()

const cityClick = () => {
    router.push('/city')
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log('获取位置成功：', res);
    }, err => {
        console.log('获取位置失败：', err);
    },)
}
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayDate = ref(getDiffDays(startDate.value, endDate.value))

const showCalendar = ref(false)
const onConfirm = (values) => {
    const selectStartDate = values[0]
    const selectEndDate = values[1]

    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate

    stayDate.value = getDiffDays(selectStartDate, selectEndDate)
    showCalendar.value = false
};


const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)


const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName,
        }
    })
}


</script>

<style scoped>
.search-box {
    --van-calendar-popup-height: 100%
}

.location {
    display: flex;
    align-items: center;
    height: 44px;

    .city {
        flex: 1;
        color: #333;
        font-size: 14px;

    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            font-size: 12px;
            top: 2px;
            position: relative;
            color: #666;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .item {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggest {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 14px;
        margin: 3px;
        color: #3f4954;
        background-color: #f1f3f5;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>