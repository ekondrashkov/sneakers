<script setup lang="ts">
import { inject, onMounted, ref, Ref, watchEffect } from 'vue'
import { ItemsResponse } from '../api/get-sneakers.js'
import { useFavoritesStore } from '../../store/favorites-store'
import CardList from '../components/CardList.vue'
import { FavoritesResponse } from '../api/favorites.js'
import BackSquareIcon from '../components/svg/BackSquareIcon.vue'

const favoritesStore = useFavoritesStore()

const list = inject('list') as Ref<ItemsResponse[], ItemsResponse[]>
const favoritesList = ref<ItemsResponse[]>([])

const getFavoritesListItems = (
  items: Readonly<ItemsResponse[]>,
  favoritesItems: Readonly<FavoritesResponse[]>
): ItemsResponse[] => {
  return favoritesItems.map((item) => items.find((listItem) => listItem.id === item.itemId))
}

onMounted(() => {
  favoritesList.value = getFavoritesListItems(list.value, favoritesStore.favorites)
})

watchEffect(() => {
  favoritesList.value = getFavoritesListItems(list.value, favoritesStore.favorites)
})
</script>

<template>
  <div class="flex gap-x-4 items-center justify-start mb-8">
    <RouterLink to="/" class="opacity-70 hover:opacity-100 transition duration-200">
      <BackSquareIcon />
    </RouterLink>
    <h3 class="text-3xl font-bold">My favorites</h3>
  </div>

  <CardList :list="favoritesList" :show-buttons="true" />
</template>
