<script setup lang="ts">
import type { Passenger } from '@/types'

defineProps<{
  passenger: Passenger
}>()
</script>

<template>
  <div class="passenger-card">
    <h3>{{ passenger.name }}</h3>
    <p><strong>Trips:</strong> {{ passenger.trips }}</p>
    <p><strong>Airlines:</strong> {{ passenger.airline.length }}</p>
  </div>
</template>

<style scoped> 
  .passenger-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  .passenger-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  }
  .passenger-link {
    text-decoration: none;
    color: inherit;
  }
</style>
