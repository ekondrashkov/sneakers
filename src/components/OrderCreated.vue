<script setup lang="ts">
import BackArrowIcon from './svg/BackArrowIcon.vue'

interface Props {
  orederId: number
  onClose: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex flex-col items-center justify-center flex-1">
      <img src="/order-success-icon.png" alt="Order created" class="max-w-28 max-h-28 mb-4" />
      <h3 class="text-2xl font-bold mb-2 text-center">Congratulations!</h3>
      <p class="text-slate-400 text-center mb-8">
        Order №{{ orederId }} has been successfully created. Your sneakers will be delivered to you
        soon. Please contact us if you have any questions
      </p>
      <button
        class="flex items-center justify-center gap-x-2 w-full bg-lime-500 text-white py-3 rounded-xl disabled:bg-slate-300 hover:bg-lime-600 transition duration-200 active:bg-lime-700"
        @click="onClose"
      >
        <BackArrowIcon class="rotate-180" strokeColor="white" />
        <span>Back to shopping</span>
      </button>
    </div>
  </div>
</template>
