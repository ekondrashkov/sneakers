import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { addFavorites, deleteFavorites, FavoritesResponse } from '../src/api/favorites.js'

interface FavoritesStore {
  favorites: Ref<FavoritesResponse[], FavoritesResponse[]>
  toggleFavorites: (id: FavoritesResponse) => void
  setFavorites: (ids: FavoritesResponse[]) => void
}

export const useFavoritesStore = defineStore('favorites', (): FavoritesStore => {
  const favorites = ref<FavoritesResponse[]>([])

  const setFavorites = (ids: FavoritesResponse[]) => {
    favorites.value = ids
  }

  const toggleFavorites = (info: FavoritesResponse) => {
    if (favorites.value.some((item) => item.itemId === info.itemId)) {
      favorites.value = favorites.value.filter((item) => item.itemId !== info.itemId)
      deleteFavorites(info.id)
    } else {
      favorites.value.push(info)
      addFavorites(info.itemId)
    }
  }

  return { favorites, toggleFavorites, setFavorites }
})
