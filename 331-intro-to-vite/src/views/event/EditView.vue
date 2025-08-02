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

const edit = () => {
  // If the edit API call successful
  // Push back to the event details view and show flash message INSIDE the event-detail component
  store.updateMessage('The data has been updated')
  setTimeout(() => {
    store.restoreMessage('')
  }, 3000)
  router.push({ name: 'event-detail', params: { id: props.event.id } })
}

// 前往详情页
function goToDetailPage(){
  router.push({
    name: 'event-detail',
    params: { id: props.event.id },
    query:{message:'Event updated successfully!'}
  })
}
</script>

<template>
  <div>
    <h1>Edit: {{ event.title }}</h1>
    <p>Edit event here</p>
    <button @click="edit">Edit</button>
    <button @click="edit">Move to the details page</button>

  </div>
</template>
