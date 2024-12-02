<script setup lang="ts">
import BackArrowIcon from './svg/BackArrowIcon.vue'
</script>

<template>
  <div class="flex flex-col gap-y-4 items-center justify-center flex-1 overflow-y-auto">
    <img src="/no-orders.png" alt="No orders" width="70" height="70" />
    <h3 class="text-3xl font-bold mb-4">You don't have any orders</h3>
    <RouterLink
      to="/"
      class="flex items-center justify-center gap-x-2 w-60 bg-lime-500 text-white py-3 rounded-xl disabled:bg-slate-300 hover:bg-lime-600 transition duration-200 active:bg-lime-700"
    >
      <BackArrowIcon class="rotate-180" strokeColor="white" />
      <span>Back to shopping</span>
    </RouterLink>
  </div>
</template>
