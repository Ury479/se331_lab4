<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { toRefs } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const register = () => {
  // If the registration API call successful
  // Push back to the event details view
  store.updateMessage('You are successfully registered for ' + props.event.title)
  setTimeout(() => {
    store.restoreMessage()
  }, 3000)
  router.push({ name: 'event-detail', params: { id: props.event.id } })
}
</script>

<template>
  <div>
    <h1>Register for: {{ event.title }}</h1>
    <p>Register event here</p>
    <button @click="register">Register Me!</button>
  </div>
</template>
