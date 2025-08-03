import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import EventListView from '@/views/EventListView.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import DetailView from '@/views/event/DetailView.vue'
import EditView from '@/views/event/EditView.vue'
import RegisterView from '@/views/event/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NotFoundResourceView from '@/views/404ResourceView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import PassengerListView from '@/views/PassengerListView.vue'
import AirlineDetailView from '@/views/AirlineDetailView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

// ✅ 正确地声明 routes（你原始内容无改动）
const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventListView,
    props: (route: any) => ({ page: parseInt(route.query.page as string) || 1 })
  },
  {
    path: '/passengers',
    name: 'passenger-list',
    component: PassengerListView,
    props: (route: any) => ({ page: parseInt(route.query.page as string) || 0 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/event/:id',
    name: 'event-layout-view',
    component: LayoutView,
    props: true,
    beforeEnter: (to: RouteLocationNormalized) => {
      const id = parseInt(to.params.id as string)
      const eventStore = useEventStore()
      return EventService.getEvent(id)
          .then((response) => {
            // need to setup the data for the event
            eventStore.setEvent(response.data)
          }).catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
    },
    children: [
      {
        path: '',
        name: 'event-detail',
        component: DetailView
      },
      {
        path: 'edit',
        name: 'event-edit',
        component: EditView
      },
      {
        path: 'register',
        name: 'event-register',
        component: RegisterView
      }
    ]
  },
  {
    path: '/airline/:airlineId',
    name: 'airline-detail',
    component: AirlineDetailView,
    props: true
  },
  {
    path: '/network-error',
    name: 'network-error-view',
    component: NetworkErrorView
  },
  {
    path: '/404/:resource',
    name: '404-resource-view',
    component: NotFoundResourceView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView
  }
]

// ✅ createRouter 调用结构修复，仅插入 routes 和 scrollBehavior
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {top:0}
    }
  }
})

// 添加全局进度条
router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
