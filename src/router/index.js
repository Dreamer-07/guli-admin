import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: 'Table', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    name: 'Teacher',
    meta: {title: '????????????', icon: 'example'},
    children: [
      {
        path: 'index',
        name: 'TeacherIndex',
        component: () => import('@/views/edu/teacher/index'),
        meta: {title: '????????????', icon: 'table'}
      },
      {
        path: 'save',
        name: 'TeacherSave',
        component: () => import('@/views/edu/teacher/saveOrUpdate'),
        meta: {title: '????????????', icon: 'table'}
      },
      {
        path: 'edit/:id',
        name: 'TeacherEdit',
        component: () => import('@/views/edu/teacher/saveOrUpdate'),
        meta: {title: '????????????', icon: 'table'},
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/index',
    name: 'Subject',
    meta: {title: '????????????', icon: 'example'},
    children: [
      {
        path: 'index',
        name: 'SubjectIndex',
        component: () => import('@/views/edu/subject/index'),
        meta: {title: '????????????', icon: 'table'}
      },
      {
        path: 'save',
        name: 'SubjectSave',
        component: () => import('@/views/edu/subject/save'),
        meta: {title: '????????????', icon: 'table'}
      }
    ]
  },
  {
    path: '/sta/daily',
    component: Layout,
    redirect: '/sta/daily/chart',
    name: 'StaDaily',
    meta: {title: '????????????', icon: 'example'},
    children: [
      {
        path: 'chart',
        name: 'StaDailyChart',
        component: () => import('@/views/sta/daily/chart'),
        meta: {title: '????????????', icon: 'table'}
      },
      {
        path: 'create',
        name: 'StaDailyCreate',
        component: () => import('@/views/sta/daily/create'),
        meta: {title: '????????????', icon: 'table'}
      }
    ]
  },
  {
    path: '/edu/course',
    component: Layout,
    redirect: '/course/index',
    name: 'Course',
    meta: {title: '????????????', icon: 'example'},
    children: [
      {
        path: 'index',
        name: 'CourseIndex',
        component: () => import('@/views/edu/course/index'),
        meta: {title: '????????????', icon: 'table'}
      },
      {
        path: 'info',
        name: 'CourseInfo',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '??????????????????', icon: 'table'}
      },
      {
        path: 'info/:courseId?',
        name: 'CourseInfo',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '??????????????????', icon: 'table'},
        hidden: true
      },
      {
        path: 'chapter/:courseId',
        name: 'CourseChapter',
        component: () => import('@/views/edu/course/chapter'),
        meta: {title: '??????????????????', icon: 'table'},
        hidden: true
      },
      {
        path: 'publish/:courseId',
        name: 'CourseInfo',
        component: () => import('@/views/edu/course/publish'),
        meta: {title: '??????????????????', icon: 'table'},
        hidden: true
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {title: 'menu2'}
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //??????????????????
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
