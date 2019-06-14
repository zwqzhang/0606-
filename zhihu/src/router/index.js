import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import index from '../components/pages/index'
import detail from '../components/pages/detail'
import list from '../components/pages/list'
import comment from '../components/pages/comment'
import collect from '../components/pages/collect'
export default new Router({
    routes: [
        {
            path: '/index',
            component: index,
        },
        {
            path: '/detail/:id',
            component: detail
        },
        {
            path: 'list/:time',
            component: list
        },{
            path:'/comment/:id',
            component:comment
        },
        {
            path:'/collect',
            component:collect
        },
        {
            path:"*",
            redirect:'/index'
        }
    ]
})