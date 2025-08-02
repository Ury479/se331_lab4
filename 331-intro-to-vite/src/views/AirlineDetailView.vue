<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Airline } from '@/types'
import PassengerService from '@/services/PassengerService'

const airline = ref<Airline | null>(null)
const router = useRouter()

const props = defineProps({
  airlineId: {
    type: String,
    required: true
  }
})

onMounted(() => {
  PassengerService.getAirline(parseInt(props.airlineId))
    .then((response) => {
      airline.value = response.data
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({
          name: '404-resource-view',
          params: { resource: 'airline' }
        })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
</script>

<template>
  <div v-if="airline">
    <div class="airline-detail">
      <div class="airline-header">
        <img :src="airline.logo" :alt="airline.name" class="airline-logo-large" />
        <div class="airline-info">
          <h1>{{ airline.name }}</h1>
          <p class="slogan">{{ airline.slogan }}</p>
        </div>
      </div>
      
      <div class="airline-details">
        <div class="detail-item">
          <strong>Country:</strong> {{ airline.country }}
        </div>
        <div class="detail-item">
          <strong>Headquarters:</strong> {{ airline.head_quaters }}
        </div>
        <div class="detail-item">
          <strong>Website:</strong> <a :href="airline.website" target="_blank">{{ airline.website }}</a>
        </div>
        <div class="detail-item">
          <strong>Established:</strong> {{ airline.established }}
        </div>
      </div>
      
      <button @click="$router.go(-1)" class="back-button">← Back</button>
    </div>
  </div>
  <div v-else>
    <p>Loading airline details...</p>
  </div>
</template>

<style scoped>
.airline-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.airline-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.airline-logo-large {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.airline-info h1 {
  margin: 0 0 10px 0;
  color: #333;
}

.slogan {
  font-style: italic;
  color: #666;
  font-size: 1.1em;
}

.airline-details {
  display: grid;
  gap: 15px;
  margin-bottom: 30px;
}

.detail-item {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.detail-item strong {
  color: #333;
}

.detail-item a {
  color: #0066cc;
  text-decoration: none;
}

.detail-item a:hover {
  text-decoration: underline;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
