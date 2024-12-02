import type { FavoritesResponse } from '../api/favorites.js'
import type { ItemsResponse } from '../api/get-sneakers.js'

/**
 * Get overal Cart price
 *
 * @param items
 * @returns number
 */
export const getCartTotalPrice = (items: readonly Readonly<ItemsResponse>[]): number => {
  return items.reduce((acc, item) => acc + item.price, 0)
}

/**
 * Get favoriteId from FavoritesResponse
 *
 * @param favorites
 * @param itemId
 * @returns number
 */
export const getFavoritesId = (favorites: FavoritesResponse[], itemId: number): number => {
  for (const favorite of favorites) {
    if (favorite.itemId === itemId) {
      return favorite.id
    }
  }
  return 0
}

/**
 * Get displayable date and time
 *
 * @param dateStr
 * @returns
 */
export const getLocalDateAndTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const localeDate = date.toLocaleDateString()
  const localeTime = date.toLocaleTimeString().split(':').slice(0, 2).join(':')
  return `${localeDate}, ${localeTime}`
}
