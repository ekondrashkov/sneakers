import { defineStore } from 'pinia'
import { Ref, ref, watch } from 'vue'
import { ItemsResponse } from '../src/api/get-sneakers.js'

interface CartStore {
  cartItems: Ref<ItemsResponse[], ItemsResponse[]>
  addItem: (item: Readonly<ItemsResponse>) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

export const useCartStore = defineStore('cart', (): CartStore => {
  const lastCartItems = localStorage.getItem('cartItems')
  const cartItems = ref<ItemsResponse[]>(lastCartItems ? JSON.parse(lastCartItems) : [])

  watch(
    cartItems,
    () => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
    },
    {
      deep: true
    }
  )

  const addItem = (item: Readonly<ItemsResponse>) => {
    if (cartItems.value.some((cartItem) => cartItem.id === item.id)) {
      return
    }
    cartItems.value.push(item)
  }

  const removeItem = (id: number) => {
    cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== id)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return { cartItems, addItem, removeItem, clearCart }
})
