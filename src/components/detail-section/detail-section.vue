<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
        </div>
        <div class="content">
            <slot>
                <h3></h3>
            </slot>
        </div>
        <div class="footer" v-if="moreText.length">
            <span class="more">{{ moreText }}</span>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: '默认标题'
    },
    moreText: {
        type: String,
        default: ''
    }
})


</script>

<style lang="less" scoped>
.section {
    border-top: 4px solid #f2f3f4;
    padding: 0 15px;
    margin-top: 12px;
    background-color: #fff;

    .header {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;

        .title {
            font-size: 20px;
            color: #333;
        }
    }

    .content {
        padding: 8px 0;
    }

    .footer {
        display: flex;
        justify-content: flex-end;
        height: 44px;
        line-height: 44px;
        color: #ff9645;
        font-size: 14px;
        font-weight: 600;
        align-items: center;
    }
}
</style>
