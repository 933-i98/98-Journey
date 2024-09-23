import { onMounted, onUnmounted, ref } from 'vue'

export default function useScroll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    const scrollTop = ref(0)
    const clientHeight = ref(0)
    const scrollHeight = ref(0)

    const scrollListenerHandler = () => {
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            isReachBottom.value = true
        }
    }

    onMounted(() => {
        if (elRef) { el = elRef.value }
        el.addEventListener('scroll', scrollListenerHandler)
    })

    onUnmounted(() => {
        el.removeEventListener('scroll', scrollListenerHandler)
    })

    return { isReachBottom, scrollTop, clientHeight, scrollHeight }
}