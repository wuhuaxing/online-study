import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/user/login.vue'
import Register from '@/views/user/register.vue'
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


Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', name: 'index', component: index },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/course', name: 'course', component: course, redirect: '/course/courseIndex',
            children: [
                { path: '/courseIndex', component: courseIndex, alias: '/course/courseIndex' },
                { path: '/publishOnlineCourse', component: publishOnlineCourse, alias: '/course/publishOnlineCourse' },
                { path: '/courseDetail', component: courseDetail, alias: '/course/courseDetail' }
            ]
        },
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
        { path: '/discuss', name: 'discuss', component: discuss, redirect: '/discuss/discussIndex',
            children: [
                { path: '/discussIndex', component: discussHomePage, alias: '/discuss/discussIndex' },
                { path: '/publishDiscuss', component: publishDiscuss, alias: '/discuss/publishDiscuss' },
                { path: '/discussDetail', component: discussDetail, alias: '/discuss/discussDetail' }
            ]
        },
        { path: '/resource', name: 'resource', component: resource },
    ]
})


// router.beforeEach((to, from, next) => {
//     // console.log(to);
//     if (to.path.indexOf('login') < 0 && !window.sessionStorage.getItem('access_token')) {
//         router.replace('login');
//         next();
//     }
//     next();
// })

export default router