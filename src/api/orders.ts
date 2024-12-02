import axios from 'axios'
import { getCartTotalPrice } from '../utils/utils.js'
import { ItemsResponse } from './get-sneakers.js'

export const enum OrderStatus {
  CREATED = 'CREATED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id?: number
  user_id: number
  items: Readonly<ItemsResponse[]>
  status: OrderStatus
  totalPrice: number
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  itemId: number
  name: string
  price: number
}

export const createOrder = async (items: ItemsResponse[], userId: number): Promise<Order> => {
  const order: Order = {
    user_id: userId,
    items,
    status: OrderStatus.CREATED,
    totalPrice: getCartTotalPrice(items),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  try {
    const { data } = await axios.post('https://a6449c49dc74267d.mokky.dev/orders', order)
    return data
  } catch (error) {
    throw new Error('Failed to fetch data', error.message)
  }
}

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  const { data } = await axios.get('https://a6449c49dc74267d.mokky.dev/orders?_relations=users', {
    params: {
      user_id: userId
    }
  })
  data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return data
}

export const cancelOrder = async (orderId: number): Promise<Order[]> => {
  const { data } = await axios.patch(`https://a6449c49dc74267d.mokky.dev/orders/${orderId}`, {
    status: OrderStatus.CANCELLED
  })
  return data
}
