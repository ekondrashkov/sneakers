<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { cancelOrder, Order, OrderStatus } from '../api/orders'
import OrderItem from './OrderItem.vue'

interface Props {
  orders: Order[]
}

const props = defineProps<Props>()

const detailsOrder = ref(props.orders.length > 0 ? props.orders.length : 0)

const onOrderClicked = (id: number) => {
  if (detailsOrder.value === id) {
    detailsOrder.value = 0
  } else {
    detailsOrder.value = id
  }
}

const onCancelOrder = async (id: number): Promise<void> => {
  await cancelOrder(id)
  const order = props.orders.find((order) => order.id === id)
  order.status = OrderStatus.CANCELLED
}

watchEffect(() => {
  detailsOrder.value = props.orders.length > 0 ? props.orders.length : 0
})
</script>

<template>
  <div class="flex flex-col gap-y-4 flex-1 overflow-y-auto" v-auto-animate>
    <OrderItem
      v-for="order in orders"
      :key="order.id"
      :id="order.id"
      :created-at="order.createdAt"
      :status="order.status"
      :items="[...order.items]"
      :total-price="order.totalPrice"
      :is-active="order.id === detailsOrder"
      :on-order-clicked="onOrderClicked"
      :on-cancel-order="onCancelOrder"
    />
  </div>
</template>
