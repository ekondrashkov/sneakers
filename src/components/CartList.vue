<script setup lang="ts">
import { ItemsResponse } from '../api/get-sneakers'
import CartItem from './CartItem.vue'

interface Props {
  items: ItemsResponse[]
  disabled?: boolean
  onRemove: (id: number) => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-y-4 flex-1 overflow-y-auto" v-auto-animate>
    <CartItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :name="item.name"
      :price="item.price"
      :disabled="disabled"
      :onRemove="() => onRemove(item.id)"
    />
  </div>
</template>
