<template>
    <!-- <div class="tab-bar">
        <template v-for="(item, index) in tabbarData" :key="index">
            <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(index, item)">
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
</div> -->

    <van-tabbar route active-color="#ff9645">
        <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/favor" icon="like-o">收藏</van-tabbar-item>
        <van-tabbar-item to="/order" icon="orders-o">订单</van-tabbar-item>
        <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
    </van-tabbar>

</template>

<script setup>
// import tabbarData from '@/assets/data/tabbar'
// import { getAssetURL } from '@/utils/load_assets'
// import { ref } from 'vue';
// import { useRouter } from 'vue-router';

// const currentIndex = ref(0)
// const router = useRouter()
// const itemClick = (index, item) => {
//     currentIndex.value = index
//     router.push(item.path)
// }


</script>

<style lang="less" scoped>
// .tab-bar {
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 50px;
//     display: flex;
//     border-top: 1px solid #f3f3f3;

//     .tab-bar-item {
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;

//         &.active {
//             color: var(--primary-color);
//         }

//         .text {
//             font-size: 12px;
//         }

//         img {
//             width: 36px;
//         }
//     }
// }</style>