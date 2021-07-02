
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Loggin',
    name: 'Loggin',
    component: () =>import('../views/loggin/Loggin.vue'),
    meta: {
      title: '登陆页面',
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () =>import('../views/register/Register.vue'),
    meta: {
      title: '注册页面',
    }
  },
  {
    path:'',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          index:'/'
          
        }
      },
      {
        path: '/Form',
        name: 'Form',
        component: () =>import('../views/forms/Forms.vue'),
        meta: {
          title: '导出excil',
          index:'/Form'
        }

      },
      {
        path:'/Lebel',
        name:'Lebel',
        component:() =>import('../views/label/Label.vue'),
        meta:{
          title:'表格',
          index:'/Lebel'
        }
      },
      {
        path:'/Release',
        name:'Release',
        component:() =>import('../views/release/Release.vue'),
        meta: {
          title: '发布文章',
          index:'/Lebel'
        }
      },
      {
        path:'/Statistics',
        name:'Statistics',
        component:() =>import('../views/statistics/Statistics.vue'),
        meta: {
          title: '统计页',
          index:'/Statistics'
        }
      },
      {
        path:'/Updata',
        name:'Updata',
        component:() =>import('../views/updata/Updata.vue'),
        meta: {
          title: '上传',
          index:'/Updata'
        }
      },
      {
        path:'/Edit',
        name:'Edit',
        component:() =>import('../views/edit/Edit.vue'),
        meta: {
          title: '编辑',
          index:'/Published',
        }
      },
      {
        path:'/Looking',
        name:'Looking',
        component:() =>import('../views/looking/Looking.vue'),
        meta: {
          title: '查找',
          index:'/Published',
        }
      },
      {
        path:'/Published',
        name:'Published',
        component:() =>import('../views/published/Published.vue'),
        meta: {
          title: '发布',
          index:'/Published',
        }
      },
      {
        path:'/Outnter',
        name:'Outnter',
        component:() =>import('../views/outnter/Outnter.vue'),
        meta: {
          title: '退出',
          index:'/Outnter'
        }
      },
    ]
  },
  {
    path: '*',
    component: () => import('../views/404/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 为了赋值标题
  document.title = to.meta.title
  let user = localStorage.getItem('user1')
  if (to.path === '/Loggin' || to.path ==='/Register') {
    next()
  } else {
    user ? next() : next('/Loggin')
  }
})

export default router
