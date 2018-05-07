import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/user/login.vue'
import Register from '@/views/user/register.vue'
import modify from '@/views/user/modify_pwd.vue'
import index from '@/views/index/index.vue'

// 网上课程
import course from '@/views/course/index.vue'
import courseIndex from '@/views/course/course_homePage.vue'
import publishOnlineCourse from '@/views/course/publish_course.vue'
import courseDetail from '@/views/course/course_detail.vue'

// 信息预览
import info from '@/views/info/index.vue'
import infoIndex from '@/views/info/info_homePage.vue'
import publishArticle from '@/views/info/publish_article.vue'
import publishNotice from '@/views/info/publish_notice.vue'
import publishCourse from '@/views/info/publish_course.vue'
import articleDetail from '@/views/info/article_detail.vue'
import infoCourseDetail from '@/views/info/course_detail.vue'

// 讨论区
import discuss from '@/views/discuss/index.vue'
import discussHomePage from '@/views/discuss/discuss_homePage.vue'
import publishDiscuss from '@/views/discuss/publish_discuss.vue'
import discussDetail from '@/views/discuss/discuss_detail.vue'

// 资源购买
import resource from '@/views/resource/resource.vue'
import shopCar from '@/views/resource/buy_list.vue'


Vue.use(Router)

const router = new Router({
    routes: [
        // 首页
        { path: '/', name: 'index', component: index },
        // 登录页
        { path: '/login', name: 'login', component: Login },
        // 注册页
        { path: '/register', name: 'register', component: Register },
        // 找回密码
        { path: '/modify', component: modify },
        // 网络课程页面
        { path: '/course', name: 'course', component: course, redirect: '/course/courseIndex',
            children: [
                { path: '/courseIndex', component: courseIndex, alias: '/course/courseIndex' },
                { path: '/publishOnlineCourse', component: publishOnlineCourse, alias: '/course/publishOnlineCourse' },
                { path: '/courseDetail', component: courseDetail, alias: '/course/courseDetail' }
            ]
        },
        // 信息浏览页面
        { path: '/info', name: 'info', component: info, redirect: '/info/infoIndex',
            children: [
                { path: '/infoIndex', component: infoIndex, alias: '/info/infoIndex' },
                { path: '/publishArticle', component: publishArticle, alias: '/info/publishArticle' },
                { path: '/publishNotice', component: publishNotice, alias: '/info/publishNotice' },
                { path: '/publishCourse', component: publishCourse, alias: '/info/publishCourse' },
                { path: '/articleDetail', component: articleDetail, alias: '/info/articleDetail' },
                { path: '/infoCourseDetail', component: infoCourseDetail, alias: '/info/infoCourseDetail' }
            ]
        },
        // 讨论区
        { path: '/discuss', name: 'discuss', component: discuss, redirect: '/discuss/discussIndex',
            children: [
                { path: '/discussIndex', component: discussHomePage, alias: '/discuss/discussIndex' },
                { path: '/publishDiscuss', component: publishDiscuss, alias: '/discuss/publishDiscuss' },
                { path: '/discussDetail', component: discussDetail, alias: '/discuss/discussDetail' }
            ]
        },
        // 资源购买页面s
        { path: '/resource', name: 'resource', component: resource },
        { path: '/shopCar', component: shopCar }
    ]
})
export default router