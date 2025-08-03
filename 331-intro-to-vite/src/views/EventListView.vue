<script setup lang="ts">
import { type Event } from '@/types'
import {ref, computed, watchEffect, onMounted} from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import nProgress from 'nprogress'
import router from "@/router";

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const perPage = 3

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  // const totalPages = Math.ceil(totalEvents.value / perPage)
  // lab4 Q5.1 修改分页设置
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

const page = computed(() => props.page)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvent(3,page.value)
        .then((response) => {
          events.value = response.data
          totalEvents.value = response.headers['x-total-total']
        })
  })
})

watchEffect(() => {
  nProgress.start()

  // 历史代码
  // 添加一个小延迟来确保进度条可见
  setTimeout(() => {
    EventService.getEvents(perPage, page.value)
        .then((response) => {
          events.value = response.data
          const total = response.headers['x-total-count']
          totalEvents.value = total ? parseInt(total) : 0
        })
        .catch((error) => {
          console.error('There was an error!', error)
          router.push({name:'network-error-view'})
        })
        .finally(() => {
          nProgress.done()
        })
  }, 100)
})
</script>

<template>
  <section>
    <h2>Events - Page {{ page }}</h2>

    <div class="events">
      <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
      />
    </div>

    <div class="pagination">
      <RouterLink
          id="page-prev"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page !== 1"
      >
        ← Prev Page
      </RouterLink>

      <RouterLink
          id="page-next"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
      >
        Next Page →
      </RouterLink>
    </div>

  </section>
</template>

<style scoped>
.pagination {
  display: flex;
  width: 290px;
  justify-content: space-between;
  margin-top: 1rem;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>

