<script setup lang="ts">
import { type Passenger } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService'

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const perPage = 10
const page = computed(() => props.page)
const passengers = ref<Passenger[] | null>(null)
const totalPassengers = ref(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassengers.value / perPage)
  return page.value < totalPages - 1
})

watchEffect(() => {
  passengers.value = null
  PassengerService.getPassengers(page.value, perPage)
      .then((response) => {
        passengers.value = response.data.data
        totalPassengers.value = response.data.totalPassengers || 0
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
})
</script>

<template>
  <section>
    <h2>Passengers - Page {{ page + 1 }}</h2>

    <div class="passengers">
      <PassengerCard
          v-for="passenger in passengers"
          :key="passenger._id"
          :passenger="passenger"
      />
    </div>

    <div class="pagination">
      <RouterLink
          id="page-prev"
          :to="{ name: 'passenger-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page !== 0"
      >
        ← Prev Page
      </RouterLink>

      <RouterLink
          id="page-next"
          :to="{ name: 'passenger-list', query: { page: page + 1 } }"
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

.passengers {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
