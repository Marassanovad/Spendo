import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Categories from "@/views/Categories.vue";
import About from "@/views/About.vue";


const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/about', name: 'About', component: About}
]

export default createRouter({
    history: createWebHistory(),
    routes
})