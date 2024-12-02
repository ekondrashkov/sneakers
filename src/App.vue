<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import CartDrawer from './components/CartDrawer.vue'
import { onMounted, provide, ref } from 'vue'
import { getSneakersList, ItemsResponse, SortBy } from './api/get-sneakers'

const isCartOpened = ref(false)
const cartOpen = () => {
  isCartOpened.value = true
}

const cartClose = () => {
  isCartOpened.value = false
}

const list = ref<ItemsResponse[]>([])

onMounted(async () => {
  list.value = await getSneakersList('', SortBy.NAME)
})

provide('cartActions', {
  cartOpen,
  cartClose
})

provide('list', list)
</script>

<template>
  <div class="w-4/5 my-0 mx-auto bg-white min-h-screen rounded-2xl shadow-xl box-border">
    <CartDrawer v-show="isCartOpened" @cart-close="cartClose" />

    <HeaderComponent @cart-open="cartOpen" />

    <div class="flex flex-col p-10">
      <router-view />
    </div>
  </div>
</template>
