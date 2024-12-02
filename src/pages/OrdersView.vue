<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '../../store/auth-store'
import BackSquareIcon from '../components/svg/BackSquareIcon.vue'
import { getUserOrders, Order } from '../api/orders'
import OrdersList from '../components/OrdersList.vue'
import NoOrders from '../components/NoOrders.vue'

const authStore = useAuthStore()

const orders = ref<Order[]>([])
const loading = ref(true)

watch(
  () => authStore.status.email,
  (email) => {
    if (!email) {
      window.location.href = '/'
    }
  },
  { immediate: true }
)

onMounted(async () => {
  try {
    orders.value = await getUserOrders(authStore.status.id)
  } catch (error) {
    console.error('Failed to fetch orders', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="flex gap-x-4 items-center justify-start mb-8">
    <RouterLink to="/" class="opacity-70 hover:opacity-100 transition duration-200">
      <BackSquareIcon />
    </RouterLink>
    <h3 class="text-3xl font-bold">My orders</h3>
  </div>

  <OrdersList v-if="!loading && orders.length > 0" :orders="orders" />
  <NoOrders v-else-if="!loading && orders.length === 0" />
</template>
