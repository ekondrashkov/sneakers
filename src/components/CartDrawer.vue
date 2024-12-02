<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CartList from './CartList.vue'
import EmptyCart from './EmptyCart.vue'
import BackArrowIcon from './svg/BackArrowIcon.vue'
import OrderCreated from './OrderCreated.vue'
import { useCartStore } from '../../store/cart-store'
import { getCartTotalPrice } from '../utils/utils'
import { createOrder, Order } from '../api/orders'
import { useAuthStore } from '../../store/auth-store'

const cartStore = useCartStore()
const authStore = useAuthStore()

const emit = defineEmits(['cartClose'])

const sendingOrder = ref(false)
const createdOrder = ref<Order | null>(null)
const userId = ref<number | null>(authStore.status.id ?? null)

const onCreateOrder = async () => {
  if (userId.value === null) {
    return
  }

  try {
    sendingOrder.value = true
    createdOrder.value = await createOrder(cartStore.cartItems, userId.value)
    cartStore.clearCart()
  } catch (error) {
    console.error('Order creation failed', error)
  } finally {
    sendingOrder.value = false
  }
}

const onCloseCartAfterOrderCreation = () => {
  createdOrder.value = null
  emit('cartClose')
}

const cartDisabled = computed(() => cartStore.cartItems.length === 0 || sendingOrder.value)

watch(
  () => authStore.status.id,
  (id) => {
    userId.value = id ?? null
  },
  { immediate: true }
)
</script>

<template>
  <div class="fixed w-full h-full top-0 bottom-0 left-0 right-0 z-10 flex items-end">
    <!-- background -->
    <div class="w-full h-full bg-black/70"></div>

    <!-- drawer -->
    <div class="bg-white w-96 h-full p-8 flex flex-col">
      <!-- Cart title with Close button -->
      <div class="flex items-center justify-start gap-x-4 mb-8">
        <BackArrowIcon
          v-if="cartStore.cartItems.length > 0 && !sendingOrder"
          class="cursor-pointer opacity-30 rotate-180 hover:opacity-100 transition duration-200 hover:transltate-x-1"
          strokeColor="black"
          @click="emit('cartClose')"
        />
        <h3 class="text-2xl font-bold">Cart</h3>
      </div>

      <!-- Cart items list -->
      <CartList
        v-if="cartStore.cartItems.length > 0 && !sendingOrder"
        :items="cartStore.cartItems"
        :onRemove="cartStore.removeItem"
        :disabled="cartDisabled"
      />

      <!-- Price and action button -->
      <div v-if="cartStore.cartItems.length > 0 && !sendingOrder">
        <div class="flex items-end w-full gap-x-1 mb-4">
          <span>Total price</span>
          <div class="flex-1 border-b border-slate-300 border-dotted h-full"></div>
          <b>{{ getCartTotalPrice(cartStore.cartItems) }} EUR</b>
        </div>

        <button
          v-if="userId !== null"
          class="w-full bg-lime-500 text-white py-3 rounded-xl disabled:bg-slate-300 hover:bg-lime-600 transition duration-200 active:bg-lime-700"
          :disabled="cartDisabled"
          @click="onCreateOrder"
        >
          Create order
        </button>

        <button
          v-else
          class="w-full bg-lime-500 text-white py-3 rounded-xl disabled:bg-slate-300 hover:bg-lime-600 transition duration-200 active:bg-lime-700"
          @click="emit('cartClose')"
        >
          Sign In to proceed
        </button>
      </div>

      <!-- Created order notification -->
      <OrderCreated
        v-else-if="createdOrder"
        :orederId="createdOrder.id"
        :on-close="onCloseCartAfterOrderCreation"
      />

      <!-- Empty cart -->
      <EmptyCart v-else-if="cartStore.cartItems.length === 0" :on-close="() => emit('cartClose')" />
    </div>
  </div>
</template>
