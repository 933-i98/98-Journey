import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import useMainStore from "@/store/modules/main";
import { storeToRefs } from "pinia";
const mainStore = useMainStore()


class hyRequest {
    constructor(BASE_URL, TIMEOUT) {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: TIMEOUT,
        });
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading = true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading = false
            return res
        }, err => {
            mainStore.isLoading = false
            return err
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: "get" });
    }

    post(config) {
        return this.request({ ...config, method: "post" });
    }
}

export default new hyRequest(BASE_URL);
