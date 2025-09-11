<script setup lang="ts">
import { type Event } from '@/types'
import {ref, computed, watchEffect} from 'vue'
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

const perPage = 2

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage)
  return page.value < totalPages
})

const page = computed(() => props.page)

watchEffect(() => {
  console.log('EventListView: Page changed to:', page.value)
  // 移除这里的 nProgress，因为路由中已经有全局的进度条
  EventService.getEvents({ _limit: perPage, _page: page.value })
      .then((response) => {
        console.log('EventListView: Received data:', response.data)
        console.log('EventListView: Headers:', response.headers)
        events.value = response.data
        const total = response.headers['x-total-count']
        totalEvents.value = total ? parseInt(total) : 0
        console.log('EventListView: Total events set to:', totalEvents.value)
      })
      .catch((error) => {
        console.error('There was an error!', error)
        router.push({name:'network-error-view'})
      })
})
</script>

<template>
  <section>
    <h1>Event For Good</h1>
    <div class="flex flex-col items-center">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination"></div>
    </div>

    <h2>Events - Page {{ page }}</h2>
    <p>Debug: Current page = {{ page }}, Total events = {{ totalEvents }}, Has next = {{ hasNextPage }}</p>

<!--    <div class="events" v-if="events && events.length > 0">-->
<!--      <EventCard-->
<!--          v-for="event in events"-->
<!--          :key="event.id"-->
<!--          :event="event"-->
<!--      />-->
<!--    </div>-->
<!--    -->
<!--    <div v-else-if="events && events.length === 0">-->
<!--      <p>No events found on this page.</p>-->
<!--    </div>-->
<!--    -->
<!--    <div v-else>-->
<!--      <p>Loading events...</p>-->
<!--    </div>-->

    <!-- 保留翻页功能-->
    <div class="pagination">
      <RouterLink
          id="page-prev"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page !== 1"
          class="page-link"
      >
        ← Prev Page
      </RouterLink>

      <RouterLink
          id="page-next"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          class="page-link"
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
  margin: 2rem auto;
  padding: 1rem;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
  transition: all 0.2s;
}

.pagination a:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}
</style>

