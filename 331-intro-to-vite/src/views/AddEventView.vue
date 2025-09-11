<script setup lang="ts">
import type { Event } from '@/types'
import { ref } from 'vue'

const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false,
  organizer: ''
})
</script>

<template>
  <div>
    <h1>Create an event</h1>
    <form>
      <div class="form-row">
        <label class="form-label">Category</label>
        <input
            v-model="event.category"
            type="text"
            placeholder="Category"
            class="field form-input"
        />
      </div>

      <h3>Name & describe your event</h3>
      <div class="form-row">
        <label class="form-label">Title</label>
        <input
            v-model="event.title"
            type="text"
            placeholder="Title"
            class="field form-input"
        />
      </div>

      <div class="form-row">
        <label class="form-label">Description</label>
        <input
            v-model="event.description"
            type="text"
            placeholder="Description"
            class="field form-input"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="form-row">
        <label class="form-label">Location</label>
        <input
            v-model="event.location"
            type="text"
            placeholder="Location"
            class="field form-input"
        />
      </div>

      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<style scoped>
.form-row {
  margin-bottom: 16px;
}

/* 覆盖全局 inline-flex，避免 label 与 placeholder 同行显示造成视觉重复 */
.form-label {
  display: block;
  margin-bottom: 6px;
}

.form-input {
  display: block;
  width: 100%;
}
</style>
