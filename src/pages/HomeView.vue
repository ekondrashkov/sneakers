<script setup lang="ts">
import { inject, Ref, ref, watchEffect } from 'vue'
import { getSneakersList, ItemsResponse, SortBy } from '../api/get-sneakers.js'
import CardList from '../components/CardList.vue'
import SearchIcon from '../components/svg/SearchIcon.vue'
import debounce from 'lodash.debounce'

const searhQuery = ref('')
const sortType = ref(SortBy.NAME)

const onSearchInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  searhQuery.value = target.value
}, 300)

const list = inject('list') as Ref<ItemsResponse[], ItemsResponse[]>

watchEffect(async () => {
  const query = searhQuery.value.trim()
  list.value = await getSneakersList(query, sortType.value)
})
</script>

<template>
  <div class="mb-8 flex items-center justify-between">
    <h3 class="text-3xl font-bold">All sneakers</h3>
    <div class="flex items-center gap-x-4">
      <select
        name="select"
        class="outline-none border border-slate-300 rounded-lg py-3 px-4 text-sm"
        v-model="sortType"
      >
        <option :value="SortBy.NAME">By name</option>
        <option :value="SortBy.PRICE_ACS">By price (cheapest)</option>
        <option :value="SortBy.PRICE_DESC">By price (expensive)</option>
      </select>

      <div class="w-64 relative">
        <input
          type="text"
          class="w-full border border-slate-300 placeholder:text-slate-300 rounded-lg py-3 pr-4 pl-9 text-sm outline-none focus:border-slate-400 transition duration-200"
          placeholder="Search..."
          spellcheck="false"
          @input="onSearchInput"
        />
        <SearchIcon class="absolute top-1/2 left-3 -translate-y-1/2" />
      </div>
    </div>
  </div>

  <CardList :list="list" :show-buttons="true" class="mb-8" />
</template>
