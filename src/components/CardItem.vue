<script setup lang="ts">
import { FavoritesResponse } from '../api/favorites'
import { ItemsResponse } from '../api/get-sneakers'

interface ItemProps extends ItemsResponse {
  isFavorite: boolean
  favoriteId: number
  isAdded: boolean
  showButtons: boolean
  onClickFavorite: (id: FavoritesResponse) => void
  onClickAdd: (item: Readonly<ItemsResponse>) => void
}

defineProps<ItemProps>()
</script>

<template>
  <div
    class="relative p-8 border border-slate-100 rounded-3xl bg-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-200 flex flex-col"
  >
    <button v-show="showButtons">
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        :alt="isFavorite ? 'Favorite' : 'Add to favorite'"
        width="32px"
        height="32px"
        class="absolute top-8 left-8"
        @click="onClickFavorite({ id: favoriteId, itemId: id })"
      />
    </button>

    <div class="max-w-full h-36 flex justify-center items-center">
      <img :src="imageUrl" :alt="name" class="w-full h-full object-contain" />
    </div>

    <h4 class="pt-2 pb-4">{{ name }}</h4>

    <div class="flex-1"></div>

    <div class="flex items-center justify-between">
      <div class="flex flex-col items-start">
        <snan class="text-slate-400">Price:</snan>
        <span>{{ price }} EUR</span>
      </div>
      <button v-show="showButtons">
        <img
          :src="isAdded ? '/checked.svg ' : '/plus.svg'"
          alt="Add to cart"
          @click="
            onClickAdd({
              id,
              name,
              imageUrl,
              price
            })
          "
        />
      </button>
    </div>
  </div>
</template>
