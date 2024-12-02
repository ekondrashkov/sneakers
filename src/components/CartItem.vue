<script setup lang="ts">
import { ItemsResponse } from '../api/get-sneakers'

interface CartItemProps extends ItemsResponse {
  disabled?: boolean
  onRemove: (id: number) => void
}

defineProps<CartItemProps>()
</script>

<template>
  <div class="flex items-center justify-between gap-x-4 border border-slate-100 rounded-2xl p-4">
    <div class="w-16 h-16">
      <img :src="imageUrl" alt="Sneakers" class="max-w-full max-h-full" />
    </div>
    <div class="flex flex-col items-start flex-1">
      <h4>{{ name }}</h4>
      <div class="flex items-center justify-between gap-x-2 w-full">
        <b>{{ price }} EUR</b>
        <button
          :disabled="disabled"
          class="opacity-70 hover:opacity-100 transition duration-200"
          @click="onRemove(id)"
        >
          <img src="/close.svg" alt="Delete item from Cart" />
        </button>
      </div>
    </div>
  </div>
</template>
