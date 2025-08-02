<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'event-detail' }">Details</RouterLink> |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>
