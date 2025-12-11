import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import CITC from '@/views/CITC.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: App,
    },
    {
        path: '/CITC',
        name: 'CITC',
        component: CITC,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
