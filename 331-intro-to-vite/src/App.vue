<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <!--  修改 css 样式-->
  <div class="text-center font-sans text-gray-700">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'event-list' }" >Events</RouterLink>
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">About</RouterLink>
        </nav>
      </div>
    </header>

    <!-- 测试内容 -->
     <div class="bg-blue-500 text-white p-6 rounded-lg m-4">
      <h1 class="text-2xl font-bold">Tailwind Test</h1>
      <p class="mt-2">If this is blue with white text, Tailwind is working!</p>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-active {
  color: #42b983;
}
</style>
