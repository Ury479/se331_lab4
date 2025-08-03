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
  console.log('Current page:', page.value, 'Total pages:', totalPages, 'Total passengers:', totalPassengers.value)
  return page.value < totalPages - 1
})

// Force reactivity by watching the page prop directly
watchEffect(() => {
  const currentPage = page.value
  console.log('Page changed to:', currentPage)
  
  passengers.value = null
  PassengerService.getPassengers(currentPage, perPage)
      .then((response) => {
        console.log('Full response:', response)
        console.log('Response data:', response.data)
        console.log('Response headers:', response.headers)
        
        // Handle different possible response structures
        if (response.data.data) {
          passengers.value = response.data.data
        } else if (Array.isArray(response.data)) {
          passengers.value = response.data
        } else {
          passengers.value = []
        }
        
        // Try different fields for total count
        totalPassengers.value = response.data.totalPassengers || 
                                 response.data.total || 
                                 response.headers['x-total-count'] || 
                                 100 // fallback for testing
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
})
</script>

<template>
  <section>
    <h2>Passengers - Page {{ page + 1 }}</h2>
    <p>Debug: Current page prop = {{ page }}, Total passengers = {{ totalPassengers }}</p>

    <div class="passengers" v-if="passengers && passengers.length > 0">
      <PassengerCard
          v-for="passenger in passengers"
          :key="passenger._id"
          :passenger="passenger"
      />
    </div>
    
    <div v-else-if="passengers && passengers.length === 0">
      <p>No passengers found on this page.</p>
    </div>
    
    <div v-else>
      <p>Loading passengers...</p>
    </div>

    <div class="pagination">
      <RouterLink
          id="page-prev"
          :to="{ name: 'passenger-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page !== 0"
          class="page-link"
      >
        ← Prev Page
      </RouterLink>

      <RouterLink
          id="page-next"
          :to="{ name: 'passenger-list', query: { page: page + 1 } }"
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

.page-link {
  cursor: pointer;
  font-weight: bold;
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
  justify-content: center;
  margin: 2rem 0;
}
</style>
