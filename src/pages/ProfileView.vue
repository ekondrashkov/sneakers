<script setup lang="ts">
import { watch } from 'vue'
import { useAuthStore } from '../../store/auth-store'
import BackSquareIcon from '../components/svg/BackSquareIcon.vue'

const authStore = useAuthStore()

watch(
  () => authStore.status.email,
  (email) => {
    if (!email) {
      window.location.href = '/'
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex gap-x-4 items-center justify-start mb-8">
    <RouterLink to="/" class="opacity-70 hover:opacity-100 transition duration-200">
      <BackSquareIcon />
    </RouterLink>
    <h3 class="text-3xl font-bold">My profile</h3>
  </div>
</template>
