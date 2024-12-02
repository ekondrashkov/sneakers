<script setup lang="ts">
import { onMounted } from 'vue'
import { ItemsResponse } from '../api/get-sneakers'
import { useCartStore } from '../../store/cart-store'
import { useFavoritesStore } from '../../store/favorites-store'
import CardItem from './CardItem.vue'
import { getFavorites } from '../api/favorites'
import { getFavoritesId } from '../utils/utils'

interface Props {
  list: ItemsResponse[]
  showButtons: boolean
}

defineProps<Props>()

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

const onCartToggle = (item: ItemsResponse) => {
  if (cartStore.cartItems.some((cartItem) => cartItem.id === item.id)) {
    cartStore.removeItem(item.id)
  } else {
    cartStore.addItem(item)
  }
}

onMounted(async () => {
  const favorites = await getFavorites()
  favoritesStore.setFavorites(favorites)
})
</script>

<template>
  <div>
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 grid-flow-row"
      v-auto-animate
    >
      <CardItem
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :imageUrl="item.imageUrl"
        :price="item.price"
        :favorite-id="getFavoritesId(favoritesStore.favorites, item.id)"
        :isFavorite="favoritesStore.favorites.some((favorite) => favorite.itemId === item.id)"
        :isAdded="cartStore.cartItems.some((cartItem) => cartItem.id === item.id)"
        :show-buttons="showButtons"
        @click-add="onCartToggle"
        @click-favorite="favoritesStore.toggleFavorites"
      />
    </div>
  </div>
</template>
