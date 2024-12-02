<script setup lang="ts">
import { OrderStatus } from '../api/orders'
import BackSquareIcon from '../components/svg/BackSquareIcon.vue'
import CardList from '../components/CardList.vue'
import { getLocalDateAndTime } from '../utils/utils'
import { ItemsResponse } from '../api/get-sneakers'
import CancelIcon from './svg/CancelIcon.vue'

interface Props {
  id: number
  createdAt: string
  status: OrderStatus
  totalPrice: number
  items: ItemsResponse[]
  isActive: boolean
  onOrderClicked: (id: number) => void
  onCancelOrder: (id: number) => Promise<void>
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-y-4 border border-slate-100 rounded-2xl p-4">
    <div class="flex items-start justify-between gap-x-4">
      <div class="flex items-center gap-x-2">
        <BackSquareIcon
          v-if="isActive"
          class="rotate-270 cursor-pointer"
          @click="onOrderClicked(id)"
        />
        <BackSquareIcon v-else class="rotate-180 cursor-pointer" @click="onOrderClicked(id)" />
        <h3 class="text-xl">
          Order <span class="font-bold">#{{ id }}</span>
        </h3>
      </div>

      <div class="flex items-center gap-x-4">
        <div class="flex flex-col items-end">
          <div class="flex items-center gap-x-2">
            <span
              ><span class="font-bold">Created: </span>{{ getLocalDateAndTime(createdAt) }}</span
            >
            <span><span class="font-bold">Status: </span>{{ status }}</span>
          </div>
          <div><span class="font-bold">Total: </span>{{ totalPrice }} EUR</div>
        </div>

        <CancelIcon
          v-show="status === OrderStatus.CREATED"
          class="cursor-pointer opacity-60 hover:opacity-80 active:opacity-100"
          title="Cancel order"
          @click="onCancelOrder(id)"
        />
      </div>
    </div>

    <CardList v-show="isActive" :list="items" :show-buttons="false" />
  </div>
</template>
