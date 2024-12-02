<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../store/cart-store'
import { getCartTotalPrice } from '../utils/utils'
import ProfileDropdown from './ProfileDropdown.vue'
import { useAuthStore } from '../../store/auth-store'

const cartStore = useCartStore()

const isProfileOpened = ref(false)

const dropdown = ref<HTMLElement | null>(null)

const onClickOutside = (event: Event) => {
  if (!dropdown.value?.contains(event.target as Node)) {
    isProfileOpened.value = false
  }
}

const toggleProfileDropdown = () => {
  const opened = isProfileOpened.value
  if (opened) {
    window.removeEventListener('click', onClickOutside)
  } else {
    window.addEventListener('click', onClickOutside)
  }

  isProfileOpened.value = !isProfileOpened.value
}

const emit = defineEmits(['cartOpen'])

const authStore = useAuthStore()
</script>

<template>
  <header class="w-full flex items-center justify-between px-10 py-8 border-b border-slate-300">
    <RouterLink to="/">
      <div class="flex items-center gap-x-4">
        <img src="/logo.png" alt="logo" class="w-10 h-10" />
        <div class="flex flex-col">
          <h2 class="text-xl font-bold uppercase">vue sneakers</h2>
          <span class="text-slate-500">Best sneakers here</span>
        </div>
      </div>
    </RouterLink>

    <div class="flex flex-row items-center gap-x-8">
      <button
        class="flex gap-x-2 text-gray-500 hover:text-black cursor-pointer"
        @click="emit('cartOpen')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ getCartTotalPrice(cartStore.cartItems) }} EUR</b>
      </button>
      <RouterLink to="/favorites">
        <button class="flex gap-x-2 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Favorites" />
          <span>Favorites</span>
        </button>
      </RouterLink>
      <div ref="dropdown" class="relative">
        <button
          ref="profileButton"
          class="flex gap-x-2 text-gray-500 hover:text-black cursor-pointer relative"
          @click="toggleProfileDropdown"
        >
          <img src="/profile.svg" alt="Favorites" />
          <span>{{ authStore.status.email ?? 'Profile' }}</span>
        </button>

        <ProfileDropdown
          v-if="isProfileOpened"
          :logged-in="authStore.status.email ? true : false"
          :on-sign-in="authStore.signIn"
          :on-sign-up="authStore.signUp"
          :on-log-off="authStore.logOff"
          :on-close="() => (isProfileOpened = false)"
        />
      </div>
    </div>
  </header>
</template>
