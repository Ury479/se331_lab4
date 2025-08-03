<script setup lang="ts">
import { type Event } from '@/types'
import { RouterLink } from 'vue-router'

defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink :to="{ name: 'event-layout-view', params: { id: event.id } }" class="event-link">
    <div class="event-card">
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
      <p><strong>Category:</strong> {{ event.category }}</p>
      <p><strong>Organizer:</strong> {{ event.organizer }}</p>
    </div>
  </RouterLink>
</template>

<style scoped> 
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  }
  .event-link {
    text-decoration: none;
  }

</style>