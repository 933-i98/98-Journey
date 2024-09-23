import { defineStore } from "pinia";
import hyRequest from '@/service/request/index'
import { getHomeCategories, getHomeHotSuggests, getHomeHouselist } from "@/service";

const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],
        houselist: [],
        currentPage: 1
        //其实是下一次请求时的页码
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }

})

export default useHomeStore